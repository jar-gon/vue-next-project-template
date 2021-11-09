<template>
  <div class="app-container" :class="themeType">
    <div class="l-container">
      <div
        class="l-container__left"
        v-bind:class="{ 'menu-in': menuIn, 'left-in': rightOpen }"
      >
        <div class="menu-left-head">
          <div class="logo" :class="{ small: menuIn }"></div>
        </div>
        <div
          class="menu-main-left-container"
          v-bind:class="{
            'menu-in': menuIn,
            'left-in': rightOpen,
            'is-overflow': isMenuOverFlow,
          }"
        >
          <el-scrollbar
            ref="menuScroll"
            class="menu-scrollbar"
            :vertical="true"
          >
            <template v-if="!menuIn">
              <el-menu
                :unique-opened="uniqueOpened"
                :router="true"
                :default-active="activeLink"
                class="menu-main-left"
                :default-openeds="openeds"
                data-v-step="/v-tour-start"
                @open="handleMenu('open')"
                @close="handleMenu('close')"
              >
                <template v-for="(item, index) in menus">
                  <el-submenu
                    v-if="
                      item.path !== '/' && item.subMenu && item.subMenu.length
                    "
                    :key="item.path"
                    :index="index + ''"
                    :data-v-step="item.path"
                  >
                    <template #title class="menu_title">
                      <i :class="item.icon"></i>
                      {{ item.ext2 || item.menuName }}
                    </template>
                    <MenuItem v-for="(sub, key) in item.subMenu" :key="key" :menu-info="sub" @menuClick="hadleMenuItemClick"/>
                  </el-submenu>
                  <el-menu-item
                    :index="item.path"
                    v-else
                    @click="hadleMenuItemClick(item, false)"
                    :key="item.path"
                    :data-v-step="item.path"
                  >
                    <i :class="item.icon"></i>
                    {{ item.ext2 || item.menuName }}
                  </el-menu-item>
                </template>
              </el-menu>
            </template>
            <template v-else>
              <el-menu
                :unique-opened="true"
                :router="true"
                :default-active="activeLink"
                class="menu-main-left"
                :class="{ 'el-menu--collapse': menuIn }"
                data-v-step="/v-tour-start"
              >
                <template v-for="(item, index) in menus" :key="item.path">
                  <div class="first-class-menu">
                    <template
                      v-if="
                        item.path !== '/' && item.subMenu && item.subMenu.length
                      "
                      :index="index + ''"
                      :data-v-step="item.path"
                    >
                      <el-popover
                        placement="right"
                        trigger="hover"
                        visible-arrow="false"
                        :popper-class="'submenu-popover ' + themeType"
                        :key="index + ''"
                        ref="menuChildPopover"
                      >
                        <el-scrollbar class="menu-scrollbar" :vertical="true">
                          <el-menu
                            :unique-opened="true"
                            :router="true"
                            :default-active="activeLink"
                            :class="{ 'el-menu--collapse': menuIn }"
                            data-v-step="menu-child-popover-tour"
                          >
                            <MenuItem v-for="(sub, key) in item.subMenu" :key="key" :menu-info="sub" @menuClick="hadleMenuItemClick"/>
                          </el-menu>
                        </el-scrollbar>
                        <template #reference>
                          <el-menu-item
                            :index="item.path"
                            @click="hadleMenuItemClick(item, false)"
                            :key="index + ''"
                            :data-v-step="item.path"
                          >
                            <el-tooltip
                              class="hover-item"
                              effect="dark"
                              :enterable="false"
                              :content="item.menuName"
                              placement="top"
                              :popper-class="'submenu-popper ' + themeType"
                            >
                              <span>
                                <i :class="item.icon"></i>
                              </span>
                            </el-tooltip>
                          </el-menu-item>
                        </template>
                      </el-popover>
                    </template>
                    <el-menu-item
                      :index="item.path"
                      v-else
                      @click="hadleMenuItemClick(item, false)"
                      :key="index + ''"
                      :data-v-step="item.path"
                    >
                      <el-tooltip
                        class="hover-item"
                        effect="dark"
                        :enterable="false"
                        :content="item.menuName"
                        placement="top"
                        :popper-class="'submenu-popper ' + themeType"
                      >
                        <span>
                          <i :class="item.icon"></i>
                        </span>
                      </el-tooltip>
                    </el-menu-item>
                  </div>
                </template>
              </el-menu>
            </template>
          </el-scrollbar>
        </div>
      </div>
      <div class="l-container__right" v-bind:class="{ 'nav-in': menuIn }">
        <div class="menu-head" v-bind:class="{ 'nav-in': menuIn }">
          <div class="menu-title">
            <el-tooltip
              class="item"
              effect="dark"
              :content="menuIn ? '点击展开导航栏' : '点击收起导航栏'"
              placement="bottom"
              :enterable="false"
              :popper-class="'submenu-popper ' + themeType"
            >
              <i
                class="menu-left-btn iconfont"
                :class="{
                  'icon-iconzhankaicelan': menuIn,
                  'icon-iconshouqicelan': !menuIn,
                }"
                v-on:click="toggleClick"
                data-v-step="menu-title"
              ></i>
            </el-tooltip>
          </div>
          <div class="menu-head__operation">
            <slot name="operation"></slot>
          </div>
        </div>
        <div
          class="menu-head-nav"
          v-bind:class="{
            'nav-in': menuIn,
            'right-in': rightMenu && rightMenu.length,
            'left-in': rightOpen,
          }"
        >
          <!-- <tags-view /> -->
        </div>
        <div
          class="container"
          :class="{ 'container-out': menuIn, ...modifyClass }"
        >
          <div class="container-router-page">
            <slot></slot>
          </div>
        </div>
        <div class="l-container__right--footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, reactive, ref, onMounted } from 'vue'
