<template>
  <router-link class="app-logo" to="/" :class="{ 'app-logo--Top': layout !== 'Classic' }">
    <div class="logo" :class="{ collapsed: !show }" :title="title"></div>
  </router-link>
</template>

<script setup lang="ts" name="Logo">
import { ref, watch, PropType, computed } from 'vue'
import { useAppStore } from '@/store/modules/app'
const appStore = useAppStore()

const props = defineProps({
  collapsed: {
    type: Boolean as PropType<boolean>,
    required: true,
  },
})

const show = ref<boolean>(true)
const title = computed(() => appStore.getLogoTitle)
const layout = computed(() => appStore.getLayout)
watch(
  () => props.collapsed,
  (collapsed: boolean) => {
    if (layout.value !== 'Classic') {
      show.value = true
    } else {
      if (!collapsed) {
        setTimeout(() => {
          show.value = !collapsed
        }, 400)
      } else {
        show.value = !collapsed
      }
    }
  }
)
</script>

<style lang="less" scoped>
.app-logo {
  display: flex;
  width: 100%;
  height: var(--top-sider-height);
  cursor: pointer;
  background-color: var(--menu-background-color);
  align-items: center;
  justify-content: center;
  .logo {
    width: 108px;
    height: 28px;
    // margin: auto auto auto 19px;
    font-size: 0;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url(https://web-data.zmlearn.com/image/fFjGLpkFzdsvZYtHiwTyRH/logo%EF%BC%8F108-28%402x.png);
    &.collapsed {
      background-image: url(https://web-data.zmlearn.com/image/iRq6CgT8SDSHN1VLDhceus/logo_small_0505.png);
      width: 27px;
      height: 28px;
    }
  }
}

.app-logo--Top {
  width: auto;
  padding: 0 5px;
  background-color: var(--top-menu-background-color);
  transition: background 0.2s;

  &:hover {
    background: #f6f6f6;
  }
}
</style>
