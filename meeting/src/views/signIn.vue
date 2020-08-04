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
        :rules="[{ required: true, message: '请填写姓名' }]"
      />
      <van-field
        v-model="businessNumber"
        name="businessNumber"
        label="工号"
        placeholder="工号"
        :rules="[{ required: true, message: '请填写工号' }]"
      />
      <van-field
        v-model="tel"
        name="tel"
        label="手机号"
        placeholder="请填写手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      >
        <template #button>
          <van-button size="small" type="info" plain @click="sendSMS" :text="smsTimer" :disabled="isDisabled"></van-button>
        </template>
      </van-field>
      <van-field
        v-model="sms"
        name="sms"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
        :rules="[{ required: true, message: '请填写验证码' }]"
      ></van-field>

      <div style="margin: 16px;">
        <van-button round block type="info"  native-type="submit">立即签到</van-button>
      </div>
    </van-form>

    <location v-show="false" @getLocation="setLocation" :key="timer"></location>
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
      businessNumber: "",
      tel: "",
      sms: "",
      timer: "",
      isDisabled: false,
      smsTimer: "发送验证码"
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },
    setLocation(building, info) {
      this.loc = building;
      this.locInfo = info;
    },
    refresh() {
      this.loc = "正在定位...";
      this.locInfo = "";
      this.timer = new Date().getTime();
    },
    sendSMS(){
        this.isDisabled = true;
        this.smsTimer = "60秒后重发"
    }
  },
};
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