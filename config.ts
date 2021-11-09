import { resolve } from 'path';

export const baseUrl = '/site-name/'
export const siteTitle = 'B端项目模版'

export function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir);
}
export const devServer = {
  open: baseUrl,
  port: 3000, // 服务端口
  host: 'b.zmlearn.com',
  proxy: {
    // 代理
    // with options
    '/api': {
      target: 'https://p-test.zmlearn.com/',
      changeOrigin: true,
    },
  },
  https: {
    key: pathResolve('ssl/server.key'),
    cert: pathResolve('ssl/server.pem'),
  },
}

export const alias = {
  '@': pathResolve('src'),
  '#': pathResolve('types'),
}
