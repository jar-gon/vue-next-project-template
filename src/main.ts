import { createApp } from 'vue'

import App from './App.vue'

import router, { setupRouter } from '@/router' // 路由

import { setupStore } from '@/store' // 状态管理

import { setupGlobCom } from '@/components'
import { setupGlobDirectives } from '@/directives'

import '@/styles/index.less'

import 'virtual:svg-icons-register'

import track from '@/utils/track'

async function bootstrap() {
  const app = createApp(App)

  // track settting
  track.setConfig()
  track.setDefaults()

  setupStore(app) // 引入状态管理

  setupRouter(app) // 引入路由

  setupGlobCom(app) // 引入全局组件
  setupGlobDirectives(app)

  await router.isReady()

  app.mount('#app')
}
bootstrap()
