import { AxiosRequestConfig } from 'axios'
import service, { axiosInst as axiosInst2 } from './service'
import appConfig from '@/appConfig'
import auth from '@/utils/auth'

export default function fetch(options: AxiosRequestConfig, isReject = false): Promise<any> {
  return new Promise<CommonResType>((resolve, reject) => {
    service(options)
      .then((response) => {
        const res = response.data
        // 未登陆
        if (res.code == 11) {
          auth[res.code === '11' ? 'login' : 'logout']()
          return
        }
        resolve(res)
      })
      // 注释错误透传
      .catch((error) => {
        if (isReject) {
          reject(error)
        } else {
          console.log(error)
        }
      })
  })
}

export function basicHttp(
  url: string,
  method: 'get' | 'GET' | 'delete' | 'DELETE' | 'post' | 'POST' | 'put' | 'PUT',
  data?: any,
  params?: any,
): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    fetch(
      {
        url,
        method,
        data,
        params,
      },
      !!appConfig.PROD,
    )
      .then((res) => {
        if (!res) {
          throw new Error('后端返回数据为空，请联系相关后端人员')
        }
        const { code, data, message } = res
        if (code !== '0') {
          throw new Error(message)
        }
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export function post(url: any, data?: any, params?: any): Promise<any> {
  return basicHttp(url, 'POST', data, params)
}

export function get(url: any, params?: any): Promise<any> {
  return basicHttp(url, 'GET', null, params)
}

export function put(url: any, data?: any, params?: any): Promise<any> {
  return basicHttp(url, 'PUT', data, params)
}
export function del(url: any, data?: any, params?: any): Promise<any> {
  return basicHttp(url, 'DELETE', data, params)
}
export const axiosInst = service
export const axiosOrigin = axiosInst2
