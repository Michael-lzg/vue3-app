<template>
  <div class="mainPage">
    <div class="item">
      <input type="text" placeholder="请输入用户名" v-model="name">
    </div>
    <div class="item">
      <input type="text" placeholder="请输入密码" v-model="psw">
    </div>
    <div class="item">
      <div class="btn" @click="submit">提交</div>
    </div>
  </div>
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
      name: '',
      psw: ''
    })

    const submit = () => {
      if (!state.name) {
        Toast({ msg: '请输入用户名' })
        return
      }
      if (!state.psw) {
        Toast({ msg: '请输入密码' })
        return
      }
      sessionStorage.setItem('name', this.name)
      router.replace({
        path: '/mine'
      })
    }

    return {
      ...toRefs(state),
      submit
    }
  }
}
</script>

<style lang="less" scoped>
.mainPage {
  padding-top: 150px;
  .item {
    padding: 0 15px;
    margin-bottom: 15px;
    > input {
      width: 100%;
      height: 50px;
      line-height: 50px;
      position: relative;
      background-color: #f5f5f5;
      border-radius: 50px;
      text-align: center;
    }
    .btn {
      width: 100%;
      height: 50px;
      line-height: 50px;
      background-color: rgb(49, 144, 232);
      color: #fff;
      text-align: center;
      border-radius: 2px;
      margin-top: 30px;
    }
  }
}
</style>
