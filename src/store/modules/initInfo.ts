// import type { ErrorMessageMode } from '#/axios';
import { defineStore } from 'pinia';
import { store } from '@/store/index.bak';
// import { RoleEnum } from '@/enums/roleEnum';
// import { PageEnum } from '@/enums/pageEnum';
// import { USER_INFO_KEY } from '@/enums/cacheEnum';
import { getAuth } from '@/api/sys';
// import { useMessage } from '@/hooks/web/useMessage';
// import { router } from '@/router';
import appConfig from '@/appConfig';
import { flatMenus } from '@/utils/menu';

export const useUserStore = defineStore({
  id: 'app-initInfo',
  state: (): InitInfoType => ({
    userInfo: {},
    permission: [],
    flatMenu: [],
    menus: [],
  }),
  getters: {
    getUserInfo(): UserInfoType {
      return this.userInfo || {};
    },
  },
  actions: {
    setUserInfo(info: UserInfoType) {
      this.userInfo = info;
    },
    setPermission(permi: string[]) {
      this.permission = permi;
    },
    setMenu(menu: MenuItemType[]) {
      this.menus = menu;
      this.flatMenu = flatMenus(menu);
    },
    resetState() {
      this.userInfo = null;
    },
    /**
     * @description: login
     */
    async login(
      params: any
    ): Promise<SysInfoResType | null> {
      try {
        console.log('params', params);
        // get user info
        const userInfo = await this.getInitInfoAction();

        return userInfo;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getInitInfoAction() {
      const initInfo = await getAuth(`${appConfig.auth.appCode}`);
      const { me, permission, menu } = initInfo;
      this.setUserInfo(me);
      this.setPermission(permission);
      this.setMenu(menu);
      return initInfo;
    },
    // /**
    //  * @description: logout
    //  */
    // logout(goLogin = false) {
    //   goLogin && router.push(PageEnum.BASE_LOGIN);
    // },

    // /**
    //  * @description: Confirm before logging out
    //  */
    // confirmLoginOut() {
    //   const { createConfirm } = useMessage();
    //   const { t } = useI18n();
    //   createConfirm({
    //     iconType: 'warning',
    //     title: t('sys.app.logoutTip'),
    //     content: t('sys.app.logoutMessage'),
    //     onOk: async () => {
    //       await this.logout(true);
    //     },
    //   });
    // },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
