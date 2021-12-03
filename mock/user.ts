import { MockMethod } from 'vite-plugin-mock'
import initInfoData from './data/initInfo.json'
export default [
  {
    url: '/api/auth/sys/initInfo',
    method: 'get',
    response: ({ body, query }) => {
      console.log('body>>>>>>>>', body)
      console.log('query>>>>>>>>', query)
      return initInfoData
    },
  },
] as MockMethod[]
