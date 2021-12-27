<template>
  <div class="Header">
    <!--控制左侧菜单缩放-->
    <div class="toggle-btn"></div>
    <!--面包屑导航-->
    <div class="tab-box">
      <TabBar />
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import TabBar from '../TabBar';
  export default {
    name: "Header",
    computed: {
      ...mapState(['menuData', 'tabs', 'currentTabId'])
    },
    components: {
      TabBar
    }
  }
</script>

<style scoped>

</style>