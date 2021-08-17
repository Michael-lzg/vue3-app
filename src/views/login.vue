<template>
  <div class="mainPage">
    <div class="item">
      <input type="text" placeholder="请输入用户名" v-model="name">
    </div>
    <div class="item">
      <input type="text" placeholder="请输入手机号" v-model="tel" maxlength="11">
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
export default {
  data () {
    return {
      name: '',
      tel: '',
      psw: ''
    }
  },
  methods: {
    submit () {
      if (!this.name) {
        this.$toast({ msg: '请输入用户名' })
        return
      }
      if (!this.util.isPhone(this.tel)) {
        this.$toast({ msg: '请输入正确手机号' })
        return
      }
      if (!this.psw) {
        this.$toast({ msg: '请输入密码' })
        return
      }
      sessionStorage.setItem('tel', this.tel)
      sessionStorage.setItem('name', this.name)
      this.$router.replace({
        path: '/mine'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.mainPage {
  padding-top: 150px;
  .item {
    padding: 0 15px;
    > input {
      width: 100%;
      height: 45px;
      line-height: 45px;
      position: relative;
      border-bottom: 1px solid #e9e9e9;
    }
    .btn{
      width: 100%;
      height: 45px;
      line-height: 45px;
      background-color: rgb(49, 144, 232);
      color:#fff;
      text-align: center;
      border-radius: 2px;
      margin-top: 30px;
    }
  }
}
</style>
