<template>
  <div class="mainPage">
    <div class="topBar">
      <input type="text" placeholder="搜索商家" v-model="key">
      <img src="../assets/images/home/icon_home_search.png" alt="" width="13" class="search">
      <img src="../assets/images/home/del.png" alt="" width="13" class="del" @click="key=''">
      <span class="cancel" @click="cancel">取消</span>
    </div>

    <div class="list">
        <div class="listItem" v-for="(item,index) in list" :key="index" @click="toDetail(item.id)">
          <img src="../assets/images/home/store.png" alt="" width="16">
          <div class="item-top ellipsis">{{item.name}}</div>
          <div class="item-bot clearfix">
            <div class="fl ellipsis">地址：{{item.address}}</div>
            <div class="fr">{{item.cityName}}</div>
          </div>
        </div>
    </div>

    <div class="noData" v-if="list.length===0">
      <img src="../assets/images/home/ic_pagecontrols_store@2x.png" alt="" width="140">
      <div v-if="key">搜索不到相关门店</div>
      <div v-if="!key">请搜索相关门店</div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      key: '',
      list: [],
      currIndex: 1,
      lastDataLength: 10
    }
  },
  watch: {
    key () {
      this.currIndex = 1
      this.getList()
    }
  },
  methods: {
    cancel () {
      this.$router.go(-1)
    },
    toDetail (id) {
      this.$router.push({
        path: '/shopDetail?id=' + id
      })
    },
    getList () {
      if (this.key === '') {
        this.list = []
        return
      }
      let data = {
        lng: sessionStorage.getItem('lng'),
        lat: sessionStorage.getItem('lat'),
        currIndex: this.currIndex,
        pageSize: 10,
        name: this.key
      }
      this.$http.post('xxxx', data).then(res => {
        if (res.code === '00000') {
          if (this.currIndex === 1) {
            this.list = res.data.records
          } else {
            this.list = this.list.concat(res.data.records)
          }
        } else {
          this.list = []
          this.lastDataLength = 1
        }
      })
    }
  },
  mounted () {
    document.title = '搜索商家'
  }
}
</script>

<style lang="less" scoped>
.mainPage {
  box-sizing: border-box;
  height: 100%;
  overflow: auto;
  padding-top: 44px;
}
.topBar {
  box-sizing: border-box;
  width: 100%;
  position: absolute;
  padding: 8px 12px;
  border-bottom: 1px solid #e9e9e9;
  top: 0;
  background-color: #fff;
  z-index: 99;
  > input {
    width: 313px;
    height: 27px;
    background: rgba(235, 236, 238, 1);
    border-radius: 13px;
    font-size: 12px;
    text-indent: 26px;
  }
  .search {
    position: absolute;
    left: 20px;
    top: 15px;
  }
  .del {
    position: absolute;
    right: 60px;
    top: 15px;
  }
  .cancel {
    position: absolute;
    right: 12px;
    top: 12px;
    font-size: 14px;
  }
}
.list {
  padding: 0 15px;
  // height: calc(100% - 44px);
  overflow: auto;
  position: relative;
  .listItem {
    padding: 10px 0;
    padding-left: 26px;
    position: relative;
    border-bottom: 1px solid #e9e9e9;
    > img {
      position: absolute;
      top: 15px;
      left: 0;
    }
    .item-top {
      font-weight: 500;
      font-size: 18px;
      margin-bottom: 10px;
    }
    .item-bot {
      color: rgba(128, 128, 128, 1);
      font-size: 11px;
      .fl {
        width: 280px;
      }
    }
  }
}
.noData{
  margin-top: 50px;
  font-size: 12px;
  text-align: center;
  >div{
    margin-top: 10px;
    color: #ccc;
  }
}
</style>
