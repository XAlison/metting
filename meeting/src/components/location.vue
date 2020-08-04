<template>
  <div class="container">
      <!-- 地图容器 -->
    <div id="map_container">
      <!-- 地图 -->
      <el-amap
          :center="center"
          :zoom="zoom"
          class="amap_demo"
          :plugin="plugin">
          <!-- 地图标记 -->
          <el-amap-marker v-for="(marker,index) in markers" :position="marker.position" :key="index"></el-amap-marker>
      </el-amap>
    </div>
    <div class="toolbar">
          <span v-if="loaded">
            location: lng = {{ lng }} lat = {{ lat }}
          </span>
        <span v-else>正在定位</span>
    </div>
  </div>
</template>

<style scpoe>
.container{
  height: 100%;
  width: 100%;
}
#map_container{
  width: 100%;
  height: 100%;
}
.amap_demo{
  width: 100%;
  height: 100%;
 }
</style>

<script>
  export default {
    data(){
      const that = this;
      return{
        zoom: 4,
        // 默认中心点
        center: [116.40,39.90],
        // 标记点
        markers: [
            // 标记点位置
            { position: [116.40,39.90]}
        ],
        loaded:false,
        lng:0,
        lat:0,
        // 当前地图的插件
        plugin: [{
          enableHighAccuracy: true,//是否使用高精度定位，默认:true
          timeout: 10000,          //超过10秒后停止定位，默认：无穷大
          maximumAge: 0,           //定位结果缓存0毫秒，默认：0
          convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true,        //显示定位按钮，默认：true
          buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
          showMarker: false,        //定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy:true,//定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
          extensions:'all',
          pName: 'Geolocation',
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                console.log(result)
                if (result && result.position) {
                    // 将当前经纬度给中心点
                    that.center = [result.position.lng, result.position.lat];
                    that.lng = result.position.lng;
                    that.lat = result.position.lat;
                    // 将当前经纬度给标记点
                    that.markers[0].position = that.center;                   
                    that.loaded = true;
                    //向父组件发送地址信息
                    that.$emit("getLocation",
                    result.addressComponent.building,
                    result.addressComponent.province + 
                    result.addressComponent.city +
                    result.addressComponent.district +
                    result.addressComponent.street + 
                    result.addressComponent.streetNumber)
                    that.$nextTick();
                    
                }
              });
            }
          }
        }],
      }
    }
  }
  
</script>