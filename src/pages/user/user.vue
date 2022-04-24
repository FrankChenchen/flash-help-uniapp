<template>
  <view class="content">
    <view class="user-info-section">
      <image
        v-if="userInfo.avatar"
        class="avatar"
        :src="userInfo.avatar"
        mode="widthFix"
      ></image>
      <image
        v-else
        class="avatar"
        src="@/static/icons/user.png"
        mode="widthFix"
      ></image>
      <view class="info-section" @click="switchPage('/pages/user/user-edit')">
        <view class="nickname">{{ userInfo.nickname }}</view>
        <view class="info">我的信息</view>
      </view>
    </view>
    <view class="divider"> 服务中心 </view>
    <Tabbar></Tabbar>
  </view>
</template>

<script lang="ts" setup>
import { userStore } from "@/store/userStore";
import { toRefs } from "vue";
import Tabbar from "../../components/tabbar/tabbar.vue";
let store = userStore();
const { userInfo } = toRefs(store);
store.getUserInfo();
const switchPage = (url: string) => {
  uni.navigateTo({ url });
};
</script>

<style lang="scss" scoped>
.content {
  padding: 64rpx;
  .user-info-section {
    display: flex;
    align-items: center;
    .avatar {
      border-radius: 50%;
      width: 96rpx;
      height: 96rpx;
      margin-right: 24rpx;
    }
    .nickname {
      font-size: 34rpx;
    }
    .info {
      margin-top: 8rpx;
      font-size: 28rpx;
      color: rgba($color: #000000, $alpha: 0.3);
    }
  }
  .divider {
    margin-top: 80rpx;
    margin-bottom: 50rpx;
    font-size: 34rpx;
    font-weight: bold;
    color: rgba($color: #000000, $alpha: 0.9);
  }
  .functions {
    display: flex;
    flex-wrap: wrap;
    .function {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 40rpx;
      .title {
        font-size: 30rpx;
        color: rgba($color: #000000, $alpha: 0.9);
        margin-top: 20rpx;
      }
      .icon {
        width: 70rpx;
      }
    }
  }
}
</style>
