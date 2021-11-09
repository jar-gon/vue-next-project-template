<template>
  <div class='pages-index-routers-dashboard.vue'>dashboard</div>
</template>
<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      data: [],
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      console.log('init!')
    },
  },
}
</script>
<style lang="less" scoped>
.pages-index-routers-dashboard.vue {

}
</style>
