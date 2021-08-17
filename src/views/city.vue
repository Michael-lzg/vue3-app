<template>
  <div class="mainPage location-view">
    <div class="search-div">
      <div class="clearfix static" v-if="!isFocus" @click="isFocus = true">
        <i class="fl"></i>
        <span class="fl">城市名</span>
      </div>
      <div class="clearfix able-input" v-if="isFocus">
        <div class="clearfix fl input-div">
          <i class="fl"></i>
          <input class="fl" v-model="key" placeholder="城市名" />
          <i class="fl del-icon" v-if="key" @click="delKeyWord"></i>
        </div>
        <div class="fl tr cancel-search" @click="isFocus = false">取消</div>
      </div>
    </div>
    <div class="show-content" v-if="!isFocus">
      <div class="clearfix curr-switch">
        <span class="fl">当前城市：{{selectCity}}</span>
        <!-- <div class="clearfix fr" @click="choseArea">
          <span class="fl">切换区县</span>
          <i class="fl" :class="showCurrArea ? 'up' : ''"></i>
        </div> -->
      </div>
      <div class="switch-content" v-if="showCurrArea">
        <!-- <ul class="clearfix">
          <li class="fl tc" v-for="(item,index) in quList" :key="index" @click="select(2,item.name)">{{item.name}}</li>
        </ul> -->
      </div>
      <div class="city-list" ref="list">
        <van-index-bar>
          <van-index-anchor index="定位" />
          <van-cell :title="gdCity" @click.native="select(1,gdCity)" class="gdCity" />
          <div v-for="(item,index) in cityList" :key="index">
            <van-index-anchor :index="item.code" />
            <van-cell :title="v" v-for="(v,i) in item.cityList" :key="i" @click.native="select(1,v)" />
          </div>

        </van-index-bar>
      </div>
    </div>
    <div class="search-list" v-if="isFocus">
      <ul>
        <li class="b-border" v-for="(item,index) in searchList" :key="index" @click="select(1,item)">{{item}}</li>
      </ul>
      <!-- <div class="nodata" v-if="noData">
        <img src="../../assets/img/search.png" alt="" width="100">
        <div>找不到相应的城市</div>
      </div> -->
    </div>
  </div>
</template>

<script>
import AMap from 'AMap' // 引入高德地图
import { citys } from '../JS/city'
import Vue from 'vue'
import { IndexBar, IndexAnchor, Cell, CellGroup } from 'vant'
Vue.use(IndexBar).use(IndexAnchor).use(Cell).use(CellGroup)
export default {
  data () {
    return {
      isFocus: false,
      showCurrArea: false,
      key: '',
      gdCity: '',
      selectCity: '',
      cityList: [],
      quList: [],
      searchList: [],
      noData: false
    }
  },
  watch: {
    key () {
      this.search()
    }
  },
  methods: {
    select (key, item) {
      if (key === 1) {
        sessionStorage.setItem('city', item)
        sessionStorage.removeItem('district')
      } else {
        sessionStorage.setItem('district', item)
      }
      this.$router.go(-1)
    },
    choseArea () {
      this.showCurrArea = !this.showCurrArea
      this.resize()
    },
    delKeyWord () {
      this.key = ''
    },
    getPosition () {
      let vm = this
      AMap.plugin('AMap.CitySearch', function () {
        let citySearch = new AMap.CitySearch()
        citySearch.getLocalCity(function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            vm.gdCity = vm.util.formatCity(result.city)
          } else {
            vm.toast({ msg: '获取城市定位失败' })
          }
        })
      })
    },
    search () {
      this.searchList = []
      if (!this.key) {
        this.noData = false
        return
      }
      for (let j in this.cityList) {
        for (let k in this.cityList[j].cityList) {
          if (this.cityList[j].cityList[k].indexOf(this.key) > -1) {
            this.searchList.push(this.cityList[j].cityList[k])
          }
        }
      }
      if (this.searchList.length === 0) {
        this.noData = true
      } else {
        this.noData = false
      }
    }
  },
  mounted () {
    this.selectCity = this.$route.query.city
    this.cityList = citys
    this.getPosition()
  }
}
</script>

