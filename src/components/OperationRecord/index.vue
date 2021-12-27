<template>
  <div class="OperationRecord">
    <el-timeline>
      <el-timeline-item
        v-for="item in data"
        :key="item[rowKey]"
        :hide-timestamp="true"
        type="primary"
      >
        <div v-if="typeof item === 'string'" class="timeline-con">
          <span class="value">{{item}}</span>
        </div>
        <div v-else class="timeline-con">
          <span>{{item.type}}</span>
          <span class="label">创建人：</span>
          <span class="value">{{item.creator}}</span>
          <span class="label">创建时间：</span>
          <span class="value">{{item.time}}</span>
        </div>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
  export default {
    name: "OperationRecord",
    props: ['data', 'rowKey']
  }
</script>

<style scoped lang="scss">
$labelColor: #999;
.OperationRecord {
  padding-top: 10px;

  span.label {
    color: $labelColor;
    padding-left: 60px;
  }
}
</style>