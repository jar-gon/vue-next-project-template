import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import html from 'vite-plugin-html'
import { alias, baseUrl, devServer, pathResolve, siteTitle } from './config'

// https://vitejs.dev/config/
export default defineConfig({
  base: baseUrl,
  plugins: [
    vue(),
    html({
      inject: {
        injectData: {
          title: siteTitle,
        },
      }
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: pathResolve('pages/index.html'),
        index: pathResolve('pages/index/index.html'),
      }
    }
  },
  server: devServer,
  resolve: {
    alias,
  },
})
