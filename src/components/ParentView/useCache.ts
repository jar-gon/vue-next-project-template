import { computed, ref, unref, ComponentInternalInstance, getCurrentInstance } from 'vue'

import { useTagsViewStoreWithOut, PAGE_LAYOUT_KEY } from '@/store/modules/tags-view'

import { useRouter } from 'vue-router'

function tryTsxEmit<T extends ComponentInternalInstance>(
  fn: (_instance: T) => Promise<void> | void
) {
  const instance = getCurrentInstance() as any
  instance && fn.call(null, instance)
}

const ParentLayoutName = 'ParentLayout'
export function useCache(isPage: boolean) {
  const tagsViewStore = useTagsViewStoreWithOut()
  const name = ref('')
  const { currentRoute } = useRouter()

  tryTsxEmit((instance) => {
    const routeName = instance.type.name
    if (routeName && ![ParentLayoutName].includes(routeName)) {
      name.value = routeName
    } else {
      const matched = currentRoute.value.matched
      const len = matched.length
      if (len < 2) return
      name.value = matched[len - 2].name as string
    }
  })

  const getCaches = computed((): string[] => {
    const cached = tagsViewStore.getCachedViews

    if (isPage) {
      //  page Layout
      // not parent layout
      return (cached as any).get(PAGE_LAYOUT_KEY) || []
    }
    const cacheSet = new Set<string>()
    cacheSet.add(unref(name))

    const list = (cached as any).get(unref(name))

    if (!list) {
      return Array.from(cacheSet)
    }
    ;(list as string[]).forEach((item: string) => {
      cacheSet.add(item)
    })

    return Array.from(cacheSet)
  })
  return { getCaches }
}
