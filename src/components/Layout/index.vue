<template>
  <el-container class="Layout">
    <!--抽屉型菜单栏-->
    <el-drawer
      v-if="menuType === 'Drawer'"
      :visible="isCollapsed"
      :size="200"
      :with-header="false"
      direction="ltr"
      :modal="true"
      :wrapperClosable="true"
      @close="() => isCollapsed = !isCollapsed"
    >
      <div class="menus-container">
        <el-scrollbar>
          <Menu />
        </el-scrollbar>
      </div>
    </el-drawer>
    <!--普通型菜单栏-->
    <el-aside
      :width="isCollapsed ? '64px' : '200px'"
      class="layoutAside"
      v-else
    >
      <div class="menus-container">
        <el-scrollbar>
          <Menu />
        </el-scrollbar>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import Menu from '../Menu';
  import Header from '../Header';
  import {mapMutations, mapState} from 'vuex';
  import {CHANGE_MENU_STATUS} from "../../store/mutations/types";
  import {Base64} from 'js-base64';

  export default {
    name: "Layout",
    data() {
      return {
        sideWidth: 200
      };
    },
    mounted() {
      // 监听浏览器刷新，保存store数据
      window.addEventListener('beforeunload', () => {
        window.sessionStorage.setItem('vuexState', Base64.encode(JSON.stringify(this.$store.state)));
      });
    },
    beforeDestroy() {
      window.removeEventListener('beforeunload');
    },
    computed: {
      ...mapState({
        menuType: function (state) {
          return state.menuStatus.type
        }
      }),
      isCollapsed: {
        get() {
          return this.$store.state.menuStatus.isCollapsed;
        },
        set(value) {
          this.changeMenuStatus({
            isCollapsed: value
          })
        }
      }
    },
    components: {
      Menu,
      Header
    },
    methods: {
      ...mapMutations({
        changeMenuStatus: CHANGE_MENU_STATUS
      })
    }
  }
</script>

<style lang="scss">
  @import "index.scss";
</style>