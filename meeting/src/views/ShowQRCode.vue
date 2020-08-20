<template>
    <div align="center" style="padding-top:30%">
        <p>这是会议名为“<span style="font-weight:bold;color:red">{{title}}</span>”的二维码，转发给成员进行签到吧！</p>
        <img :src="imgSrc" @click="clickImg($event)">
        <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
    </div>
</template>
<script>
import BigImg from '../components/imgView.vue'
export default {
    data(){
        return {
            empName:"",
            imgSrc:"",
            showImg:"",
            title:""
        }
    },
    components: {
      'big-img': BigImg
    },
    created(){
        this.empName = this.$route.query.empName;
        this.title = this.$route.query.title;
        this.imgSrc = "./data/qrcodes/"+this.empName+".jpg"
        //this.imgSrc = require("../assets/"+this.empName+".jpg")
    },
    methods: {
      clickImg (e) {
        this.showImg = true
        this.imgSrc = e.currentTarget.src
      },
      viewImg () {
        this.showImg = false
      }
    }
}
</script>
