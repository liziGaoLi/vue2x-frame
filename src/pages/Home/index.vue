<template>
  <div class="Home page">
    <el-row
      :gutter="16"
    >
      <!--左侧-->
      <el-col :md="8">
        <div class="col-item simple-item">
          数据授权总人数
          <span>{{totalEmpower}}</span>
        </div>
        <div class="col-item">
          <Title>
            近七日数据授予情况
            <span slot="right">单位：人</span>
          </Title>
          <div class="sub-title">
            近7日数据授权总次数：<span class="emphasis">{{sevenDayDataEmpower.total}}</span>
          </div>
          <div class="con">
            <div class="chart-box">
              <LineChart
                id="lineChart1"
                title="授权次数"
                :xLabel="sevenDayDataEmpower.xLabel"
                :data="sevenDayDataEmpower.data"
              />
            </div>
          </div>
        </div>
        <div class="col-item">
          <Title>
            当年每月数据授权情况
            <span slot="right">单位：万人</span>
          </Title>
          <div class="con">
            <div class="chart-box bar">
              <BarChart
                id="bar1"
                title="授权"
                :xLabel="thisYearDataEmpower.xLabel"
                :data="thisYearDataEmpower.data"
                yUnit="万人"
              />
            </div>
          </div>
        </div>
      </el-col>
      <!--中间-->
      <el-col :md="8">
        <div class="col-item">
          <Title>今日数据授权及使用情况</Title>
          <div class="con">
            <el-row>
              <el-col :span="12" class="total-data">
                <span>{{todayEmpower}}</span>
                今日数据授权人数
              </el-col>
              <el-col :span="12" class="total-data">
                <span>{{todayUse}}</span>
                今日数据使用人数
              </el-col>
            </el-row>
          </div>
          <Title>数据授权人员</Title>
          <div class="con">
            <TableScroll
              rowKey="idCard"
              :data="dataEmpowerPersonnel"
              :column="[
                {label: '姓名', dataIndex: 'name', span: 6},
                {label: '身份证号', dataIndex: 'idCard', span: 12},
                {label: '时间', dataIndex: 'usageTime', span: 6}
              ]"
            ></TableScroll>
          </div>
          <Title>数据使用人员</Title>
          <div class="con">
            <TableScroll
              rowKey="idCard"
              :data="dataUsePersonnel"
              :column="[
                {label: '姓名', dataIndex: 'name', span: 6},
                {label: '使用单位', dataIndex: 'company', span: 12},
                {label: '时间', dataIndex: 'usageTime', span: 6}
              ]"
            ></TableScroll>
          </div>
        </div>
      </el-col>
      <!--右侧-->
      <el-col :md="8">
        <div class="col-item simple-item">
          数据使用总人数
          <span>{{totalUse}}</span>
        </div>
        <div class="col-item">
          <Title>
            近七日数据使用情况
            <span slot="right">单位：人</span>
          </Title>
          <div class="sub-title">
            近7日数据授权总次数：<span class="emphasis">{{sevenDayDataUse.total}}</span>
          </div>
          <div class="con">
            <div class="chart-box">
              <LineChart
                id="lineChart2"
                title="使用次数"
                :xLabel="sevenDayDataUse.xLabel"
                :data="sevenDayDataUse.data"
              />
            </div>
          </div>
        </div>
        <div class="col-item">
          <Title>
            当年每月数据使用情况
            <span slot="right">单位：万人</span>
          </Title>
          <div class="con">
            <div class="chart-box bar">
              <BarChart
                id="bar2"
                title="使用次数"
                :xLabel="thisYearDataUse.xLabel"
                :data="thisYearDataUse.data"
                yUnit="万人"
              />
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Title from './components/Title.vue';
  import LineChart from './components/LineChart.vue';
  import BarChart from './components/BarChart.vue';
  import TableScroll from "./components/Table";
  import { mapState } from 'vuex';
  export default {
    name: "Home",
    data() {
      return {
        // 数据授权总数
        totalEmpower: 0,
        // 数据使用总数
        totalUse: 0,
        // 当天数据授权数目
        todayEmpower: 0,
        // 当天数据使用数目
        todayUse: 0,
        // 近七天数据授权数据
        sevenDayDataEmpower: {
          total: 0,
          xLabel: [],
          data: []
        },
        // 近七天数据使用数据
        sevenDayDataUse: {
          total: 0,
          xLabel: [],
          data: []
        },
        // 当年数据授权情况
        thisYearDataEmpower: {
          xLabel: [],
          data: []
        },
        // 当年数据使用情况
        thisYearDataUse: {
          xLabel: [],
          data: []
        },
        // 当日数据授权人员
        dataEmpowerPersonnel: [],
        // 当日数据使用人员
        dataUsePersonnel: []
      }
    },
    computed: {
      ...mapState(['user'])
    },
    components: {
      Title,
      LineChart,
      BarChart,
      TableScroll
    },
    mounted() {
      this.getTotalData();
      this.getTodayData();
      this.getSevenDayDataEmpower();
      this.getSevenDayDataUse();
      this.getThisYearDataUse();
      this.getThisYearDataEmpower();
      this.getTodayEmpowerPersonnel();
      this.getTodayUsePersonnel();
    },
    methods: {
      // 获取总体数据总览、使用情况
      async getTotalData() {
        try {
          const { sqzs: totalEmpower, syzs: totalUse } = await this.$ajax.request('totalData', { orgCode: this.user.orgCode });
          this.totalEmpower = totalEmpower;
          this.totalUse = totalUse;
        }
        catch (e) {
          console.error('获取总体数据总览、使用情况出错：', e);
        }
      },
      // 获取今日数据总览、数据使用情况
      async getTodayData() {
        try {
          const { sqjr: todayEmpower, syjr: todayUse } = await this.$ajax.request('todayData', { orgCode: this.user.orgCode });
          this.todayEmpower = todayEmpower;
          this.todayUse = todayUse;
        }
        catch (e) {
          console.error('获取当日数据总览、使用情况出错：', e);
        }
      },
      // 近七日数据授权情况
      async getSevenDayDataEmpower() {
        try {
          const { chart, total } = await this.$ajax.request('sevenDayDataEmpower', { orgCode: this.user.orgCode });
          const xLabel = [];
          const data = [];
          chart.forEach(item => {
            xLabel.push(new Date(item.date).getDate() + '日');
            data.push(item.value);
          });
          this.sevenDayDataEmpower = {
            total,
            xLabel,
            data
          };
        }
        catch (e) {
          console.error('获取近七日数据授权出错：', e);
        }
      },
      // 近七日数据使用情况
      async getSevenDayDataUse() {
        try {
          const { chart, total } = await this.$ajax.request('sevenDayDataUse', { orgCode: this.user.orgCode });
          const xLabel = [];
          const data = [];
          chart.forEach(item => {
            xLabel.push(new Date(item.date).getDate() + '日');
            data.push(item.value);
          });
          this.sevenDayDataUse = {
            total,
            xLabel,
            data
          }
        }
        catch (e) {
          console.error('获取近七日数据使用出错：', e);
        }
      },
      // 当年数据授权情况
      async getThisYearDataEmpower() {
        try {
          const res = await this.$ajax.request('thisYearDataEmpower', { orgCode: this.user.orgCode });
          const xLabel = [];
          const data = [];
          res.forEach(item => {
            xLabel.push(`${item.month}月`);
            data.push(item.value);
          });
          this.thisYearDataEmpower = {
            xLabel,
            data
          };
        }
        catch (e) {
          console.error('获取当年数据使用情况出错：', e);
        }
      },
      // 当年数据使用情况
      async getThisYearDataUse() {
        try {
          const res = await this.$ajax.request('thisYearDataUse', { orgCode: this.user.orgCode });
          const xLabel = [];
          const data = [];
          res.forEach(item => {
            xLabel.push(`${item.month}月`);
            data.push(item.value);
          });
          this.thisYearDataUse = {
            xLabel,
            data
          };
        }
        catch (e) {
          console.error('获取当年数据使用情况出错：', e);
        }
      },
      // 当日数据授权人员
      async getTodayEmpowerPersonnel(wait) {
        try {
          if (this.empowerTimer) clearTimeout(this.empowerTimer);
          this.empowerTimer = setTimeout(async () => {
            this.dataEmpowerPersonnel = await this.$ajax.request('dataEmpowerPersonnel', { orgCode: this.user.orgCode });
            await this.getTodayEmpowerPersonnel(60 * 1000);
          }, wait || 0);
        }
        catch (e) {
          console.error('获取当日数据授权人员出错：', e);
        }
      },
      // 当日数据使用人员
      async getTodayUsePersonnel(wait) {
        try {
          if (this.useTimer) clearTimeout(this.useTimer);
          this.useTimer = setTimeout(async () => {
            this.dataUsePersonnel = await this.$ajax.request('dataUsePersonnel', { orgCode: this.user.orgCode });
            await this.getTodayUsePersonnel(60 * 1000);
          }, wait || 0);
        }
        catch (e) {
          console.error('获取当日数据使用人员出错：', e);
        }
      }
    }
  }
</script>

<style scoped lang="scss">
@import "index.scss";
</style>