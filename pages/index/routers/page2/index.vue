<template>
  <div class='pages-index-routers-page2-index.vue'>22222</div>
</template>
<script>
export default {
  name: 'Index',
  props: {
    propVar: {
      type: Object,
      required: true,
      default: () => {
        return {}
      },
    },
  },
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
.pages-index-routers-page2-index.vue {
 
}
</style>
