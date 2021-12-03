import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { AppRouteRecordRaw } from './types'
import type { App } from 'vue'
import permission from './permission'
import routes from './routes'
import appConfig from '@/appConfig'

export const constantRouterMap: AppRouteRecordRaw[] = routes
export const asyncRouterMap: AppRouteRecordRaw[] = []

const router = createRouter({
  history: createWebHistory(appConfig.sitePath),
  // strict: true,
  routes: constantRouterMap as RouteRecordRaw[],
})

export function resetRouter(): void {
  const resetWhiteNameList = ['RedirectRoot', 'Redirect', 'Login', 'Root', 'Dashboard', 'Page404']
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !resetWhiteNameList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export function setupRouter(app: App<Element>) {
  permission(router)
  app.use(router)
}

export default router
