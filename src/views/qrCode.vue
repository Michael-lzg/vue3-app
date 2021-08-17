<template>
  <div class="mainPage">
    <div class="top">
      <img src="../assets/images/home/zhifubao.png" alt="" width="30">我的支付宝
    </div>
    <div id="qrcode"></div>
    <div class="bot">请扫描以上付款码</div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  methods: {
    qrCode (url) {
      let qrcode = new QRCode('qrcode', {
        text: 'https:baidu.com',
        width: 200, // 图像宽度
        height: 200, // 图像高度
        colorDark: '#000000', // 前景色
        colorLight: '#ffffff', // 背景色
        typeNumber: 4,
        correctLevel: QRCode.CorrectLevel.H // 容错级别 容错级别有：（1）QRCode.CorrectLevel.L （2）QRCode.CorrectLevel.M （3）QRCode.CorrectLevel.Q （4）QRCode.CorrectLevel.H
      })
      console.log(qrcode)
    }
  },
  mounted () {
    this.qrCode()
  }
}
</script>

<style lang="less" scoped>
.mainPage {
  padding-top: 50px;
}
.top {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  vertical-align: middle;
  margin-bottom: 80px;
  > img {
    margin-right: 10px;
  }
}
.bot{
  text-align: center;
  font-size: 16px;
  color: #ccc;
  margin-top: 30px;
}
#qrcode {
  width: 200px;
  height: 200px;
  margin: 0 auto;
}

</style>
