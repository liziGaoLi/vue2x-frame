<template>
  <div class="DataUsageList">
    <div class="query-form">
      <el-row>
        <el-col :md="8">
          <span class="label">时间段：</span>
          <el-date-picker
            v-model="formValues.timeRange"
            type="daterange"
            size="small"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-col>
        <el-col :md="6">
          <span class="label">机构名称：</span>
          <el-input
            v-model="formValues.orgName"
            size="small"
            placeholder="请输入机构名称"
          ></el-input>
        </el-col>
        <el-col :md="6">
          <span class="label">授权方式：</span>
          <el-select
            v-model="formValues.authType"
            placeholder="请选择授权方式"
            size="small"
          >
            <el-option
              v-for="option in dicOptions.authType"
              :key="option.dictValue"
              :label="option.dictLabel"
              :value="option.dictValue"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :md="4" class="query-btn">
          <el-button size="small" type="primary" @click="() => queryList(0)">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="list-wrap">
      <ListItem
        v-for="listItem in list"
        :key="listItem.authcode"
        :item="listItem"
        :options="dicOptions || {}"
        @check="openPage"
      ></ListItem>
      <div class="next-btn" @click="() => currentChange(currentPage+1)">下一页</div>
    </div>
    <div class="pagination">
      <el-pagination
        layout="prev, pager, next, sizes, jumper"
        :total="total"
        :page-size="pageSize"
        :current-page="currentPage"
        :page-sizes="[9, 19, 29, 49]"
        @size-change="sizeChange"
        @current-change="currentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
  import ListItem from "./components/ListItem";
  import {ADD_TAB, CHANGE_CURRENT_TAB_ID} from "../../store/mutations/types";

  export default {
    name: "DataUsageList",
    data() {
      return {
        // 查询表单数据
        formValues: {},
        // 分页器数据-当前页码
        currentPage: 1,
        // 分页器—每页多少数据
        pageSize: 19,
        // 分页器-数据总数
        total: 0,
        // 列表数据
        list: []
      }
    },
    components: {
      ListItem
    },
    computed: {
      ...mapState(['dicOptions']),
    },
    created() {
      this.$store.dispatch('getCommonDicOptions', ['authType', 'authUses']);
      this.queryList();
    },
    methods: {
      // 查询列表数据
      async queryList(size) {
        try {
          const {rows, pageSize, total, currentPage} = await this.$ajax.request('dataUsageList', {
            ...this.formValues,
            pageSize: size || this.pageSize,
            currentPage: this.currentPage,
          });
          this.list = rows;
          this.pageSize = pageSize;
          this.total = total;
          this.currentPage = currentPage;
        }
        catch (e) {
          console.error('获取数据使用列表出错：', e);
        }
      },
      // 分页器-每页数据条数改变
      sizeChange(size) {
        this.pageSize = size;
        this.queryList(size);
      },
      // 分页器-当前页码改变
      currentChange(page) {
        this.currentPage = page;
        this.queryList();
      },
      // 点击查看按钮，查看数据使用详情
      openPage(authcode) {
        const link = `/searchStatistics/usageDetail/${authcode}`;
        const id = `${Date.now()}`;
        this.$router.push(link);
        this.$store.commit(ADD_TAB, {
          id,
          label: '数据使用详情',
          link,
          multiply: false,
          name: id
        });
        this.$store.commit(CHANGE_CURRENT_TAB_ID, id);
      }
    },
  }
</script>

<style lang="scss">
@import "index.scss";
</style>