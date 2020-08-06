<template>
  <div class="container">
    <h3>会议信息</h3>
    <div class="form-inputs">
      <van-cell-group>
        <van-field v-model="title" label="会议标题" placeholder="请输入会议标题" />
        <van-field v-model="startTime" label="开始时间" placeholder="请输入开始时间" @click="pop" readonly="readonly"></van-field>
        <van-field v-model="endTime" label="结束时间" placeholder="请输入结束时间" @click="pop2" readonly="readonly"></van-field>
        <van-popup v-model="popupShow" position="bottom" :style="{ height: '40%' }">
          <van-datetime-picker
            v-model="currentDate"
            type="datetime"
            title="选择开始时间"
            :min-date="minDate"
            :max-date="maxDate"
            @cancel="hiden"
            @confirm="confirm"
          />
        </van-popup>
        <van-popup v-model="popupShow2" position="bottom" :style="{ height: '40%' }">
          <van-datetime-picker
            v-model="currentDate"
            type="datetime"
            title="选择结束时间"
            :min-date="minDate2"
            :max-date="maxDate"
            @cancel="hiden2"
            @confirm="confirm2"
          />
        </van-popup>
      </van-cell-group>
    </div>
    <div style="margin: 16px;">
      <van-button round block type="info" @click="getQRCode">获取会议二维码</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      startTime: "",
      endTime: "",
      popupShow: false,
      popupShow2: false,
      minDate: new Date(2020,7,6),
      maxDate: new Date(2025, 11, 31),
      minDate2: new Date(),
      currentDate: new Date()
    };
  },
  methods: {
    pop() {
      this.popupShow = true;
    },
    pop2() {
      this.popupShow2 = true;
    },
    hiden(){
        this.popupShow = false;
    },
    hiden2(){
        this.popupShow2 = false;
    },
    confirm(val){
      this.startTime = this.formatTime(val);
      this.popupShow = false
      //设置结束时间最小值为开始时间
      this.minDate2 = val;
    },
    confirm2(val){
      this.endTime = this.formatTime(val);
      this.popupShow2 = false
    },
    formatTime(val){
      // 时间格式化
      let year = val.getFullYear()//年
      let month = val.getMonth() + 1//月
      let day = val.getDate()//日
      let hour = val.getHours()//时
      let minute = val.getMinutes()//分
      if (month >= 1 && month <= 9) { month = `0${month}` }
      if (day >= 1 && day <= 9) { day = `0${day}` }
      if (hour >= 0 && hour <= 9) { hour = `0${hour}` }
      if (minute >= 0 && minute <= 9) { minute = `0${minute}` }
      return `${year}-${month}-${day} ${hour}:${minute}`;
    }
  },
};
</script>

<style scoped>
h3 {
  text-align: center;
}
</style>