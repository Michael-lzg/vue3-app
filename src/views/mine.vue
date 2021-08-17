<template>
  <div class="mainPage">
    <div class="topBar">
      <img :src="url" alt="" width="50" height="50">
      <input type="file" id="upload" accept="image/*" @change="getUpload" />
      <div class="info">
        <div class="name">{{name}}</div>
        <div class="tel">{{tel}}</div>
      </div>
    </div>
    <div class="tab clearfix">
      <div class="item fl">
        <div class="top cr">88.00</div>
        <div class="bot">我的余额</div>
      </div>
      <div class="item fl">
        <div class="top c2">2</div>
        <div class="bot">我的优惠</div>
      </div>
      <div class="item fl bn">
        <div class="top c1">132</div>
        <div class="bot">我的积分</div>
      </div>
    </div>
    <div class="list">
      <div class="item b-border" v-for="(item,index) in list" :key="index" @click="toUrl(item)">
        <img :src="item.icon" alt="" width="20">
        <span>{{item.name}}</span>
      </div>
    </div>
    <footerBar></footerBar>
  </div>
</template>

<script>
import footerBar from '../components/footerBar'
import EXIF from 'exif-js'
export default {
  components: { footerBar },
  data () {
    return {
      url: require('../assets/images/lzg.jpg'),
      list: [
        { name: '我的订单', url: 'orderList', icon: require('../assets/images/home/dingdan.png') },
        { name: '消费统计', url: '/echarts', icon: require('../assets/images/home/xiaofeijil.png') },
        { name: '公交地图', url: '/map', icon: require('../assets/images/home/gjiao.png') },
        { name: '我的支付宝', url: 'qrCode', icon: require('../assets/images/home/zhifubao.png') }
      ],
      tel: sessionStorage.getItem('tel'),
      name: sessionStorage.getItem('name')
    }
  },
  comments: { EXIF },
  methods: {
    toUrl (item) {
      this.$router.push({
        path: item.url
      })
    },
    getUpload () {
      let vm = this
      let dom = document.getElementById('upload')
      let file = dom.files[0]
      let orientation
      // 判断是否是图片类型
      if (!/image\/\w+/.test(file.type)) {
        this.$toast('只能选择图片')
        return false
      }
      if (file.size / 1024 > 10240) {
        this.$toast('文件大小不得超过10M')
        dom.value = ''
        return false
      }
      EXIF.getData(file, function () {
        orientation = EXIF.getTag(this, 'Orientation')
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function (e) {
          vm.util.getImgData(this.result, orientation, function (data) {
            vm.util.dealImage(data, { width: 0 }, function (res) {
              vm.url = res
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.mainPage {
  height: 100%;
  background-color: #f6f6f6;
  padding-bottom: 55px;
}
.topBar {
  height: 100px;
  padding: 20px 15px;
  background-color: rgb(49, 144, 232);
  position: relative;
  color: white;
  padding-left: 85px;
  > img {
    border-radius: 50%;
    background-color: #fff;
    position: absolute;
    left: 15px;
    top: 20px;
    width: 60px;
    height: 60px;
  }
  #upload {
    border-radius: 50%;
    background-color: #fff;
    position: absolute;
    left: 15px;
    top: 20px;
    width: 60px;
    height: 60px;
    opacity: 0
  }
  .info {
    .name {
      font-size: 20px;
      line-height: 30px;
    }
    .tel {
      font-size: 14px;
      margin-top: 5px;
    }
  }
}
.tab {
  margin-top: 10px;
  padding: 15px;
  background-color: #fff;
  .bn {
    border-right: none !important;
  }
  .item {
    width: 33.33%;
    text-align: center;
    border-right: 1px solid #e9e9e9;
    .top {
      font-size: 24px;
      font-weight: bold;
    }
  }
}
.list {
  margin-top: 10px;
  padding: 0 15px;
  background-color: #fff;
  .item {
    height: 45px;
    line-height: 45px;
    > img {
      margin-right: 5px;
    }
  }
}
.cr {
  color: red;
}
.c2 {
  color: #d3751d;
}
.c3 {
  color: green;
}
</style>
