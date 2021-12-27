<template>
  <Page
    class="OrgInfo"
    v-loading="loading"
  >
    <PageBlock class="view-block">
      <span slot="title">机构信息</span>
      <DynamicForm
        :values="pageData"
        :structure="formStructure.orgStructure"
        :cols="2"
        :readonly="false"
        :options="dicOptions"
        @change="changePageState"
      />
    </PageBlock>
    <PageBlock class="view-block">
      <span slot="title">联系人信息</span>
      <DynamicForm
        :values="pageData"
        :structure="formStructure.handlerInfo"
        :cols="2"
        :readonly="false"
        :options="dicOptions"
        @change="changePageState"
      />
    </PageBlock>
    <el-button
      type="primary"
      slot="footer-buttons"
      size="small"
      @click="handleConfirm"
    >确定</el-button>
  </Page>
</template>

<script>
  import Page from '../../components/Page';
  import PageBlock from '../../components/PageBlock';
  import DynamicForm from '../../components/DynamicForm';
  import { mapState } from 'vuex';
  import {CHANGE_PAGE_STATE} from "../../store/mutations/types";
  import pageStructure from './formData';

  export default {
    name: "OrgInfo",
    data() {
      return {
        formStructure: pageStructure,
        loading: false
      }
    },
    components: {
      Page,
      PageBlock,
      DynamicForm
    },
    created() {
      const { operate, orgCode } = this.$route.params;
      this.$store.dispatch('getCommonDicOptions', ['cityCode', 'orgType', 'runStatus']);
      if (operate === 'modify') this.$ajax.request('checkOrgInfo', { orgCode }).then(res => {
        this.changePageState(res);
      })
    },
    computed: {
      ...mapState({
        pageData: function (state) {
          return state.pages[state.currentTabId];
        },
        currentTabId: 'currentTabId',
        dicOptions: 'dicOptions'
      })
    },
    methods: {
      // 修改page对象中的数据
      changePageState(payload, pageId) {
        this.$store.commit(CHANGE_PAGE_STATE, { data: payload, pageId: pageId || this.currentTabId });
      },
      // 保存信息
      async handleConfirm() {
        const { operate } = this.$route.params;
        this.loading = true;
        switch (operate) {
          case 'add': {
            await this.save();
            break;
          }
          case 'modify': {
            await this.modify();
            break;
          }
          default:
            break;
        }
        this.loading = false;
        this.tip(operate === 'add' ? '添加成功' : '修改成功');
      },
      // 新增机构
      async save() {
        try {
          const {
            cityCode,
            orgName,
            orgType,
            orgShortName,
            certNumber,
            orgAddress,
            orgContactName,
            orgContactCardNo,
            orgContactTel
          } = this.pageData;
          await this.$ajax.request('addOrgInfo', {
            cityCode,
            orgName,
            orgType,
            orgShortName,
            certNumber,
            orgAddress,
            orgContactName,
            orgContactCardNo,
            orgContactTel
          })
        }
        catch(err) {
          console.error('保存机构信息失败', err);
        }
      },
      // 修改机构
      async modify() {
        try {
          const {
            cityCode,
            orgName,
            orgType,
            orgShortName,
            certNumber,
            orgAddress,
            orgContactName,
            orgContactCardNo,
            orgContactTel
          } = this.pageData;
          const { orgCode } = this.$route.params;
          await this.$ajax.request('modifyOrgInfo', {
            orgCode,
            cityCode,
            orgName,
            orgType,
            orgShortName,
            certNumber,
            orgAddress,
            orgContactName,
            orgContactCardNo,
            orgContactTel
          })
        }
        catch(err) {
          console.error('保存机构信息失败', err);
        }
      },
      // 提示
      tip(info, type) {
        this.$message({
          message: info,
          type: type || 'success',
        })
      }
    }
  }
</script>

<style lang="scss">
.OrgInfo {
  padding: 15px;

  .view-block {
    margin-bottom: 15px;
  }
}
</style>