<style lang="less" scoped>
.mainPage {
  background-color: #fff;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 48px;
  .search-div {
    padding-top: 7px;
    width: 375px;
    height: 48px;
    background: rgba(248, 248, 248, 1);
    box-sizing: border-box;
    position: fixed;
    top: 0;
    i,
    span {
      display: block;
    }
    .static {
      margin: 0 auto;
      padding-left: 140px;
      width: 343px;
      height: 35px;
      background: rgba(0, 0, 0, 0.05);
      border-radius: 2px;
      box-sizing: border-box;
      i {
        margin: 9px 6px 0 0;
        width: 14px;
        height: 14px;
        background: url('../assets/images/ic-tabbar.png') no-repeat;
        background-size: 100% 100%;
      }
      span {
        font-size: 14px;
        color: rgba(156, 156, 157, 1);
        line-height: 36px;
      }
    }
    .able-input {
      margin: 0 auto;
      width: 343px;
      height: 35px;
      box-sizing: border-box;
      .input-div {
        padding: 0 10px;
        width: 85%;
        height: 100%;
        line-height: 35px;
        background: rgba(0, 0, 0, 0.05);
        border-radius: 2px;
        box-sizing: border-box;
        i {
          margin: 12px 6px 0 0;
          width: 10px;
          height: 10px;
          background: url('../assets/images/ic-tabbar.png') no-repeat;
          background-size: 100% 100%;
          &.del-icon {
            margin-right: 0;
            width: 12px;
            height: 12px;
            background: url('../assets/images/del.png') no-repeat;
            background-size: 100% 100%;
          }
        }
        input {
          width: 240px;
          font-size: 14px;
          color: #333;
          background: transparent;
        }
      }
      .cancel-search {
        width: 50px;
        font-size: 14px;
        color: rgba(156, 156, 157, 1);
        line-height: 35px;
      }
    }
  }
  .show-content {
    height: 100%;
    height: calc(100% - 48px);
    .curr-switch {
      padding: 12px 15px 0 15px;
      span,
      i {
        display: block;
      }
      span {
        font-size: 14px;
        color: rgba(102, 102, 102, 1);
        line-height: 20px;
      }
      i {
        margin: 3px 0 0 4px;
        width: 13px;
        height: 13px;
        background: url('../assets/images/ic-down.png') no-repeat;
        background-size: 100% 100%;
        &.up {
          background: url('../assets/images/ic-up.png') no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .switch-content {
      margin-top: 12px;
      li {
        margin: 0 10px 10px 0;
        width: 105px;
        font-size: 14px;
        color: rgba(102, 102, 102, 1);
        line-height: 30px;
        border: 1px solid #eee;
        border-radius: 4px;
      }
    }
    .city-list {
      margin-top: 12px;
      height: calc(100% - 70px);
    }
  }
  .search-list {
    padding: 0 0 0 15px;
    // height: calc(100% - 48px);
    height: 100%;
    overflow-y: auto !important;
    -webkit-overflow-scrolling: touch !important;
    li {
      font-size: 14px;
      color: #333;
      line-height: 40px;
    }
  }
}
.nodata {
  margin-top: 20px;
  text-align: center;
  color: #ccc;
  font-size: 14px;
}
</style>
<style lang="less">
.location-view {
  .gdCity .van-cell__title {
    > span {
      width: 104px;
      height: 40px;
      display: inline-block;
      background: rgba(248, 248, 248, 1);
      border-radius: 2px;
      text-align: center;
      line-height: 40px;
    }
  }
  .van-index-bar__index{
    padding: 2px 15px !important;
  }
}
//   .van-cell {
//     &:nth-of-type(1) {
//       .van-cell__title {
//         padding: 12px 0 !important;
//         font-size: 16px;
//         color: rgba(51, 51, 51, 1);
//         line-height: 22px;
//       }
//       > span {
//         width: 104px;
//         height: 40px;
//         background: rgba(248, 248, 248, 1);
//         border-radius: 2px;
//         .mint-cell-wrapper {
//           padding: 0 0 0 27px !important;
//           font-size: 14px;
//           background-image: none !important;
//           .mint-cell-text {
//             display: inline-block;
//             line-height: 40px;
//           }
//         }
//       }
//       .mint-cell-title {
//         &:before {
//           content: '';
//           display: inline-block;
//           vertical-align: middle;
//           margin-right: 2px;
//           height: 14px;
//           width: 14px;
//           // background: url('../../assets/img/ic-location@2x.png') no-repeat;
//           background-size: 100% 100%;
//         }
//       }
//     }
//     .mint-indexsection-index {
//       padding: 12px 0 0 !important;
//       font-size: 14px;
//       color: rgba(153, 153, 153, 1);
//       line-height: 16px;
//       background-color: #fff !important;
//     }
//     .mint-cell-wrapper {
//       padding: 0 !important;
//       font-size: 16px;
//       color: #333;
//       background-position: bottom left;
//       .mint-cell-text {
//         display: block;
//         line-height: 50px;
//       }
//     }
//     .mint-cell {
//       &:last-child {
//         background-image: none !important;
//       }
//     }
//   }
//   .mint-indexlist {
//     height: 100% !important;
//     overflow-y: auto !important;
//     -webkit-overflow-scrolling: touch !important;
//   }
//   .mint-indexlist-content {
//     margin-right: 0 !important;
//     height: 100% !important;
//     overflow-y: auto !important;
//     -webkit-overflow-scrolling: touch !important;
//   }
//   .mint-indexlist-nav {
//     right: 15px;
//     border-left: 0 !important;
//     background-color: transparent;
//   }
//   .mint-indexlist-navitem {
//     padding: 0 !important;
//     margin-bottom: 3px;
//     width: 13px;
//     font-size: 12px;
//     color: #327df5;
//     line-height: 14px;
//     &:nth-of-type(1) {
//       margin-bottom: 15px;
//     }
//   }
// }
</style>
