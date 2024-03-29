<template>
  <div
    :class="{
      'has-logo': showLogo && layout === 'Classic',
      'sidebar-container--Top': layout === 'Top',
    }"
    class="sidebar-container"
  >
    <el-scrollbar>
      <el-menu
        :default-active="activeMenu"
        :collapse="collapsed"
        :unique-opened="false"
        :mode="mode"
        @select="selectMenu"
      >
        <sider-item
          v-for="route in showMenuTab ? menuTabRouters : routers"
          :key="route.path"
          :item="route"
          :layout="layout"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts" name="Sider">
import { computed, PropType } from 'vue'
import { useRouter } from 'vue-router'
import { usePermissionStore } from '@/store/modules/permission'
const permissionStore = usePermissionStore()
import { useAppStore } from '@/store/modules/app'
const appStore = useAppStore()
import SiderItem from './SiderItem.vue'
import { isExternal } from '@/utils/validate'
import { useInitInfoStore } from '@/store/modules/initInfo'
const initInfoStore = useInitInfoStore()
defineProps({
  layout: {
    type: String as PropType<string>,
    default: 'Classic',
  },
  mode: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'vertical',
  },
})

const { currentRoute, push } = useRouter()
const routers = computed(() => initInfoStore.menus)
const activeMenu = computed(() => {
  const { meta, path } = currentRoute.value
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu as string
  }
  return path
})
const collapsed = computed(() => appStore.getCollapsed)
const showLogo = computed(() => appStore.getShowLogo)

const showMenuTab = computed(() => appStore.getShowMenuTab)
const menuTabRouters = computed(() => permissionStore.getMenuTabRouters)
// TODO fix: Path xxx was passed with params but they will be ignored. Use a named route alongside params instead.
function selectMenu(index: string) {
  if (currentRoute.value.fullPath === index) return
  if (isExternal(index)) {
    window.open(index)
  } else {
    push(index)
  }
}
</script>

<style lang="less" scoped>
.sidebar-container {
  height: 100%;

  :deep(.svg-icon) {
    margin-right: 16px;
  }

  :deep(.el-scrollbar) {
    width: 100%;
    height: 100%;

    .el-scrollbar__wrap {
      overflow: scroll;
      overflow-x: hidden;

      .el-menu {
        width: 100%;
        border: none;
      }
    }
  }
}

.has-logo {
  height: calc(~'100% - var(--top-sider-height)');
}

.sidebar-container--Top {
  :deep(.el-scrollbar) {
    width: 100%;
    height: 100%;

    .el-scrollbar__wrap {
      overflow: scroll;
      overflow-x: hidden;

      .el-scrollbar__view {
        height: var(--top-sider-height);
      }

      .el-menu {
        width: auto;
        height: 100%;
        border: none;
      }
    }
  }
}
</style>
