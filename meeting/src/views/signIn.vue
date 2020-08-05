<template>
  <div class="container">
    <h3>XXX会议</h3>
    <van-form @submit="onSubmit">
      <van-field class="loc" name="location" @click="refresh">
        <template #input>
          <van-cell :title="loc" :label="locInfo" center>
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #right-icon>
              <van-icon name="location-o" size="18px" />
            </template>
          </van-cell>
        </template>
      </van-field>
      <van-field
        v-model="username"
        name="username"
        label="姓名"
        placeholder="姓名"
      />
      <van-field
        v-model="empNumber"
        name="empNumber"
        label="工号"
        placeholder="工号"
      />
      <van-field
        v-model="tel"
        name="tel"
        label="手机号"
        placeholder="请填写手机号"       
        maxlength=11
      >
        <template #button>
          <van-button size="small" type="info" plain @click="sendSMS" :text="smsTimer" :disabled="isDisabledSMS" native-type="button"></van-button>
        </template>
      </van-field>
      <van-field
        v-model="sms"
        name="sms"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
      ></van-field>

      <div style="margin: 16px;">
        <van-button round block type="info"  native-type="submit" :text="subText" :disabled="isDisabledSub"></van-button>
      </div>
    </van-form>

    <location v-show="false" @getLocation="setLocation" :key="keyTimer"></location>
  </div>
</template>

<script>
import Location from "../components/location.vue";
export default {
  components: {
    location: Location,
  },
  data() {
    return {
      loc: "正在定位...",
      locInfo: "",
      username: "",
      empNumber: "",
      tel: "",
      sms: "",
      keyTimer: "",
      isDisabledSMS: false,
      isDisabledSub: false,
      smsTimer: "发送验证码",
      subText: "立即签到"
    };
  },
  methods: {
    onSubmit(values) {     
        if(this.loc == "正在定位..."){
          this.$toast.fail("定位未完成");
          return ;
        }else if(this.username == ""){
          this.$toast.fail("请填写姓名");
          return ;
        }else if(this.empNumber == ""){
          this.$toast.fail("请填写工号");
          return ;
        }else if(this.tel == ""){
          this.$toast.fail("请填写手机号");
          return ;
        }else if (this.tel !== "") {
          var reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
          if (!reg.test(this.tel)) {
            this.$toast.fail("请填写正确的手机号");
          return ;
          }else if(this.sms == ""){
          this.$toast.fail("请填写验证码");
          return ;
          }
        } 
        this.$toast.loading({
                forbidClick: true,
                message: '签到中...',
        });
        //发请求
        this.$axios({
          method: "post",
          url: "/signIn",
          data:{
            "loc": this.loc,
            "locinfo": this.locInfo,
            "username": this.username,
            "empNumber": this.empNumber,
            "tel": this.tel,
            "sms": this.sms
          }
        }).then((res)=>{
          if(res.data.code == "200"){        
            setTimeout(() => {            
              this.$toast.clear();
              this.isDisabledSub = true;
              this.isDisabledSMS = true;
              this.subText = "已签到";
              this.smsTimer = "发送验证码"
            }, 500);
          }else{
            this.$toast.message = "签到失败"
          }
        }).catch((res)=>{
          this.$toast.fail("签到失败")
        })             
    },
    setLocation(building, info) {
      this.loc = building;
      this.locInfo = info;
    },
    refresh() {
      this.loc = "正在定位...";
      this.locInfo = "";
      this.keyTimer = new Date().getTime();
    },
    sendSMS(){
        if(this.username == ""){
          this.$toast.fail("请填写姓名");
        }else if(this.empNumber == ""){
          this.$toast.fail("请填写工号");
        }else if(this.tel == ""){
          this.$toast.fail("请填写手机号")
        }else if (this.tel !== "") {
          var reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
          if (!reg.test(this.tel)) {
            this.$toast.fail("请填写正确的手机号")
          }else{
            //发送请求
            console.log("发送验证码...")
            this.$axios({
              method: "post",
              url: "/sendSMS",
              data:{
                "tel":this.tel
              }
            }).then((res)=>{             
              if(res.data.code == "200"){
                //按钮禁用
                this.isDisabled = true;
                //开始倒计时60秒var
                const TIME_COUNT = 60;
                var count = TIME_COUNT;
                var temp = setInterval(() => {
                  if(count>0 && count <=TIME_COUNT){                   
                    this.smsTimer = count +"秒后重发"
                    count--;
                  }else{
                    clearInterval(temp);
                    this.isDisabled = false;
                    this.smsTimer = "发送验证码";
                  }
                }, 1000);
              }
            }).catch((error)=>{
              this.$toast.fail("验证码发送失败")
            })
          }
        }
      }
  }
}
</script>

<style scoped>
h3 {
  text-align: center;
}
.loc {
  padding-left: 0;
  padding-right: 0;
}
</style>