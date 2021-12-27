<template>
  <div class="TabBar">
    <!--全部删除按钮-->
    <div class="remove-all-tab">
      <el-popconfirm
        title="确定要删除全部页签吗？"
        placement="left-end"
        @confirm="removeAllTabs"
      >
        <i slot="reference" class="el-icon-delete"></i>
      </el-popconfirm>
    </div>
    <!--菜单展开/折叠按钮-->
    <div class="toggle-menu">
      <i
        :class="isCollapsed ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
        @click="isCollapsed = !isCollapsed"
      ></i>
    </div>
    <!--页签栏-->
    <el-tabs
      v-model="activeTab"
      @tab-remove="handelRemoveTab"
    >
      <el-tab-pane
        v-for="tab in tabs"
        :closable="tab.name !== 'home'"
        :key="tab.id"
        :name="tab.id"
      >
        <router-link slot="label" :to="tab.link">{{tab.label}}</router-link>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex';
  import {
    CHANGE_CURRENT_TAB_ID,
    DELETE_TAB,
    DELETE_ALL_TAB,
    CHANGE_MENU_STATUS
  } from '../../store/mutations/types';
  export default {
    name: "TabBar",
    computed: {
      ...mapState(['tabs', 'currentTabId']),
      // 当前页签id
      activeTab: {
        get: function () {
          return this.currentTabId;
        },
        set: function (value) {
          this.changeCurrentTab(value);
        }
      },
      // 菜单栏展开/折叠
      isCollapsed: {
        get() {
          return this.$store.state.menuStatus.isCollapsed;
        },
        set(value) {
          this.changeMenuStatus({isCollapsed: value})
        }
      }
    },
    methods: {

      /**
       * 移除页签
       * 1.删除的如果不是当前页签，直接删除页签
       * 2.删除的如果是当前页签，删除页签后，如果被删除的页签后面有页签，则将后面的页签作为当前页签展示，如果后面没有页签了，则显示被删除页签的前一个页签
       * @param {String} id 要删除的页签id
       */
      handelRemoveTab(id) {
        if (id !== this.currentTabId) {
          this.removeTab(id);
        }
        else {
          const currentTabIndex = this.tabs.findIndex(tab => tab.id === id);
          const nextTab = this.tabs[currentTabIndex < this.tabs.length - 1 ? currentTabIndex + 1 : this.tabs.length - 2];
          this.changeCurrentTab(nextTab.id);
          this.removeTab(id);
          this.$router.replace(nextTab.link);
        }
      },
      ...mapMutations({
        // 移除页签
        removeTab: DELETE_TAB,
        // 删除全部页签
        removeAllTabs: DELETE_ALL_TAB,
        // 切换当前页签id
        changeCurrentTab: CHANGE_CURRENT_TAB_ID,
        // 改变主菜单状态
        changeMenuStatus: CHANGE_MENU_STATUS
      })
    }
  }
</script>

<style lang="scss">
@import "index.scss";
</style>