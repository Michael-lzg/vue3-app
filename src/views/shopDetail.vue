<template>
  <div class="mainPage">
    <div class="info">
      <div class="name">天河第一隆江猪脚饭</div>
      <div class="detail">
        <rate v-model="rateNum" color="#FA7022" :size="9" readonly allow-half></rate>
        <span class="momey">￥20 /人</span>
        <span class="lableList">
          <span class="label" v-for="(i,v) in 3" :key="v">美食</span>
        </span>
      </div>
      <div class="quan">
        <img src="../assets/images/home/coupon.png" alt="" width="16">门店优惠折扣：汇享8折优惠，并免会员费
      </div>
      <div class="imgList">
        <div class="img">
          <img :src="item" alt="" class="pic" v-for="(item,index) in imgList" :key="index" @click="showImg(index)">
        </div>
      </div>
      <div class="time">
        <img src="../assets/images/home/store.png" alt="" width="16">
        <span>周一到周五</span>
        <span>9:00~20:00</span>
      </div>
      <div class="position clearfix">
        <img class="fl" src="../assets/images/home/map.png" alt="" width="18">
        <div class="fl word" @click="toMap">广州天河区科韵路码农三号街</div>
        <img class="fr" src="../assets/images/home/phone.png" alt="" width="20" @click="toCall">
      </div>
    </div>
    <!-- <div class="detailIfno" v-html="info.content"></div> -->
    <div class="container">
      <div class="left fl">
        <div class="item" :class="{'active':activeIndex===index}" v-for="(item,index) in list" :key="index" @click="changeIndex(index)">{{item.name}}</div>
      </div>
      <div class="right fr">
        <div class="item" v-for="(item,index) in list" :key="index">
          <div class="title" :id="'a'+index">{{item.name}}</div>
          <div class="list">
            <div class="list-item" v-for="(v, i) in item.foods" :key="i">
              <img :src="v.image" alt="" width="50" height="50">
              <div class="info">
                <div class="top">{{v.name}}</div>
                <div class="mid">月销售量{{v.sellCount}},价格{{v.price}}</div>
                <rate :value="v.rating/10" color="#FA7022" :size="9" readonly allow-half></rate>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from 'vue'
import { Rate, ImagePreview } from 'vant'
import { data } from '../js/shopData'

export default {
  components: { Rate },
  setup () {
    const state = reactive({
      info: {},
      rateNum: 3,
      dataOK: false,
      imgList: [
        'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750',
        'http://fuss10.elemecdn.com/f/28/a51e7b18751bcdf871648a23fd3b4jpeg.jpeg?imageView2/1/w/750/h/750',
        'http://fuss10.elemecdn.com/d/b9/bcab0e8ad97758e65ae5a62b2664ejpeg.jpeg?imageView2/1/w/750/h/750',
        'http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/750/h/750'
      ],
      list: [],
      activeIndex: 0,
      isScroll: false
    })

    onMounted(() => {
      state.list = data.data
      document.querySelector('.right').addEventListener('scroll',
        throttle(() => {
          // 防止手动选择的时候误操作
          if (state.isScroll) {
            return
          }
          state.list.map((item, index) => {
            const rectTop = document.querySelector('#a' + index).getBoundingClientRect().top
            const containerTop = document.querySelector('.right').getBoundingClientRect().top
            if (rectTop - containerTop < 50 && rectTop - containerTop > -50) {
              state.activeIndex = index
            }
          })
        }, 50)
      )
    })

    const toCall = (item) => {
      const url = item.fixedPhone || item.userPhone
      window.location.href = 'tel:' + url
    }

    const showImg = (index) => {
      ImagePreview({
        images: state.imgList,
        startPosition: index,
        onClose () {
          // do something
        }
      })
    }

    const changeIndex = (index) => {
      state.activeIndex = index
      animateScroll('#a' + index, '.right', 30)
    }

    // 平滑滚动方法
    const animateScroll = (element, container, speed) => {
      console.log(element)
      state.isScroll = true
      const rect =
        document.querySelector(element).getBoundingClientRect().top -
        document.querySelector(container).getBoundingClientRect().top
      // 获取元素相对窗口的top值，此处应加上窗口本身的偏移
      const top = rect + document.querySelector(container).scrollTop
      let currentTop = 0
      let requestId
      // 采用requestAnimationFrame，平滑动画
      const step = timestamp => {
        if (currentTop <= top) {
          document.querySelector(container).scrollTo(0, currentTop)
          requestId = window.requestAnimationFrame(step)
        } else {
          window.cancelAnimationFrame(requestId)
          state.isScroll = false
        }
        currentTop += speed
      }
      window.requestAnimationFrame(step)
    }
    // 函数防抖
    const throttle = (method, delay) => {
      var timer = null
      return function () {
        clearTimeout(timer)
        timer = setTimeout(() => {
          method.apply(this, arguments)
        }, delay)
      }
    }

    return {
      ...toRefs(state),
      toCall,
      showImg,
      changeIndex,
      animateScroll,
      throttle
    }
  }

  // methods: {
  //   toCall (item) {
  //     let url = item.fixedPhone || item.userPhone
  //     window.location.href = 'tel:' + url
  //   },
  //   showImg (index) {
  //     ImagePreview({
  //       images: this.imgList,
  //       startPosition: index,
  //       onClose () {
  //         // do something
  //       }
  //     })
  //   },
  //   toMap () {
  //     let marker = new AMap.Marker({
  //       position: [23.1669653772, 113.4013856456]
  //     })
  //     marker.markOnAMAP({
  //       position: marker.getPosition(),
  //       name: '隆江猪脚饭' // name属性在移动端有效
  //     })
  //   },
  //   changeIndex (index) {
  //     this.activeIndex = index
  //     this.animateScroll('#a' + index, '.right', 30)
  //   },
  //   // 平滑滚动方法
  //   animateScroll (element, container, speed) {
  //     console.log(element)
  //     this.isScroll = true
  //     let rect =
  //       document.querySelector(element).getBoundingClientRect().top -
  //       document.querySelector(container).getBoundingClientRect().top
  //     // 获取元素相对窗口的top值，此处应加上窗口本身的偏移
  //     let top = rect + document.querySelector(container).scrollTop
  //     let currentTop = 0
  //     let requestId
  //     // 采用requestAnimationFrame，平滑动画
  //     const step = timestamp => {
  //       if (currentTop <= top) {
  //         document.querySelector(container).scrollTo(0, currentTop)
  //         requestId = window.requestAnimationFrame(step)
  //       } else {
  //         window.cancelAnimationFrame(requestId)
  //         this.isScroll = false
  //       }
  //       currentTop += speed
  //     }
  //     window.requestAnimationFrame(step)
  //   },
  //   // 函数防抖
  //   throttle (method, delay) {
  //     var timer = null
  //     return function () {
  //       clearTimeout(timer)
  //       timer = setTimeout(() => {
  //         method.apply(this, arguments)
  //       }, delay)
  //     }
  //   }
  // },
  // mounted () {
  //   this.list = data.data
  //   document.querySelector('.right').addEventListener('scroll',
  //     this.throttle(() => {
  //       // 防止手动选择的时候误操作
  //       if (this.isScroll) {
  //         return
  //       }
  //       this.list.map((item, index) => {
  //         const rectTop = document.querySelector('#a' + index).getBoundingClientRect().top
  //         const containerTop = document.querySelector('.right').getBoundingClientRect().top
  //         if (rectTop - containerTop < 50 && rectTop - containerTop > -50) {
  //           this.activeIndex = index
  //         }
  //       })
  //     }, 50)
  //   )
  // }
}
</script>

