import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  //base: "/szyl_vote/meeting/",
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
  ]
})
