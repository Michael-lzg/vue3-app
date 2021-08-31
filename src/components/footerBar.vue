<template>
  <ul>
    <li v-for="(item,index) in items" :key='index' @click="toUrl(item.url)">
      <img :src="item.icon1" v-if="$route.path==item.url">
      <img :src="item.icon2" v-else>
      <div class="name" :class="{'c1':$route.path==item.url}">{{item.name}}</div>
    </li>
  </ul>
</template>

<script>
import { reactive, toRefs, createApp } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
const app = createApp()
app.use(Toast)
export default {
  setup () {
    const router = useRouter()
    const state = reactive({
      items: [
        {
          name: '首页',
          url: '/',
          icon1: require('../assets/images/home/icon_home_home_H.png'),
          icon2: require('../assets/images/home/icon_home_home_N.png')
        },
        {
          name: '我的',
          url: '/mine',
          icon1: require('../assets/images/home/icon_home_mine_H.png'),
          icon2: require('../assets/images/home/icon_home_mine_N.png')
        }
      ]
    })

    const toUrl = (url) => {
      router.replace({
        path: url
      })
    }

    return {
      ...toRefs(state),
      toUrl
    }
  }
}
</script>

<style scoped lang='less'>
ul {
  width: 100%;
  height: 55px;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  li {
    float: left;
    text-align: center;
    font-size: 12px;
    height: 55px;
    width: 50%;
    padding-top: 9px;
    >img {
      width: 24px;
      height: 24px;
      margin: 0 auto;
    }
    .name {
      text-align: center;
      color: #888888;
      line-height: 22px;
    }
  }
}
.c1 {
  color: #597ef7 !important;
}
</style>
