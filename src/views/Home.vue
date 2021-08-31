<template>
  <div id="Home">
    <div class="banner">
      <img src="../assets/images/home/img_home_banner.jpg" alt="">
    </div>
    <div class="menu clearfix" v-if="menu.length>0">
      <div class="menu-item fl" v-for="(item,index) in menu" :key="index" @click="toList(item.id,item.typeName)">
        <img :src="item.url" alt="">
        <div class="menu-name">{{item.typeName}}</div>
      </div>
    </div>

    <div class="list">
      <div class="title">推荐商家</div>
      <div class="line"></div>
      <div class="listItem" v-for="(item,index) in list" :key="index" @click="toDetail(item.id)">
        <img src="http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750" alt="" class="pic">
        <div class="name ellipsis">天河第一隆江猪脚饭</div>
        <Rate v-model="rateNum" color="#FA7022" :size="9" readonly allow-half></Rate>
        <span class="momey">￥30 /人</span>
        <div class="label clearfix">
          <span class="fl" v-for="(i,v) in 3" :key="v">美食</span>
          <div class="fr km">2.6km</div>
        </div>
        <div class="position ellipsis">广州天河区科韵路码农三号街</div>
        <div class="quan ellipsis">
          <img src="../assets/images/home/coupon.png" alt="" width="16">门店优惠折扣：汇享8折优惠，并免会员费
        </div>
      </div>
    </div>
    <!-- <div class="loadAll">没有更多数据</div> -->
    <footerBar></footerBar>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { Rate } from 'vant'
import footerBar from '../components/footerBar.vue'
export default {
  components: { Rate, footerBar },
  setup () {
    const router = useRouter()
    const state = reactive({
      rateNum: 3,
      list: [],
      currIndex: 1,
      menu: [
        { typeName: '美食餐饮', url: require('../assets/images/icon/icon1 (1).png') },
        { typeName: '电影演出', url: require('../assets/images/icon/icon1 (2).png') },
        { typeName: '酒店住宿', url: require('../assets/images/icon/icon1 (7).png') },
        { typeName: '周边旅游', url: require('../assets/images/icon/icon1 (4).png') },
        { typeName: '打车买票', url: require('../assets/images/icon/icon1 (6).png') },
        { typeName: '休闲娱乐', url: require('../assets/images/icon/icon1 (5).png') },
        { typeName: '美容美发', url: require('../assets/images/icon/icon1 (10).png') },
        { typeName: '亲子教育', url: require('../assets/images/icon/icon1 (8).png') },
        { typeName: '户外运动', url: require('../assets/images/icon/icon1 (3).png') },
        { typeName: '易果生鲜', url: require('../assets/images/icon/icon1 (9).png') }
      ]
    })
    onMounted(() => {
      getList()
      document.getElementById('Home').addEventListener('scroll', scrollTop)
    })

    const scrollTop = () => {
      const scrollHeight = document.getElementById('Home').scrollHeight
      const scrollTop = document.getElementById('Home').scrollTop
      const clientHeight = window.innerHeight || Math.min(document.documentElement.clientHeight, document.body.clientHeight)
      if (Math.ceil(clientHeight + scrollTop) >= scrollHeight && state.list.length < 30) {
        state.currIndex++
        getList()
      }
    }

    const toList = () => {
      router.push({
        path: '/list'
      })
    }

    const toDetail = () => {
      router.push({
        path: '/shopDetail'
      })
    }

    const getList = () => {
      console.log(state.currIndex)
      for (let i = 0; i < 10; i++) {
        state.list.push(i)
      }
    }

    return {
      ...toRefs(state),
      toList,
      toDetail,
      getList,
      scrollTop
    }
  }
}
</script>

<style lang="less" scoped>
#id {
  height: 100%;
  overflow: auto;
  padding-bottom: 55px;
}
.banner {
  position: relative;
  > img {
    width: 100%;
  }
}
.menu {
  padding: 5px 15px;
  border-radius: 13px 13px 0 0;
  transform: translateY(-13px);
  background-color: #fff;
  font-size: 12px;
  .menu-item {
    width: 20%;
    text-align: center;
    margin-top: 20px;
    > img {
      width: 33px;
      height: 30px;
      margin-bottom: 8px;
    }
  }
}
.list {
  padding: 0 15px;
  .title {
    font-size: 20px;
    padding-left: 12px;
    margin-top: 10px;
    z-index: 99;
  }
  .line {
    width: 91px;
    height: 6px;
    background: rgba(255, 198, 0, 1);
    border-radius: 3px;
    transform: translate(7px, -2px);
  }
  .listItem {
    padding: 20px 118px 9px 13px;
    box-shadow: 0px 0px 8px 0px rgba(11, 3, 6, 0.1);
    margin-top: 10px;
    border-radius: 8px;
    position: relative;
    .pic {
      position: absolute;
      right: 11px;
      top: 20px;
      width: 108px;
      height: 93px;
      border-radius: 8px;
    }
    .name {
      font-size: 18px;
      margin-bottom: 2px;
      color: #000;
    }
    .label {
      font-size: 12px;
      color: #666;
      margin-top: 8px;
      > span {
        padding-left: 4px;
        background-color: #fbf1e7;
      }
      .km {
        padding-right: 20px;
      }
    }
    .position {
      font-size: 12px;
      color: #d3751d;
      margin-top: 11px;
      margin-bottom: 17px;
    }
    .quan {
      padding: 10px 0;
      font-size: 12px;
      width: 300px;
      border-top: 1px solid #f0f0f0;
      > img {
        margin-right: 4px;
      }
    }
  }
}
.momey {
  font-size: 12px;
  padding-left: 10px;
}
.noData {
  margin-top: 20px;
  font-size: 14px;
  color: #ccc;
  text-align: center;
}
.loadAll {
  font-size: 12px;
  color: #ccc;
  text-align: center;
  padding: 10px 0;
}
</style>
