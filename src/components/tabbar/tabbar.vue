<template>
  <view class="tarbar">
    <image
      class="tarbar-image"
      src="@/static/icons/tabbar.png"
      mode="widthFix"
    ></image>
    <view class="tabs">
      <view class="tab" v-for="tab in tabs" @click="switchTab(tab)">
        <view class="mid-tab" v-if="tab.isMid">
          <view class="mid-icon">
            <image :src="tab.icon" mode="widthFix"></image>
          </view>
        </view>
        <view class="icon" v-else>
          <image
            :src="tab.activeIcon"
            v-if="store.active == tab.name"
            mode="widthFix"
          ></image>
          <image :src="tab.icon" mode="widthFix" v-else></image>
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { tabbarStore } from "@/store/tabbarStore";
const tabs = [
  {
    path: "/pages/index/index",
    icon: "/static/icons/home.png",
    activeIcon: "/static/icons/home-active.png",
    name: "首页",
    isMid: false,
  },
  {
    path: "/pages/index/index",
    icon: "/static/icons/plus.png",
    name: "发布",
    isMid: true,
  },
  {
    path: "/pages/user/user",
    icon: "/static/icons/user.png",
    activeIcon: "/static/icons/user-active.png",
    name: "我的",
    isMid: false,
  },
];
const store = tabbarStore();
console.log(store.active);
const switchTab = (tab: typeof tabs[0]) => {
  store.changeActive(tab.name);
  console.log(store.active);
  uni.navigateTo({ url: tab.path });
};

</script>
<style lang="scss" scoped>
.tarbar {
  position: fixed;
  z-index: 100;
  bottom: 200rpx;
  left: 20rpx;
  right: 20rpx;
  .tabs {
    position: absolute;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    .tab {
      flex-grow: 0;
      position: relative;
      .icon {
        image {
          width: 70rpx;
        }
      }
    }

    .mid-tab {
      position: absolute;
      left: -70rpx;
      bottom: -50rpx;
      height: 140rpx;
      width: 140rpx;
      .mid-icon {
        margin: 20rpx;
        border-radius: 50rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #ffc300;
        image {
          width: 100rpx;
        }
      }
    }
  }
  .tarbar-image {
    z-index: -1;
    position: absolute;
    width: 100%;
    left: 13rpx;
    top: -60rpx;
  }
}
</style>
