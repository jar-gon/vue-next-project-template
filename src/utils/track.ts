import appConfig from '@/appConfig'
import * as JSSDK from '@zm-fe/zm-jssdk'
// CDN方式引入
// const { ZM_JSSDK: JSSDK } = window

function setConfig(): void {
  JSSDK.setConfig({
    // environment: 'prod',
    environment: appConfig.VUE_APP_RUN_ENV,

    // debug模式, 可选值:error / debug。调试阶段，可以在console查看打印信息
    logLevel: 'error',

    // histroy模式
    history: true,

    // 默认不上报PV/UV
    autoReport: false,

    // 对XMLHttpRequest异常自动上报
    interceptor: true,
  })
}

function setDefaults(params = {}): void {
  JSSDK.setDefaults({
    appId: appConfig.appId,
    appVersion: '1.0.0',
    cSource: 'h5',
    ...params,
  })
}

// 上报接口异常埋点
function sendEvent(params = {}): void {
  setDefaults()
  JSSDK.sendEvent({
    ...params,
  })
}

/**
 * send log
 * @param code string
 * @param message string
 * @param level string
 */
function sendLog(code: string, message: string, level = 'error'): void {
  setDefaults()
  JSSDK.sendLog({
    code,
    message,
    level,
  })
}

export default {
  setConfig,
  sendEvent,
  sendLog,
  setDefaults,
  pageReport: JSSDK.pageReport.bind(JSSDK),
}
