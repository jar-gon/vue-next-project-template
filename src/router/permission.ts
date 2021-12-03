import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { useInitInfoStoreWithOut } from '@/store/modules/initInfo'
const initInfoStore = useInitInfoStoreWithOut()
// const permissionStore = usePermissionStoreWithOut()

import type { Router, NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { getAuth } from '@/api/sys'
import appConfig from '@/appConfig'
import track from '@/utils/track'
import { useTitle } from '@/hooks/web/useTitle'

// TODO 格式化数据
export function formatMenu(menus: any[], permission: string[]): any {
  const arr: any[] = []
  function fn(data, floor = 0) {
    data.forEach((item) => {
      item.floor = floor
      // 过滤掉非 url 的部分
      if (item.path.indexOf('/') > -1) {
        arr.push(item)
      }
      if (item.children && item.children.length) {
        fn(item.children, floor + 1)
      }
    })
  }
  function filterMenu(menu: any[], per: any[]): any[] {
    return menu.filter((item: any) => {
      item.meta = item.meta || {
        title: item.menuName,
        icon: item.icon || 'icon-shouye',
      }
      item.children = item.subMenu || []
      if (item.children && item.children.length > 0) {
        item.children = filterMenu(item.children, per)
      }
      const filter = per.includes(item.permission) && !item.ext1 && item.path.indexOf('/') > -1
      if (filter) {
        item.prefix = '/iframe-page'
      }
      return filter
    })
  }
  const filterMenus = filterMenu(menus, permission)
  fn(filterMenus)
  return {
    flatMenus: arr,
    filterMenus,
  }
}

export default (router: Router) => {
  router.beforeEach(
    async (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      // 从链接上带参数过来
      const query = to.query
      const { fullscreen, authAppCode } = from.query
      function _next(params?: any) {
        if (query.fullscreen || query.authAppCode) {
          next(params)
        } else if (fullscreen || authAppCode) {
          query.fullscreen = fullscreen
          query.authAppCode = authAppCode
          next({
            ...params,
            path: to.path,
            params: to.params,
            query,
          })
        } else {
          next(params)
        }
      }

      const hasUserInfo = Object.keys(initInfoStore.userInfo).length > 0
      if (!hasUserInfo) {
        // store.commit('UPDATE_PAGE_LOADING', true)

        // 获取登录信息
        const appCode = query.authAppCode || appConfig.auth.appCode
        const authRes = await getAuth(`${appCode}`, appConfig.auth.systemType)
        if (authRes) {
          const { me, menu, permission } = authRes
          if (!permission || permission.length === 0) {
            // UI.message.error('没有该系统权限，请联系管理员')
            return next({
              name: 'exception404',
              query,
            })
          }
          // filter permissioned menus
          const { flatMenus, filterMenus } = formatMenu(menu, permission)
          initInfoStore.setUserInfo(me)
          // permissionStore
          initInfoStore.setMenu(filterMenus)
          initInfoStore.setFlatMenu(flatMenus)
          initInfoStore.setPermission(permission)
          // 设置userId，PV埋点会用到
          track.setDefaults({
            userId: me.userId,
          })
        }
        // 在这里设置默认值会触发一次PV事件发送，后面就会在每次页面切换的时候自动发送PV，之所以在这里设置是要第一次PV统计就带上用户信息
        track.pageReport()
        if (!authRes) {
          // UI.message.error('没有该系统权限，请联系管理员')
          return next({
            name: 'exception403',
            query,
          })
        } else {
          // 销售人员信息
          // const sellerInfo = await getSeller()
          // store.commit('UPDATE_SELLER_INFO', sellerInfo || {})
        }
      } else if (appConfig.appId) {
        track.pageReport()
      }
      // 关闭loading
      // store.commit('UPDATE_PAGE_LOADING', false)
      // 404的判断要求每个route都有一个name
      const { flatMenu, permission = [] } = initInfoStore || {}
      // 有可能配置的有参数，所以这里要只匹配 hash，也就是 path
      // 添加meta信息和鉴权
      const realPath = to.path.replace(/^\/iframe-page/, '')
      const matchMenu: Record<string, any> =
        flatMenu.find(({ path }) => {
          const purePath = path.split('?')[0]
          return purePath === realPath
        }) || {}
      to.meta = {
        title: matchMenu.menuName,
        ...to.meta,
      }
      if (
        !to.name /* || !hasAuth */ ||
        // to.meta.noAuth ||
        ['exception404', 'exception403'].includes(String(to.name))
      ) {
        _next()
      } else {
        const whiteList: string[] = ['/', '/dashboard']
        if (!permission.includes(String(matchMenu.permission)) && !whiteList.includes(to.path)) {
          // UI.message.error('没有该菜单权限，请联系管理员')
          return _next({
            name: 'exception403',
            query,
          })
        }
        let menu
        if (to.matched && to.matched.length) {
          const route = to.matched.find((item) => {
            return !item.redirect
          })
          if (route) {
            const meta = route.meta || {}
            const { permission = '' } = meta
            const hasPermission =
              typeof permission === 'string' && initInfoStore.permission.includes(permission)
            if (!permission || hasPermission) {
              menu = route
            }
          }
        }
        if (!menu && to.name !== 'exception403') {
          _next({
            name: 'exception403',
            query,
          })
        } else {
          _next()
        }
      }
    }
  )

  router.afterEach((to) => {
    useTitle(to?.meta?.title as string)
    NProgress.done() // 结束Progress
  })
}
