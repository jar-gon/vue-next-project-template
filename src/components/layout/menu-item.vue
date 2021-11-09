<template>
  <el-menu-item-group
    v-if="menuInfo.subMenu && menuInfo.subMenu.length"
  >
    <template #title>
      <span>{{ menuInfo.ext2 || menuInfo.menuName }}</span>
    </template>
    <el-menu-item
      v-for="(groupItem, groupKey) in menuInfo.subMenu"
      :index="groupItem.path"
      :key="groupKey"
      @click.self="hadleMenuItemClick(groupItem, false)"
    >
      <i :class="groupItem.icon"></i>
      {{ groupItem.ext2 || groupItem.menuName }}
    </el-menu-item>
  </el-menu-item-group>
  <el-menu-item
    v-else
    :index="menuInfo.path"
    @click.self="hadleMenuItemClick(menuInfo, false)"
  >
    {{ menuInfo.ext2 || menuInfo.menuName }}
  </el-menu-item>
</template>
<script lang="ts">
import { computed } from 'vue';
export default {
  name: "MenuItem",
  props: {
    menuInfo: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  setup(props) {
    return {
      isLink: computed(()=> {
        const url = props.menuInfo.path;
        return url.startsWith("http") || url.startsWith("https");
      })
    }
  },
  data() {
    return {};
  },
  methods: {
    hadleMenuItemClick(menu) {
      this.$emit("menuClick", menu);
    },
  },
};
</script>
<style>
</style>
