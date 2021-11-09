import { App, createApp } from 'vue'
import axios from '@/utils/service'
// import store, { key } from '@/store'
import track from '@/utils/track'
import './index.less'
import app from './App.vue'
import UI from '@/ui'

let instance: App
let router
function render() {
  instance = createApp(app)
  // router = getRouter()
  track.setConfig()
  track.setDefaults()

  instance.config.globalProperties.$track = track
  instance.config.globalProperties.$axios = axios

  // instance.use(store, key)

  instance.use(router)
  instance.use(UI)
  instance.mount('#app')
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

// support qiankun
export async function bootstrap(): Promise<void> {
  console.log('[vue] vue app-bootstraped')
}

export async function mount(props: Record<string, any>): Promise<void> {
  console.log('[vue] props from main-framework', props)
  render()
  if (props.router) {
    router.push(props.router.currentRoute)
  }
  console.log('render...')
}

export async function unmount(props: Record<string, any>): Promise<void> {
  console.log('[vue] props from main-unmount', props)
  instance.unmount()
}

export async function update(props: Record<string, any>): Promise<void> {
  console.log('[vue] props from main-update', props)
}