import { useStore } from 'vuex';
import MenuItem from './menu-item.vue'
export default defineComponent({
  name: 'Layout',
  props: {
    menus: {
      type: Array,
      required: true,
      default: () => [],
    },
    theme: {
      type: String,
      default: '',
    },
    uniqueOpened: {
      type: Boolean,
      default: false,
    },
    openeds: {
      type: Array,
      default: () => [],
    },
    modifyClass: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    MenuItem,
  },
  setup(props){
    const store = useStore();
    const data = reactive({
      rightOpen: false,
      isMenuOverFlow: false,
    })
    const doIsActive = () =>{
      return '/';
    }

    const menuScroll = ref(null);

    function toggleClick() {
      store.dispatch("ToggleMenu");
    }
    function toggleClickRight() {
      data.rightOpen = !data.rightOpen;
    }
    function handleIsMenuOverFlow() {
      // const gapHeigh = 200;
      try {
        setTimeout(() => {
          // data.isMenuOverFlow =
          //   menuScroll.$el.clientHeight <=
          //   menuScroll.$children[0].$el.clientHeight + gapHeigh;
        }, 200);
      } catch (e) {
        data.isMenuOverFlow = false;
        console.error("计算菜单是否溢出错误");
      }
    }

    // open close
    function handleMenu() {
      // 计算滚动条是否溢出
      handleIsMenuOverFlow();
    }

    onMounted(() => {
      handleIsMenuOverFlow();
      // the DOM element will be assigned to the ref after initial render
      console.log(menuScroll.value) // <div>This is a root element</div>
    })
    // 判断路由是否有权限跳转
    function hadleMenuItemClick(sub, subMenu) {
      console.log(sub, subMenu);
    }

    return {
      menuIn: computed(()=> {
        return store.state.collapsed;
      }),
      activeLink: computed(()=> {
        let isActive = doIsActive();
        return isActive;
      }),
      themeType: computed(() => {
        return props.theme ? ['theme_base', props.theme].join(' ') : '';
      }),
      toggleClick,
      toggleClickRight,
      handleIsMenuOverFlow,
      handleMenu,
      hadleMenuItemClick,
      ...data,
    }
  },
  data() {
    return {
      permission_ready: false,
      rightMenu: [],
      rightOpen: true,
      show_intro_notice: false,
      tags_view_no_cached: "redirect",
      microMode: true,
      isShowSellerTopTip: false,
      isMenuOverFlow: false,
      sellerTopInfo: {},
      isShowTopTheme: false,
    }
  },
  watch: {
    activeLink: function (val) {
      this.handl_watch_activeLink(val);
    },
  },
})
</script>
<style lang="less">
@import "./index.less";
</style>
