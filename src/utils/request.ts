import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

import { ElMessage } from 'element-plus'

import qs from 'qs'

import config from '@/appConfig'

const { baseUrl, requestTimeout } = config

// 创建axios实例
const service: AxiosInstance = axios.create({
  withCredentials: true, // send cookies when cross-domain requests
  baseURL: baseUrl, // api 的 base_url
  timeout: requestTimeout, // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (
      config.method === 'post' &&
      (config.headers as any)['Content-Type'] === 'application/x-www-form-urlencoded'
    ) {
      config.data = qs.stringify(config.data)
    }
    // get参数编码
    if (config.method === 'get' && config.params) {
      let url = config.url as string
      url += '?'
      const keys = Object.keys(config.params)
      for (const key of keys) {
        if (config.params[key] !== void 0 && config.params[key] !== null) {
          url += `${key}=${encodeURIComponent(config.params[key])}&`
        }
      }
      url = url.substring(0, url.length - 1)
      config.params = {}
      config.url = url
    }
    return config
  },
  (error: AxiosError) => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    const result = response.data || {}
    if (response.config.responseType === 'blob') {
      // 如果是文件流，直接过
      return response
    } else if (result.msgCode === '200' || result.code === '0') {
      return result
    } else {
      // TODO intel
      ElMessage.error(result.message || 'system error')
    }
  },
  (error: AxiosError) => {
    console.log('err' + error) // for debug
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default service
