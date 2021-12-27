<template>
  <Page class="DataUsageView">
    <PageBlock class="view-item">
      <span slot="title">机构信息</span>
      <DynamicForm
        :values="pageData"
        :structure="formStructure.orgStructure"
        :cols="2"
        :readonly="true"
        :options="dicOptions"
        @change="changePageState"
      />
    </PageBlock>
    <PageBlock class="view-item">
      <span slot="title">服务信息</span>
      <DynamicTable
        :column="[{
            id: 'serviceName',
            label: '服务类型',
          },
          {
            id: 'contractStatus',
            label: '状态',
            options: 'contactStatus'
          },
          {
            id: 'effectiveDate',
            label: '开通日期',
          },
          {
            id: 'businessType',
            label: '用途',
            options: 'authUses'
          }]"
        :data="serviceList"
        rowKey="serviceCode"
        :dicOptions="dicOptions"
        :pageSize="pageSize"
        :currentPage="currentPage"
        :total="total"
        @query="queryList"
      />
    </PageBlock>
    <PageBlock class="view-item">
      <span slot="title">经办人信息</span>
      <DynamicForm
        :values="pageData"
        :structure="formStructure.handlerInfo"
        :cols="2"
        :readonly="true"
        :options="dicOptions"
        @change="changePageState"
      />
    </PageBlock>
    <PageBlock class="view-item">
      <span slot="title">操作记录</span>
      <OperationRecord
        :data="pageData.useTime"
        rowKey="time"
      />
    </PageBlock>
  </Page>
</template>

<script>
  import DynamicForm from '../../components/DynamicForm';
  import DynamicTable from '../../components/DynamicTable';
  import OperationRecord from '../../components/OperationRecord';
  import Page from '../../components/Page';
  import PageBlock from '../../components/PageBlock';
  import formData from '../../pages/DataUsageView/formData';
  import { CHANGE_PAGE_STATE } from "../../store/mutations/types";
  import { mapState } from 'vuex';
  export default {
    name: "DataUsageView",
    data() {
      return {
        // 表单结构数据
        formStructure: formData.formStructure,
        // 服务信息列表
        serviceList: [],
        pageSize: 5,
        currentPage: 1,
        total: 0
      }
    },
    computed: {
      ...mapState({
        dicOptions: 'dicOptions',
        currentTabId: 'currentTabId',
        pageData: (state) => {
          return state.pages[state.currentTabId];
        }
      }),
    },
    components: {
      Page,
      PageBlock,
      DynamicForm,
      DynamicTable,
      OperationRecord
    },
    created() {
      this.$store.dispatch('getCommonDicOptions', ['orgType', 'runStatus', 'contactStatus', 'authUses']);
      this.refreshPage();
    },
    beforeRouteUpdate(to, from, next) {
      this.refreshPage();
      next();
    },
    methods: {
      // 修改page对象中的数据
      changePageState(payload, pageId) {
        this.$store.commit(CHANGE_PAGE_STATE, { data: payload, pageId: pageId || this.currentTabId })
      },
      refreshPage() {
        this.queryList({pageSize: 5, currentPage: 1});
        this.getOrgInfo();
      },
      // 查询服务信息列表
      async queryList(payload) {
        const { authCode } = this.$route.params;
        try {
          const { pageSize, currentPage, total, rows } = await this.$ajax.request('serviceList', {
            ...payload,
            authCode
          });
          this.serviceList = rows;
          this.pageSize = pageSize;
          this.currentPage = currentPage;
          this.total = total;
        }
        catch (e) {
          console.error('获取服务信息列表失败：', e);
        }
      },
      // 查询机构信息
      async getOrgInfo() {
        const { authCode } = this.$route.params;
        try {
          const { rows } = await this.$ajax.request('dataUsageDetail', { authCode });
          this.changePageState(rows);
        }
        catch (e) {
          console.error('获取服务信息列表失败：', e);
        }
      }
    }
  }
</script>

<style lang="scss">
.DataUsageView {

  .view-item {
    margin: 15px;
  }
}
</style>