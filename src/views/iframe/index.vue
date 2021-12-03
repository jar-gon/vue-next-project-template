<template>
  <div v-loading="loading" class="ifram-main" :style="getWrapStyle">
    <iframe ref="frameRef" :src="frameSrc" class="ifram-main__content" @load="hideLoading"></iframe>
  </div>
</template>

<script setup lang="ts" name="IframePage">
import type { CSSProperties } from 'vue'
import { ref, unref, computed, PropType } from 'vue'
import { useWindowSizeFn } from '@/hooks/event/useWindowSizeFn'
defineProps({
  frameSrc: {
    type: String as PropType<string>,
    default: '',
  },
})

const loading = ref(true)
const topRef = ref(50)
const heightRef = ref(window.innerHeight)
const frameRef = ref<HTMLFrameElement>()

useWindowSizeFn(calcHeight, 150, { immediate: true })

const getWrapStyle = computed((): CSSProperties => {
  return {
    height: `${unref(heightRef)}px`,
  }
})

function calcHeight() {
  const iframe = unref(frameRef)
  if (!iframe) {
    return
  }
  const top = 80
  topRef.value = top
  heightRef.value = window.innerHeight - top
  const clientHeight = document.documentElement.clientHeight - top
  iframe.style.height = `${clientHeight}px`
}

function hideLoading() {
  loading.value = false
  calcHeight()
}
</script>
<style lang="less" scoped>
.ifram-main {
  width: 100%;
  &__content {
    border: 0;
    width: 100%;
  }
}
</style>
