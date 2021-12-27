<template>
  <div class="Page">
    <slot></slot>

    <div class="page-buttons">
      <slot name="footer-buttons"></slot>
      <el-button
        size="small"
        @click="closeTab"
      >关闭</el-button>
    </div>
  </div>
</template>

<script>
  import { DELETE_TAB, CHANGE_CURRENT_TAB_ID } from "../../store/mutations/types";
  import { mapMutations, mapState } from 'vuex';
  export default {
    name: "Page",
    computed: {
      ...mapState(['tabs', 'currentTabId'])
    },
    methods: {
      // 关闭页签
      closeTab() {
        const id = this.currentTabId;
        const currentTabIndex = this.tabs.findIndex(tab => tab.id === id);
        const nextTab = this.tabs[currentTabIndex < this.tabs.length - 1 ? currentTabIndex + 1 : this.tabs.length - 2];
        this.changeCurrentTab(nextTab.id);
        this.removeTab(id);
        this.$router.replace(nextTab.link);
      },

      ...mapMutations({
        removeTab: DELETE_TAB,
        changeCurrentTab: CHANGE_CURRENT_TAB_ID
      })
    }
  }
</script>

<style lang="scss">
.Page {

  .view-item {
    margin: 15px;
    background: #fff;
    border-radius: 5px;
  }

  .page-buttons {
    text-align: center;
    margin: 15px 0;
  }
}
</style>