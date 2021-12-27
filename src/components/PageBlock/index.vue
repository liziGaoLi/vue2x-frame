<template>
  <div class="PageBlock">
    <div class="title">
      <slot name="title"></slot>
    </div>
    <div class="block-con">
      <slot name="default"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PageBlock"
  }
</script>

<style scoped lang="scss">
.PageBlock {
  background: #fff;
  border-radius: 5px;
  padding: 0 15px 15px;

  .title {
    font-size: 16px;
    font-weight: 700;
    height: 40px;
    line-height: 40px;
  }
}
</style>