<template>
  <div class="start">
    <div class="box">
      <image
        class="background"
        mode="widthFix"
        src="../../static/img/background.jpg"
      ></image>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { wechatLogin } from '@/api/auth';
let token = uni.getStorageSync('token');
if (!token) {
  wechatLogin();
} else {
  setTimeout(() => {
    uni.reLaunch({
      url: '/pages/index/index',
    });
  }, 1500);
}
</script>
<style scoped lang="scss">
.start {
  width: 100%;
  height: 100vh;
  // position: relative;

  .box {
    width: 100%;
    height: 100vh;

    .background {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
