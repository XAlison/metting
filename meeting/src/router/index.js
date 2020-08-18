import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'meetingInfo',
      component: () => import('@/views/meetingInfo'),
      meta:{
        title: "会议信息录入"
      }
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: () => import('@/views/signIn'),
      meta:{
        title: "成员签到页"
      }
    }
    ,
    {
      path: '/showQRCode',
      name: 'ShowQRCode',
      component: () => import('@/views/ShowQRCode'),
      meta:{
        title: "成员签到页"
      }
    },
    {
      path: '/signSuccess',
      name: 'signSuccess',
      component: () => import('@/views/signSuccess'),
      meta:{
        title: "签到成功"
      }
    }
  ]
})
