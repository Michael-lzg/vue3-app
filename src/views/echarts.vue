<template>
  <div class="mainPage">
    <div class="block">
      <div id="bar" :style="{width: '100%', height: '300px'}"></div>
    </div>
    <div class="block">
      <div id="pie" :style="{width: '100%', height: '300px'}"></div>
    </div>
     <div class="block">
      <div id="line" :style="{width: '100%', height: '300px'}"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    drawBar () {
      let myChart = echarts.init(document.getElementById('bar'))
      myChart.setOption({
        title: { text: '消费分布柱状图' },
        color: ['#3398DB'], // 此处可设置柱条全局颜色
        tooltip: {},
        xAxis: {
          data: ['饮食', '家居', '衣物', '娱乐', '运动', '教育', '其他']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [300, 150, 100, 450, 50, 150, 200]
        }]
      })
    },
    drawPie () {
      let myChart = echarts.init(document.getElementById('pie'))
      myChart.setOption({
        title: { text: '消费占比饼图' },
        color: ['#0E8FE8', '#FFB900', '#fad797', '#59ccf7', '#c3b4df', '#3398DB', '#F34848'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [{
          name: '销量',
          type: 'pie',
          data: [
            { value: 300, name: '饮食' },
            { value: 150, name: '家居' },
            { value: 100, name: '衣物' },
            { value: 450, name: '娱乐' },
            { value: 50, name: '运动' },
            { value: 150, name: '教育' },
            { value: 200, name: '其他' }
          ]
        }]
      })
    },
    drawLine () {
      let myChart = echarts.init(document.getElementById('line'))
      myChart.setOption({
        title: { text: '消费趋势图' },
        color: ['#3398DB'], // 此处可设置柱条全局颜色
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [82, 93, 90, 93, 122, 133, 154],
          type: 'line'
        }]
      })
    }
  },
  mounted () {
    this.drawBar()
    this.drawPie()
    this.drawLine()
  }
}
</script>
<style scoped lang="less">
.mainPage {
  height: 100%;
  background-color: #fff;
  overflow: auto;
  .block{
    padding:10px;
  }
}
</style>
