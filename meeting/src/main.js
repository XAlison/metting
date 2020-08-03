// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import AMap from 'vue-amap';
// Vue.use(AMap);

// // 初始化vue-amap
// AMap.initAMapApiLoader({
//   // 申请的高德key
//   key: 'aff59bc1b483e9478888cd311442dcdb',
//   // 插件集合
//   plugin: ['AMap.PlaceSearch', 'AMap.Geolocation']
// });

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
