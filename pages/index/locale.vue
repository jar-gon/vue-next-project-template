<template>
  <App />
</template>

<script lang="ts">
import App from './App.vue'

export default {
  name: 'Locale',
  components: {
    App,
  },
  data() {
    return {
      locale: {},
    }
  },
}
</script>
