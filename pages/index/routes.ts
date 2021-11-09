import { RouteRecordRaw } from 'vue-router'
import Layout from '@/components/layout/layout.vue'
import routeView from '@/components/route-view.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Layout,
    meta: {
      menuName: '首页',
      // fullscreen: true, // 全屏显示
      // activeMenu: 'studentsList', // 高亮定位
      // showMenu: false, // 是否展示在左侧导航菜单
      // permission: 'zmoptpl:home', // 权限，暂不需要支持
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import(`./routers/dashboard.vue`),
      },
      {
        path: 'page',
        name: 'page',
        component: routeView,
        redirect: { name: 'manageRules' },
        meta: {
          // fullscreen: true,
        },
        children: [
          {
            path: 'page1',
            name: 'manageRules',
            component: () => import(`./routers/page1/index.vue`),
            meta: {
              // fullscreen: true,
            },
          },
          {
            path: 'page2',
            name: 'manageClassify',
            component: () => import(`./routers/page2/index.vue`),
            meta: {
              // fullscreen: true,
            },
          },
        ],
      },
      
    ],
  },
  {
    name: 'exception',
    path: 'exception',
    component: routeView,
    meta: {
      // fullscreen: true,
    },
    children: [
      {
        name: 'exception403',
        path: '403',
        component: () => import(`@/components/exception/403.vue`),
      },
      {
        name: 'exception404',
        path: '404',
        component: () => import(`@/components/exception/404.vue`),
      },
    ],
  },
]

export default routes
