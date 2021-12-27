<template>
  <div class="Title">
    <div class="title-con">
      <slot></slot>
    </div>
    <div class="title-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Title"
  }
</script>

<style scoped lang="scss">
  $backColor: #fff;
  .Title {
    display: flex;
    justify-content: space-between;
    background: $backColor;
    height: 44px;
    line-height: 44px;
    padding: 0 15px;

    .title-con {
      font-size: 16px;
      color: #333;
      font-weight: 700;
    }

    .title-right {
      font-size: 14px;
      color: #a9a9a9;
    }
  }
</style>