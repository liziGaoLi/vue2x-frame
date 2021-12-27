<template>
  <Page class="OrgManage">
    <div class="query-form">
      <el-row>
        <el-col :md="8">
          <span class="label">机构名称：</span>
          <el-input
            v-model="formValues.orgName"
            size="small"
            placeholder="请输入机构名称"
          ></el-input>
        </el-col>
        <el-col :md="8">
          <span class="label">运行状态：</span>
          <el-select
            v-model="formValues.runStatus"
            size="small"
            placeholder="请选择运行状态"
          >
            <el-option
              v-for="option in dicOptions.runStatus"
              :key="option.dictValue"
              :label="option.dictLabel"
              :value="option.dictValue"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :md="8" class="query-btn">
          <el-button size="small" type="primary" @click="() => queryList(1)">查询</el-button>
          <el-button size="small" @click="resetForm">重置</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="table view-item">
      <el-table
        v-loading="loading"
        :data="list"
        :row-key="row => row.pkey"
      >
        <el-table-column
          label="机构名称"
          prop="orgName"
          width="140px"
          align="center"
        ></el-table-column>
        <el-table-column
          label="机构类型"
          prop="orgType"
          align="center"
        >
          <span slot-scope="{row}">
            {{(dicOptions.orgType.find(item => item.dictValue === row.orgType) || {}).dictLabel}}
          </span>
        </el-table-column>
        <el-table-column
          label="机构地址"
          prop="orgAddress"
        ></el-table-column>
        <el-table-column
          label="运行状态"
          prop="runStatus"
          align="center"
        >
          <template slot-scope="{row}">
            <el-switch
              :value="row.runStatus"
              active-value="1"
              inactive-value="0"
              @change="(value) => changeOrgRunStatus(row.orgCode, value)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="联系人"
          prop="orgContactName"
          align="center"
        ></el-table-column>
        <el-table-column
          label="联系电话"
          prop="orgContactTel"
          align="center"
        ></el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          width="160"
          header-align="center"
          align="center"
        >
          <template slot-scope="{row}">
            <el-button type="text" @click="() => openPage(row, 'view')">查看</el-button>
            <template v-if="row.runStatus !== '1'">
              <el-button type="text"  @click="() => openPage(row, 'modify')">修改</el-button>
              <el-button type="text" @click="() => deleteOrg(row)">删除</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          layout="prev, pager, next, sizes, jumper"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          :page-sizes="[5, 10, 20, 50]"
          @current-change="changeCurrentPage"
          @size-change="changeSize"
        ></el-pagination>
      </div>
    </div>
    <el-button
      slot="footer-buttons"
      size="small"
      type="primary"
      @click="() => openPage({}, 'add')"
    >添加机构</el-button>
  </Page>
</template>

<script>
  import Page from '../../components/Page';
  import { mapState } from 'vuex';
  import {ADD_TAB, CHANGE_CURRENT_TAB_ID} from "../../store/mutations/types";
  export default {
    name: "OrgManage",
    data() {
      return {
        // 查询表单数据对象
        formValues: {},
        // 列表数据
        list: [],
        // 加载中
        loading: false,
        // 分页器-当前页码
        currentPage: 1,
        // 每页条数
        pageSize: 5,
        // 数据总数
        total: 0,
      }
    },
    computed: {
      ...mapState(['dicOptions'])
    },
    created() {
      this.$store.dispatch('getCommonDicOptions', ['runStatus', 'orgType']);
      this.queryList();
    },
    components: {
      Page
    },
    methods: {
      // 改变当前页码
      changeCurrentPage(curPage) {
        this.currentPage = curPage;
        this.queryList();
      },
      // 改变分页器每页条数
      changeSize(size) {
        this.pageSize = size;
        this.queryList();
      },
      /**
       * 查询列表
       * @param {Number} curPage 分页器当前页码
       */
      async queryList(curPage) {
        this.loading = true;
        try {
          const { rows, currentPage, pageSize, total } = await this.$ajax.request('orgList', {
            ...this.formValues,
            pageSize: this.pageSize,
            currentPage: curPage || this.currentPage
          });
          this.list = rows;
          this.currentPage = currentPage;
          this.pageSize = pageSize;
          this.total = total;
          this.loading = false;
        }
        catch(e) {
          console.error('获取机构列表发生错误：', e);
        }
      },

      // 重置查询表单
      resetForm() {
        this.formValues = {};
        this.currentPage = 1;
        this.queryList();
      },

      // 切换机构运行状态
      async changeOrgRunStatus(orgCode, value) {
        try {
          await this.$ajax.request('changeOrgRunStatus', { orgCode, runStatus: value });
          this.queryList();
        }
        catch(e) {
          console.error('切换机构运行状态出错', e);
        }
      },

      // 删除机构
      deleteOrg({orgCode}) {
        this.$confirm('您确定要删除这个机构吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.$ajax.request('deleteOrg', { orgCode })
          .then(() => {
            this.queryList();
          })
          .catch(e => {
            console.error('删除机构失败：', e);
          })
        })
      },

      // 点击修改和查看按钮，打开机构信息页面
      openPage({orgCode}, operate) {
        const link = `/chargeCenter/orgInfo/${operate}/${orgCode}`;
        const id = `${Date.now()}`;
        this.$router.push(link);
        this.$store.commit(ADD_TAB, {
          id,
          label: `${operate === 'view' ? '查看' : '修改'}机构信息`,
          link,
          multiply: false,
          name: id
        });
        this.$store.commit(CHANGE_CURRENT_TAB_ID, id);
      }
    }
  }
</script>

<style lang="scss">
@import "index.scss";
</style>