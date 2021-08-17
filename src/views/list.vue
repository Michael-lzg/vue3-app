<template>
  <div class="list">
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
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
    </van-list>
  </div>
</template>

<script>
import { createApp, reactive, onMounted, toRefs } from 'vue'
import { List } from 'vant'
const app = createApp()
app.use(List)
export default {
  setup () {
    const state = reactive({
      list: [],
      loading: false,
      finished: false
    })

    onMounted(() => {
      console.log(99)
    })

    const onLoad = () => {
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          state.list.push(i)
        }

        // 加载状态结束
        state.loading = false

        // 数据全部加载完成
        if (state.list.length >= 40) {
          state.finished = true
        }
      }, 1000)
    }

    return {
      ...toRefs(state),
      onLoad
    }
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
    .quan1 {
      height: 15px;
    }
  }
}
</style>