<style lang="less" scoped>
.mainPage {
  width: 100%;
  padding: 10px 15px;
  box-sizing: border-box;
  overflow: auto;
}
.name {
  font-size: 23px;
  font-family: PingFang SC;
  font-weight: 800;
  color: rgba(0, 0, 0, 1);
  margin-bottom: 5px;
}
.detail {
  font-size: 12px;
  .momey {
    padding-left: 8px;
  }
  .lableList {
    padding-left: 8px;
  }
  .label {
    color: #666666;
    padding-right: 4px;
  }
}
.imgList {
  width: 360px;
  .img {
    white-space: nowrap;
    overflow-x: auto;
    display: inline-block;
    width: 100%;
  }
  .pic {
    width: 127px;
    height: 101px;
    border-radius: 8px;
    margin-right: 7px;
    display: inline-block;
  }
}
.time {
  padding: 5px 0;
  vertical-align: middle;
  font-size: 15px;
  > span {
    margin-left: 6px;
  }
  > img {
    margin-top: -2px;
  }
}
.position {
  vertical-align: middle;
  padding: 5px 0;
  border-top: 1px solid #f6f6f6;
  .word {
    width: 290px;
  }
  > img {
    margin-right: 6px;
    // margin-top: 2px;
    transform: translateY(2px);
    font-size: 15px;
  }
}
.quan {
  padding: 5px 0;
  font-size: 12px;
  width: 345px;
  // border-top: 1px solid #f0f0f0;
  > img {
    margin-right: 4px;
  }
}
.container {
  height: calc(100% - 270px) !important;
  // height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  margin-top: 10px;
  .left {
    width: 80px;
    height: 100%;
    background-color: #fff;
    border-right: 1px solid #eee;
    font-size: 14px;
    .item {
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
    .active {
      color: red !important;
    }
  }
  .right {
    width: 249px;
    height: 100%;
    background-color: #fff;
    overflow: auto;
    padding-left: 5px;
    .title {
      font-size: 20px;
      line-height: 40px;
      color: red;
    }
    .list-item {
      height: 65px;
      padding-left: 60px;
      position: relative;
      > img {
        position: absolute;
        top: 3px;
        left: 0;
      }
      .mid {
        font-size: 12px;
      }
    }
  }
}
</style>
<style lang="less">
.detailIfno {
  margin-top: 10px;
  img {
    width: 100%;
  }
  p {
    word-break: break-all;
  }
}
</style>
