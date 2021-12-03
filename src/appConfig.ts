// vite
const ENV_BASE = import.meta.env
const authAppCode = ENV_BASE.VITE_SYS_AUTH_CODE
const AUTH_DOMAIN = ENV_BASE.VITE_AUTH_DOMAIN
const BASE_URL = ENV_BASE.VITE_BASE_URL
const VUE_APP_RUN_ENV = ENV_BASE.VITE_VUE_APP_RUN_ENV
const appId = ENV_BASE.VITE_APP_ID
const sitePath = ENV_BASE.VITE_SITE_PATH as string

export default {
  appId: appId,
  // 权限系统项目配置信息
  auth: {
    appCode: authAppCode,
    // 用户类型，0或空代表OA用户，1代表销售用户
    systemType: 1,
  },
  authDomain: AUTH_DOMAIN,
  prod: VUE_APP_RUN_ENV === 'pro',
  baseUrl: BASE_URL as string,
  sitePath,
  VUE_APP_RUN_ENV,
  /**
   * 接口成功返回状态码
   */
  resaultCode: '0000',

  /**
   * 接口请求超时时间
   */
  requestTimeout: 60000,

  /**
   * 默认接口请求类型
   * 可选值：application/x-www-form-urlencoded multipart/form-data
   */
  defaultHeaders: 'application/json',
}
