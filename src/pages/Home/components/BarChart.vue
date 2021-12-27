<template>
  <div class="chart" :id="id"></div>
</template>

<script>
  import * as echarts from 'echarts/core';
  import {BarChart} from 'echarts/charts';
  import {
    GridComponent,
    DatasetComponent,
    TooltipComponent,
    TransformComponent
  } from 'echarts/components';
  // 标签自动布局，全局过渡动画等特性
  import { LabelLayout, UniversalTransition } from 'echarts/features';
  // 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
  import { CanvasRenderer } from 'echarts/renderers';
  // 注册必须的组件
  echarts.use([
    GridComponent,
    TooltipComponent,
    DatasetComponent,
    TransformComponent,
    BarChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer
  ]);
  export default {
    name: "BarChart",
    props: ['id', 'title', 'xLabel', 'data', 'yUnit'],
    mounted() {
      this.initChart();
    },
    watch: {
      data() {
        this.initChart();
      }
    },
    methods: {
      initChart() {
        const barChart = echarts.init(document.getElementById(this.id));
        const option = {
          tooltip: {
            show: true,
            trigger: 'item',
            borderWidth: 0
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: 30,
            containLabel: true
          },
          xAxis: {
            type: 'category',
            axisLine: {
              show: true,
              lineStyle: {
                color: '#ccc'
              }
            },
            axisLabel: {
              color: '#a9a9a9'
            },
            data: this.xLabel
          },
          yAxis: {
            type: 'value',
            axisLine: {
              show: true,
              lineStyle: {
                color: '#ccc'
              }
            },
            axisLabel: {
              color: '#a9a9a9',
              formatter: `{value}${this.yUnit || ''} `
            },
          },
          series: [
            {
              data: this.data,
              type: 'bar',
              name: this.title,
              showBackground: true,
              barWidth: 12,
              backgroundStyle: {
                color: '#eee'
              },
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#e85150'
                  },
                  {
                    offset: 1,
                    color: '#4b91ff'
                  }
                ]),
                borderRadius: [10, 10, 0, 0]
              },
              emphasis: {
                focus: true
              }
            }
          ]
        };
        barChart.setOption(option);
        window.addEventListener('resize', function () {
          barChart.resize()
        })
      }
    }
  }
</script>

<style scoped>
  .chart {
    width: 100%;
    height: 100%;
  }
</style>