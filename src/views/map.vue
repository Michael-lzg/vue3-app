<template>
  <div>
    <div id="container" style="width:375px; height:667px"></div>
  </div>
</template>

<script>
import AMap from 'AMap' // 引入高德地图
export default {
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let map = new AMap.Map('container', {
        center: [113.402259, 23.163992],
        resizeEnable: true,
        zoom: 16
      })
      // 点标记
      var marker = new AMap.Marker({
        position: [113.402259, 23.163992], // 位置
        label: {
          content: '我的位置',
          offset: new AMap.Pixel(20, 20)
        }
      })
      map.add(marker)// 添加到地图
      // map.remove(marker) // 删除标记
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 375px;
  height: 100%;
}
</style>
