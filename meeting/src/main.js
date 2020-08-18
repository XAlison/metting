// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import AMap from 'vue-amap';
import { Cell,CellGroup,Icon,Form,Field,Button,Toast,DatetimePicker,Popup,Dialog} from 'vant';
import axios from 'axios'
import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import '@vant/touch-emulator';

//axios.defaults.baseURL = "http://localhost:8016"
axios.defaults.baseURL = "https://pensionlife.95522.cn/szyl_vote/"

Vue.use(Element)
Vue.use(Cell).use(CellGroup).use(Icon).use(Form).use(Field).
use(Button).use(Toast).use(DatetimePicker).use(Popup).use(Dialog);
Vue.use(AMap);

Vue.prototype.$axios = axios
Vue.prototype.$toast = Toast
Vue.prototype.$dialog = Dialog

// 初始化vue-amap
AMap.initAMapApiLoader({
  // 申请的高德key
  key: 'aff59bc1b483e9478888cd311442dcdb',
  // 插件集合
  plugin: ['AMap.Geolocation','AMap.Geocoder'],
  v: '1.4.4'
});

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
