<template>
  <router-view />
</template>

<script lang="ts">
import { mapState } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      locale: {},
    }
  },
  computed: {
    ...mapState(['flatMenu']),
  },
  mounted(): void {
    // this.$store.dispatch('initData')
  },
}
</script>
