import type { RouteRecordRaw } from 'vue-router'
export interface RouteMeta {
  hidden?: boolean
  alwaysShow?: boolean
  title?: string
  icon?: string
  noCache?: boolean
  breadcrumb?: boolean
  affix?: boolean
  activeMenu?: string
  parent?: string
  noTagsView?: boolean
  followAuth?: string
  showMainRoute?: boolean
  followRoute?: string
  menuName?: string
  permission?: string
  entry?: string
  path_hash?: RegExp
  regx?: RegExp
  noAuth?: boolean
}
// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  meta: RouteMeta
  title?: string
  children?: AppRouteRecordRaw[]
  props?: Record<string, any> | boolean
  prefix?: string
}
