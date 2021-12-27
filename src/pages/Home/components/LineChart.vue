<template>
  <div class="chart" :id="id"></div>
</template>

<script>
  import * as echarts from 'echarts/core';
  import {LineChart} from 'echarts/charts';
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
    LineChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer
  ]);

  export default {
    name: "LineChart",
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
        const lineChart = echarts.init(document.getElementById(this.id));
        const option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'line',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: 30,
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: true,
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
            }
          ],
          yAxis: [
            {
              type: 'value',
              formatter: `{value}${this.yUnit || ''}`,
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#ccc'
                }
              },
              axisLabel: {
                color: '#a9a9a9'
              }
            }
          ],
          series: [
            {
              name: this.title,
              type: 'line',
              smooth: true,
              symbol: 'circle',
              symbolSize: 6,
              label: {
                show: true,
                position: 'top',
                color: '#666'
              },
              lineStyle: {
                width: 2,
                color: '#57acff'
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(145, 207, 254, 1)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(247, 251, 255, 1)'
                  }
                ])
              },
              emphasis: {
                focus: 'series'
              },
              data: this.data
            }
          ]
        };
        lineChart.setOption(option);
        window.addEventListener('resize', function () {
          lineChart.resize()
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