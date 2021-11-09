import {
  createRouter,
  createWebHashHistory,
  RouteLocationNormalized,
  Router,
  NavigationGuardNext,
} from 'vue-router'
import { store } from '@/store/index'
import { getAuth } from '@/api/sys'
// import { getSeller } from '@/api/seller'
import auth from '@/utils/auth'
// import { flatMenus, formatMenu } from '@/utils/menu'
import track from '@/utils/track'
import appConfig from '@/appConfig'
import _ from 'lodash'
import UI from '@/ui'

import routes from './routes'
const hasAuth = !!appConfig.auth && !!appConfig.auth.appCode

// const modules = import.meta.globEager('./routers/**/*.vue')
// const routes: RouteRecordRaw[] = []
// for (const path in modules) {
//   // 递归生成路由
//   const routePath = path
//     .split('/')
//     .splice(2)
//     .join('/')
//     .replace(/\.vue$/, '')
//   const component = modules[path]?.default
//   if (!component || !component.name) {
//     console.error('Please confim route compont is exist and name is unique set!')
//   } else {
//     routes.push({
//       path: `${routePath}`,
//       name: component.name,
//       component: modules[path]?.default, // 这里一定要加上 default 否则不行
//       props: true,
//     })
//   }
// }

function navigationGuards(router: Router): void {
  router.beforeEach(
    async (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext,
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

      const hasUserInfo = Object.keys(store.state.userInfo).length > 0
      if (!hasUserInfo) {
        // store.commit('UPDATE_PAGE_LOADING', true)

        // 获取登录信息
        const appCode = query.authAppCode || appConfig.auth.appCode
        const authRes = await getAuth(`${appCode}`, appConfig.auth.systemType).catch(
          (result: CommonResType) => {
            // 11表示未登录，没有登陆的时候跳转到登录页面
            // code为1，表示后端未获取到userId，这时候退出登录清空cookie
            if (result.code === '11' || result.code === '1') {
              auth[result.code === '11' ? 'login' : 'logout']()
            }
          },
        )
        if (authRes) {
          const { me, /**menu,*/ permission } = authRes
          if (!permission || permission.length === 0) {
            UI.message.error('没有该系统权限，请联系管理员')
            // return next({
            //   name: 'exception404',
            //   query,
            // })
          }
          // filter permissioned menus
          // const filterMenu = _.filter(menu, (item: any): boolean => {
          //   return permission.includes(item.permission)
          // })
          // const formatM = formatMenu(filterMenu)
          // store.commit('UPDATE_USERINFO', me)
          // store.commit('UPDATE_MEUNS', formatM)
          // store.commit('SET_FLAT_MENU', flatMenus(formatM))
          // store.commit('UPDATE_PERMISSION', permission)
          // 设置userId，PV埋点会用到
          track.setDefaults({
            userId: me.userId,
          })
        }
        // 在这里设置默认值会触发一次PV事件发送，后面就会在每次页面切换的时候自动发送PV，之所以在这里设置是要第一次PV统计就带上用户信息
        track.pageReport()
        if (!authRes) {
          UI.message.error('没有该系统权限，请联系管理员')
          // return next({
          //   name: 'exception404',
          //   query,
          // })
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
      if (!to.name || !hasAuth || ['exception404', 'exception403'].includes(String(to.name))) {
        _next()
      } else {
        const { flatMenu, permission = [] } = store.state || {}
        // 有可能配置的有参数，所以这里要只匹配 hash，也就是path
        const matchMenu: Record<string, any> =
          flatMenu.find(({ path }) => {
            const purePath = path.split('?')[0]
            return purePath === to.path
          }) || {}
        const whiteList: string[] = ['/', '/sale']
        if (!permission.includes(String(matchMenu.permission)) && !whiteList.includes(to.path)) {
          UI.message.error('没有该菜单权限，请联系管理员')
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
            const { permission } = meta
            if (!permission || (permission && store.state.permission.includes(permission))) {
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
    },
  )
}

export function getRouter(): Router {
  const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
  })
  navigationGuards(router)
  return router
}
export default getRouter
