import type { UserConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { resolve } from 'path'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import eslintPlugin from 'vite-plugin-eslint'
import ElementPlus from 'unplugin-element-plus/vite'
import viteSvgIcons from 'vite-plugin-svg-icons'
import commonjsExternals from 'vite-plugin-commonjs-externals'
import { viteMockServe } from 'vite-plugin-mock'
import { injectHtml } from 'vite-plugin-html'
import { name } from './package.json'
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  return {
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => tag.startsWith('micro-'),
          },
        },
      }),
      injectHtml({
        injectData: {
          // TODO 系统名称
          title: name,
        },
      }),
      vueJsx(),
      vueSetupExtend(),
      ElementPlus({
        useSource: false,
      }),
      Components({
        dts: true,
        resolvers: [ElementPlusResolver()],
      }),
      eslintPlugin({
        cache: false,
        include: ['src/**/*.vue', 'src/**/*.ts', 'src/**/*.tsx'], // 检查的文件
      }),
      viteSvgIcons({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
        // 压缩
        svgoOptions: false,
      }),
      commonjsExternals({
        externals: ['path'],
      }),
      viteMockServe({
        // default
        ignore: /.json$/,
        mockPath: 'mock',
        localEnabled: mode === 'dev' || command === 'serve',
        prodEnabled: false,
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          additionalData: '@import "./src/styles/variables.less";',
          javascriptEnabled: true,
          charset: false,
        },
      },
    },
    resolve: {
      alias: [
        {
          find: /\@\//,
          replacement: pathResolve('src') + '/',
        },
        {
          find: /\_v\//,
          replacement: pathResolve('src/views') + '/',
        },
        {
          find: /\_c\//,
          replacement: pathResolve('src/components') + '/',
        },
      ],
    },
    build: {
      sourcemap: true,
    },
    server: {
      port: 3000, // 服务端口
      host: 'b.zmlearn.com',
      proxy: {
        // 代理
        // with options
        // '/api': {
        //   target: 'https://p-test.zmlearn.com/',
        //   changeOrigin: true,
        // },
      },
      https: {
        key: pathResolve('ssl/server.key'),
        cert: pathResolve('ssl/server.pem'),
      },
    },
  }
}
