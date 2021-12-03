declare interface Fn<T = any> {
  (...arg: T[]): T
}

// 任意对象
declare interface IObj<T = any> {
  [key: string]: T
  [key: number]: T
}

declare type Nullable<T> = T | null

declare interface FetchConfig {
  params?: any
  data?: any
  url?: string
  method?: 'get' | 'post' | 'delete' | 'put'
  headersType?: string
  responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'
}

declare module '@zm-fe/zm-jssdk' {
  // export interface ZMJSSDKConfig {
  //   environment: 'test' | 'uat' | 'pro'
  //   // debug模式, 可选值:error / debug。调试阶段，可以在console查看打印信息
  //   logLevel: 'error'
  //   // histroy模式
  //   history: boolean
  //   // 默认不上报PV/UV
  //   autoReport: boolean
  //   // 对XMLHttpRequest异常自动上报
  //   interceptor: boolean
  // }
  // export interface ZMJSSDK {
  //   setConfig(config: ZMJSSDKConfig): void
  //   setDefaults(params: any): void
  //   sendEvent(params: any): void
  //   sendLog(params: any): void
  //   pageReport(params: any): void
  // }
  const setConfig: (config: any) => void
  const setDefaults: (params: any) => void
  const sendEvent: (params: any) => void
  const sendLog: (params: any) => void
  const pageReport: () => void
  export { setConfig, setDefaults, sendEvent, sendLog, pageReport }
}
