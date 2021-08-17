<template>
  <div>
    <scroller ref="scroller" :on-refresh="refresh" :on-infinite="infinite">
      <div class="list">
        <div class="listItem" v-for="(item,index) in list" :key="index" @click="toDetail(item.id)">
          <img src="http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750" alt="" class="pic">
          <div class="name ellipsis">天河第一隆江猪脚饭</div>
          <div class="label clearfix">
            <span class="fl" v-for="(i,v) in 3" :key="v">美食</span>
             <div class="fr km">2.6km</div>
          </div>
          <div class="quan ellipsis">
            <img src="../assets/images/home/coupon.png" alt="" width="16">门店优惠折扣：汇享8折优惠，并免会员费
          </div>
          <div class="position ellipsis">广州天河区科韵路码农三号街</div>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      currIndex: 0,
      lastDataLength: 1000,
      lng: '',
      lat: ''
    }
  },
  methods: {
    toDetail (id) {
      this.$router.push({
        path: '/shopDetail?id=' + id
      })
    },
    refresh (done) {
      this.currIndex = 1
      this.getList(done)
    },
    infinite (done) {
      if (this.list.length > 50) {
        this.$refs.scroller.finishInfinite(true)
      } else {
        this.currIndex++
        this.getList(done)
      }
    },
    getList (callback) {
      for (let i = 0; i < 10; i++) {
        this.list.push(i)
      }
      callback && callback()
    }
  },
  mounted () {
    document.title = this.$route.query.name
  }
}
</script>

<style lang="less" scoped>
.list {
  // padding: 0 15px;
  .listItem {
    padding: 10px 15px 10px 115px;
    position: relative;
    border-top: 1px solid #f6f6f6;
    // height: 93px;
    .pic {
      position: absolute;
      left: 15px;
      top: 12px;
      width: 86px;
      height: 86px;
      border-radius: 8px;
    }
    .name {
      font-size: 18px;
      color: #000;
      line-height: 22px;
    }
    .label {
      font-size: 12px;
      color: #666;
      margin-top: 6px;
      > span {
        padding-left: 4px;
        background-color: #fbf1e7;
      }
    }
    .position {
      font-size: 12px;
      color: #d3751d;
    }
    .quan {
      padding: 6px 0;
      font-size: 12px;
      // width: 300px;
      > img {
        margin-right: 4px;
        vertical-align: middle;
        transform: translateY(-2px);
      }
    }
    .quan1{
      height: 15px;
    }
  }
}
</style>
