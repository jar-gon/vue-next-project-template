import { defineStore } from 'pinia'
import { store } from '@/store'
import { getAuth } from '@/api/sys'
import appConfig from '@/appConfig'

export const useInitInfoStore = defineStore({
  id: 'initInfo',
  state: (): InitInfoType => ({
    userInfo: {},
    permission: [],
    flatMenu: [],
    menus: [],
  }),
  getters: {
    getUserInfo(): UserInfoType {
      return this.userInfo || {}
    },
    getUserId(): string {
      return `${this.userInfo.id}`
    },
  },
  actions: {
    setUserInfo(info: UserInfoType) {
      this.userInfo = info
    },
    setPermission(permi: string[]) {
      this.permission = permi
    },
    setMenu(menu: MenuItemType[]) {
      this.menus = menu
    },
    setFlatMenu(flatMenu: MenuItemType[]) {
      this.flatMenu = flatMenu
    },
    resetState() {
      this.userInfo = null
    },
    /**
     * @description: login
     */
    async login(params: any): Promise<SysInfoResType | null> {
      try {
        console.log('params', params)
        // get user info
        const userInfo = await this.getInitInfoAction()

        return userInfo
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async getInitInfoAction() {
      const initInfo = await getAuth(`${appConfig.auth.appCode}`)
      const { me, permission, menu } = initInfo
      this.setUserInfo(me)
      this.setPermission(permission)
      this.setMenu(menu)
      return initInfo
    },
  },
})

// Need to be used outside the setup
export function useInitInfoStoreWithOut() {
  return useInitInfoStore(store)
}
