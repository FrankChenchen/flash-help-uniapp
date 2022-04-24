<template>
  <view class="main">
    <view class="row">
      <view class="left">头像</view>
      <view class="right">
        <view class="content">
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
        </view>
        <uni-icons class="icon" type="right" size="28"></uni-icons>
      </view>
    </view>
    <view class="row">
      <view class="left">昵称</view>
      <view class="right">
        <view class="content">{{ userInfo.nickname }}</view>
        <uni-icons class="icon" type="right" size="28"></uni-icons>
      </view>
    </view>
    <view class="row">
      <view class="left">性别</view>
      <view class="right">
        <view class="content">{{ userInfo.gender }}</view>
        <uni-icons class="icon" type="right" size="28"></uni-icons>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { userStore } from "@/store/userStore";
import { toRefs } from "vue";
import { updateUserInfo } from "@/api/user";
const store = userStore();
let { userInfo } = toRefs(store);

const initUserInfo = () => {
  uni.getUserProfile({
    desc: "用户完善资料",
    success: (res) => {
      const uf = JSON.parse(res.rawData) as {
        gender: number;
        avatarUrl: string;
        nickName: string;
      };
      let genderMap = { 0: "男", 1: "女", 2: "保密" } as {
        [index: number]: string;
      };
      userInfo.value.avatar = uf.avatarUrl;
      userInfo.value.gender = genderMap[uf.gender];
      userInfo.value.nickname = uf.nickName;
      updateUserInfo(userInfo.value);
    },
  });
};
if (!userInfo.value.avatar) {
  uni.showModal({
    title: "完善信息",
    content: "是否同意获取您微信头像和昵称？",
    success: (res) => {
      if (res.confirm) {
        initUserInfo();
      }
    },
  });
}
</script>
<style lang="scss" scoped>
.main {
  border-radius: 15rpx;
  margin: 0 20rpx;
  padding: 20rpx;
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx 0;

    border-bottom: 1rpx solid rgba($color: #000000, $alpha: 0.05);
    .left {
      font-size: 34rpx;
      color: rgba($color: #000000, $alpha: 0.6);
    }
    .right {
      font-size: 34rpx;
      color: rgba($color: #000000, $alpha: 0.9);
      display: flex;
      align-items: center;
      .content {
        margin-right: 10rpx;
      }
    }
  }
}
.avatar {
  width: 80rpx;
  border-radius: 15rpx;
}
.icon {
  opacity: 0.5;
}
</style>
