<template>
  <AppLayout
    :menus="menus"
    theme="default"
    :uniqueOpened="false"
    :modifyClass="modifyClass"
  >
    <template #operation>
      <div class="attention">
        <el-dropdown trigger="click">
          <el-button type="text"
            >{{ userInfo.name }}<i class="el-icon-arrow-down el-icon--right"></i
          ></el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <div @click="handl_show_perso">
                <el-dropdown-item>
                  <span>个人设置</span>
                </el-dropdown-item>
              </div>
              <div @click="handl_log_out">
                <el-dropdown-item>
                  <span>退出登录</span>
                </el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </template>
    <router-view v-slot="{ Component }">
      <keep-alive :exclude="tags_view_no_cached">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <template #footer>
      <div class="copyright">
        Copyright@{{copyrightYear}} 上海掌小门教育科技有限公司 <a target="_bank" href="//sale.zmaxis.com/doc/">销售研发团队</a>
      </div>
    </template>
  </AppLayout>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'
import AppLayout from '@/components/layout'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    AppLayout,
  },
  setup() {
    const store = useStore();
    return {
      menus: computed(()=> store.state.menus),
      userInfo: computed(()=> store.state.userInfo),
      copyrightYear: computed(() => {
        return new Date().getFullYear()
      }),
      modifyClass: computed(() => {
        const obj = {
          'full-page': false,
          'docs-page': false,
        }
        return obj
      }),
      tags_view_no_cached: "redirect",
    }
  },
  // data() {
  //   return {
  //     permission_ready: false,
  //     // danmu_buffer:[],
  //     // danmu_cur:null,
  //     rightMenu: [],
  //     rightOpen: true,
  //     show_intro_notice: false,
  //     // notAllow: false,
  //     tags_view_no_cached: "redirect",
  //     microMode: true,
  //     isShowSellerTopTip: false,
  //     isMenuOverFlow: false,
  //     sellerTopInfo: {},
  //     isShowTopTheme: false,
  //   }
  // },
  methods: {
    handl_log_out() {
      // @todo 清除 js-cookie 信息
      window.location.replace("/logout");
    },
    handl_show_perso() {
      this.$router.replace({
        path: "/form/normal",
      });
    },
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
