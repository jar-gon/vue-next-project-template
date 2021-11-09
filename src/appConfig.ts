// vite
const ENV_BASE = import.meta.env
const authAppCode = ENV_BASE.VITE_SYS_AUTH_CODE
const AUTH_DOMAIN = ENV_BASE.VITE_AUTH_DOMAIN
const BASE_URL = ENV_BASE.VITE_SALE_BASE_URL
const VUE_APP_RUN_ENV = ENV_BASE.VITE_VUE_APP_RUN_ENV
const appId = ENV_BASE.VITE_APP_ID

export default {
  appId: appId,
  // 权限系统项目配置信息
  auth: {
    appCode: authAppCode,
    // 用户类型，0或空代表OA用户，1代表销售用户
    systemType: 1,
  },
  AUTH_DOMAIN,
  PROD: VUE_APP_RUN_ENV == 'pro',
  BASE_URL,
  VUE_APP_RUN_ENV,
}
