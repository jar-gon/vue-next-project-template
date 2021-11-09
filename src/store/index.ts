import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import { queryByGroupCodes, queryByMemberGroupCodes, getAuth } from '@/api/sys'
import { getHash } from '@/utils/index'
import { flatMenus, formatMenu } from '@/utils/menu'
import appConfig from '@/appConfig'
import auth from '@/utils/auth'
import { message } from '@/ui'
import { getBdt, getSeller } from '@/api/seller'
import track from '@/utils/track'
import { filter } from 'lodash'

// define injection key
export const key: InjectionKey<Store<StateType>> = Symbol()

const stateMap = [
  {
    dictKey: 'ENABLE',
    dictValue: '启用',
    groupCode: 'stateMap',
    remark: '状态常量',
  },
  {
    dictKey: 'DISABLE',
    dictValue: '关闭',
    groupCode: 'stateMap',
    remark: '状态常量',
  },
]

export const store = createStore<StateType>({
  state: {
    count: 0,
    permission: [],
    menus: [],
    userInfo: {},
    pageLoading: false,
    flatMenu: [],
    bdt: [],
    collapsed: !+(localStorage.getItem('menuStatus') || ''),
    menuConfig: {
      selectedKeys: [],
      openKeys: [],
    },
    dictMap: {
      stateMap: stateMap,
    },
    sellerInfo: {},
    locationPC: [],
    locationPCMap: {},
    org: [],
    orgMap: {},
  },
  mutations: {
    TOGGLE_MENU: (state: StateType) => {
      if (state.collapsed) {
        localStorage.setItem('menuStatus', '1')
      } else {
        localStorage.setItem('menuStatus', '0')
      }
      state.collapsed = !state.collapsed
    },
    UPDATE_MEUNS: (state: StateType, data: any[]) => {
      state.menus = data
    },
    UPDATE_PERMISSION: (state: StateType, data: any[]) => {
      state.permission = data
    },
    UPDATE_USERINFO(state: StateType, userInfo) {
      state.userInfo = userInfo
    },
    UPDATE_PAGE_LOADING(state: StateType, val) {
      state.pageLoading = val
    },
    SET_FLAT_MENU: (state: StateType, menu) => {
      state.flatMenu = menu
    },
    UPDATE_BDT: (state: StateType, data) => {
      state.bdt = data
    },
    UPDATE_MENU_CONFIG: (state: StateType, data) => {
      state.menuConfig = {
        ...state.menuConfig,
        ...data,
      }
    },
    UPDATE_DICT_MAP: (state: StateType, data: Record<string, DictValueItemType>) => {
      state.dictMap = {
        ...state.dictMap,
        ...data,
      }
    },
    UPDATE_SELLER_INFO(state: StateType, data: any) {
      state.sellerInfo = data
    },
    UPDATE_LOCATION_PC(state: StateType, data: any[]) {
      state.locationPC = data
    },
    UPDATE_LOCATION_PC_MAP(state: StateType, data: { [key: string]: string }) {
      state.locationPCMap = data
    },
    UPDATE_ORG(state: StateType, data: any[]) {
      state.org = data
    },
    UPDATE_ORG_MAP(state: StateType, data: { [key: string]: string }) {
      state.orgMap = data
    },
  },
  getters: {
    getDictByKey(state) {
      return (key: string) => {
        return state.dictMap[key] || []
      }
    },
    getDictLabelByValue(state) {
      return (key: string, value: number | string): string => {
        if (!value) {
          return ''
        }
        return (
          (state.dictMap[key] || []).find((item: DictValueItemType) => {
            return item.dictKey === value
          })?.dictValue || ''
        )
      }
    },
  },
  modules: {},
  actions: {
    initData({ commit }) {
      getBdt().then((data) => {
        // generate unique key
        // const computed = (data: any, key: string) => {
        //   data.forEach((item: any) => {
        //     item.key = key ? `${key}-${item.value}` : item.value
        //     if (item.children && item.children.length) {
        //       computed(item.children, item.key)
        //     }
        //   })
        //   return data
        // }
        // computed(data, '')
        commit('UPDATE_BDT', data)
      })
      // getRuleGroup
      // selLevel
      // orgType
      // leadsType
      // leadsAttribute
      queryByGroupCodes([
        'getRuleGroup',
        'selLevel',
        'orgType',
        'leadsType',
        'leadsAttribute',
        'sellerAttribute',
        'expression',
        'tagLevel',
        'leads_state',
        'leadsTypeTab',
        'leadsAssignType',
      ]).then((res: any) => {
        if (res) {
          commit('UPDATE_DICT_MAP', res)
        }
      })
      queryByMemberGroupCodes([
        'memberSellerLevel',
        'memberModuleType',
        'memberAttribute',
        'memberSellerAttribute',
        'memberRuleGroup',
        'sellerDay',
        'memberQuotaAttribute',
        'member_expression',
        'ruleAssignType',
        'classifierRuleType',
      ]).then((res: any) => {
        if (res) {
          commit('UPDATE_DICT_MAP', res)
        }
      })
    },
    goDefaultMenu({ commit, state }) {
      const hash = getHash()
      const val = state.flatMenu
      let menu: MenuItemType
      if (!hash || hash == '/') {
        menu = val[0]
      } else {
        menu = val.find((m: MenuItemType) => m.path == hash) || val[0]
      }
      if (menu && menu.path) {
        const conf: Record<string, any> = {
          selectedKeys: [menu.id],
        }
        if (!state.collapsed) {
          if (menu.parent) {
            conf.openKeys = [menu.parent.id]
          } else {
            conf.openKeys = []
          }
        }
        commit('UPDATE_MENU_CONFIG', conf)
      }
    },
    async sysInit({commit, state}, params = {
      appCode: appConfig.auth.appCode,
      systemType: appConfig.auth.systemType,
    }) {
      const hasUserInfo = Object.keys(state.userInfo).length > 0
      if (!hasUserInfo) {
        commit('UPDATE_PAGE_LOADING', true)

        // 获取登录信息
        const authRes = await getAuth(`${params.appCode}`, params.systemType).catch(
          (result: CommonResType) => {
            // 11表示未登录，没有登陆的时候跳转到登录页面
            // code为1，表示后端未获取到userId，这时候退出登录清空cookie
            if (result.code === '11' || result.code === '1') {
              auth[result.code === '11' ? 'login' : 'logout']()
            }
          },
        )
        if (authRes) {
          const { me, menu, permission } = authRes
          if (!permission || permission.length === 0) {
            message.error('没有该系统权限，请联系管理员')
            // return next({
            //   name: 'exception404',
            //   query,
            // })
          }
          // filter permissioned menus
          const filterMenu = filter(menu, (item: any): boolean => {
            return permission.includes(item.permission)
          })
          const formatM = formatMenu(filterMenu)
          store.commit('UPDATE_USERINFO', me)
          store.commit('UPDATE_MEUNS', formatM)
          store.commit('SET_FLAT_MENU', flatMenus(formatM))
          store.commit('UPDATE_PERMISSION', permission)
          // 设置userId，PV埋点会用到
          track.setDefaults({
            userId: me.userId,
          })
        }
        // 在这里设置默认值会触发一次PV事件发送，后面就会在每次页面切换的时候自动发送PV，之所以在这里设置是要第一次PV统计就带上用户信息
        track.pageReport()
        if (!authRes) {
          message.error('没有该系统权限，请联系管理员')
          // return next({
          //   name: 'exception404',
          //   query,
          // })
        } else {
          // 销售人员信息
          const sellerInfo = await getSeller()
          store.commit('UPDATE_SELLER_INFO', sellerInfo || {})
        }
      } else if (appConfig.appId) {
        track.pageReport()
      }
    }
  },
})

export default store
