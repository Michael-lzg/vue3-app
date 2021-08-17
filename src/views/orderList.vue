<template>
  <div class="mainPage">
    <ul>
        <li class="clearfix b-border" v-for="(item,index) in list" :key="index">
          <div class="fl img-div">
            <img class="fl" :src="item.image" />
          </div>
          <div class="fl info-div">
            <h4 class="ellipsis">{{item.name}}</h4>
            <div class="clearfix info-price">
              <p class="fl">消费金额：</p>
              <div class="clearfix fl">
                <span class="fl">{{item.price}}元</span>
              </div>
            </div>
            <p class="ellipsis time">消费时间：2020-12-20</p>
          </div>
          <div class="fl evaluation-div">
            <a href="javascript:;">评价</a>
          </div>
        </li>
    </ul>
  </div>
</template>

<script>
import { data } from '../JS/shopData'
export default {
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.list = data.data[0].foods
    console.log(this.list)
  }

}
</script>

<style lang="less" scoped>
.mainPage {
  background: #fff;
  > ul {
    // padding: 0 15px;
    position: relative;
    height: 100%;
    overflow: auto;
    li {
      padding: 15px;
      .img-div {
        width: 96px;
        height: 74px;
        border-radius: 2px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 2px;
        }
      }
      .info-div {
        margin: 0 13px 0 15px;
        width: 160px;
        h4 {
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
          line-height: 20px;
        }
        p {
          font-size: 11px;
          color: rgba(153, 153, 153, 1);
          line-height: 16px;
        }
        .info-price {
          margin-bottom: 8px;
          p {
            line-height: 20px;
          }
          span {
            font-size: 14px;
            font-weight: bold;
            color: rgba(243, 72, 72, 1);
            line-height: 20px;
            &:nth-of-type(2) {
              font-size: 10px;
              padding-top: 1px;
            }
          }
        }
      }
      .evaluation-div {
        position: relative;
        margin-top: 24px;
        a,
        i {
          display: block;
        }
        a {
          width: 60px;
          height: 27px;
          line-height: 27px;
          font-size: 12px;
          color: #0e8fe8;
          background: #fff;
          border-radius: 13px;
          border: 1px solid #0e8fe8;
          text-align: center;
          &.evaluated {
            line-height: 28px;
            color: rgba(153, 153, 153, 1);
            background: rgba(243, 243, 243, 1);
            border: none;
          }
        }
        i {
          position: absolute;
          top: -27px;
          left: -5px;
          width: 73px;
          height: 26px;
          // background: url(../../assets/img/evaluation/ic-pagecontrols-package@2x.png) no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
  .nodata {
    margin-top: 107px;
    text-align: center;
    img {
      width: 110px;
      height: 110px;
    }
    p {
      margin-top: 13px;
      font-size: 14px;
      font-weight: bold;
      color: rgba(215, 215, 215, 1);
      line-height: 20px;
    }
  }
}
.time {
  width: 300px !important;
}
</style>
