import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: { title: '首页', keepAlive: false, auth: false }
  },
  // {
  //   path: '/city',
  //   name: 'city',
  //   component: () => import('../views/city.vue'),
  //   meta: { title: '城市选择', keepAlive: false, auth: false }
  // },
  // {
  //   path: '/map',
  //   name: 'map',
  //   component: () => import('../views/map.vue'),
  //   meta: { title: '公交地图', keepAlive: false, auth: true }
  // },
  {
    path: '/list',
    name: 'list',
    component: () => import('../views/list.vue'),
    meta: { title: '商家列表', keepAlive: false, auth: false }
  },
  // {
  //   path: '/search',
  //   name: 'search',
  //   component: () => import('../views/search.vue'),
  //   meta: { title: '搜索商家', keepAlive: false, auth: false }
  // },
  {
    path: '/shopDetail',
    name: 'shopDetail',
    component: () => import('../views/shopDetail.vue'),
    meta: { title: '商家详情', keepAlive: false, auth: false }
  }
  // {
  //   path: '/mine',
  //   name: 'mine',
  //   component: () => import('../views/mine.vue'),
  //   meta: { title: '我的', keepAlive: false, auth: true }
  // },
  // {
  //   path: '/echarts',
  //   name: 'echarts',
  //   component: () => import('../views/echarts.vue'),
  //   meta: { title: '消费统计', keepAlive: false, auth: true }
  // },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: () => import('../views/login.vue'),
  //   meta: { title: '登录', keepAlive: false, auth: false }
  // },
  // {
  //   path: '/qrCode',
  //   name: 'qrCode',
  //   component: () => import('../views/qrCode.vue'),
  //   meta: { title: '付款码', keepAlive: false, auth: false }
  // },
  // {
  //   path: '/orderList',
  //   name: 'orderList',
  //   component: () => import('../views/orderList.vue'),
  //   meta: { title: '我的订单', keepAlive: false, auth: false }
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
