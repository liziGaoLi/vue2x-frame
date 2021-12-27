<template>
  <div class="Table">
    <!--表头-->
    <div class="column">
      <el-row>
        <el-col
          v-for="item in column"
          :key="item.dataIndex"
          :span="item.span"
        >{{item.label}}</el-col>
      </el-row>
    </div>
    <div
      class="scroll-box"
      ref="scrollWrap"
      @mouseenter="stopScroll"
      @mouseleave="continueScroll"
    >
      <div class="table-body" ref="tableBody">
        <div class="list" ref="list">
          <el-row
            v-for="listItem in data"
            :key="listItem[rowKey]"
          >
            <el-col
              v-for="columnItem in column"
              :key="columnItem.dataIndex"
              :span="columnItem.span"
            >
              {{listItem[columnItem.dataIndex]}}
            </el-col>
          </el-row>
        </div>
        <div class="copy-list" v-html="copyHtml"></div>
      </div>
      <div v-if="data.length === 0" class="empty-tips">
        <i class="el-icon-orange"></i>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "Table",
    props: ['rowKey', 'data', 'column'],
    data() {
      return {
        copyHtml: ''
      }
    },
    watch: {
      data() {
        this.$nextTick(function () {
          this.scroll();
        });
      }
    },
    methods: {
      // 停止滚动
      stopScroll() {
        if (this.timer) clearTimeout(this.timer);
      },
      // 从停止滚动的位置继续滚动
      continueScroll() {
        this.scroll();
      },
      // 列表滚动
      scroll() {
        const scrollWrapHeight = this.$refs.scrollWrap.clientHeight;
        const tableBody = this.$refs.tableBody;
        const listBox = this.$refs.list;
        const listHeight = listBox.offsetHeight;
        this.copyHtml = listBox.innerHTML;
        if (listHeight <= scrollWrapHeight) return false;
        if (this.timer) clearTimeout(this.timer);
        this.posY = this.posY || 0;
        const loop = () => {
          if (this.timer) clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            this.posY ++;
            if (this.posY >= listHeight) this.posY = 0;
            tableBody.style.transform = `translateY(-${this.posY}px)`;
            loop();
          }, 20)
        }
        loop();
      }
    }
  }
</script>

<style scoped lang="scss">
  $backColor: #fafaf9;
  $borderColor: #d9d9d9;


  .Table {
    .column {
      background: $backColor;
      font-weight: bold;
    }

    .el-row {
      text-align: center;
      line-height: 34px;
      height: 34px;
      border-bottom: 1px solid $borderColor;
      font-size: 14px;
    }

    .scroll-box {
      position: relative;
      height: 175px;
      overflow: hidden;

      .table-body {
        /*position: absolute;*/
        /*width: 100%;*/
      }
    }

    .empty-tips {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -100px;
      margin-left: -100px;
      width: 200px;
      height: 200px;
      line-height: 200px;
      text-align: center;
      font-size: 20px;
    }


  }
</style>