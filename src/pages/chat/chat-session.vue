<template>
  <view class="main">
    <view class="row" v-for="session in sessions" :key="session.id" @click="check(session)">
      <view class="avatar">
        <uni-badge
          class="uni-badge-left-margin"
          absolute="rightTop"
          :offset="[2, 2]"
          :text="session.checkNum"
        >
          <image
            :src="session.sender.avatar"
            mode="aspectFill"
            v-if="session.sender.avatar"
          ></image>
          <image src="@/static/icons/user.png" mode="aspectFill" v-else></image
        ></uni-badge>
      </view>
      <view class="info">
        <view class="nickname">{{ session.sender.nickname }}</view>
        <view class="message">{{ session.lastMessageJSON.content }}</view>
      </view>
      <view class="time"
        ><uni-dateformat
          :date="session.updateTime"
          :threshold="[0, 3600000000]"
          fromat="'yyyy-MM-dd hh:mm:ss'"
        ></uni-dateformat>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { checkSession, listSession } from "@/api/chat";
import { BaseSearch, ChatSession } from "@/typings";
import { onLoad, onReachBottom } from "@dcloudio/uni-app";
import { ref } from "vue";

let sessions = ref<ChatSession[]>([]);
let searchVO = { pageNum: 1, pageSize: 10 } as BaseSearch;
let finish = false;
const loadData = () => {
  if (!finish) {
    listSession(searchVO).then((res) => {
      if (res.pageSize > res.size) {
        finish = true;
      }
      res.list.forEach((chatSession: ChatSession) => {
        chatSession.lastMessageJSON = JSON.parse(chatSession.lastMessage);
      });
      sessions.value.push(...res.list);
    });
  }
};
const check = (session: ChatSession) => {
  checkSession(session.id).then((res) => {
    if (res == true) {
      uni.navigateTo({ url: "/pages/chat/chat?id=" + session.senderId });
    }
  });
};
onLoad(() => {
  loadData();
});
onReachBottom(() => {
  loadData();
});
</script>
<style lang="scss" scoped>
.main {
  padding: 32rpx;
  .row {
    padding: 20rpx 0;
    border-bottom: 1rpx solid rgba($color: #000000, $alpha: 0.05);
    display: flex;
    align-items: center;
    .avatar {
      image {
        width: 75rpx;
        height: 75rpx;
        border-radius: 10rpx;
      }
      margin-right: 20rpx;
    }
    .info {
      flex: 2;
      overflow: hidden;
      .nickname {
        font-size: 30rpx;
        color: rgba($color: #000000, $alpha: 0.9);
        margin-bottom: 10rpx;
      }
      .message {
        font-size: 28rpx;
        color: rgba($color: #000000, $alpha: 0.5);
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .time {
      flex-shrink: 0;
      margin-left: 20rpx;
      align-self: flex-start;
      font-size: 24rpx;
      color: rgba($color: #000000, $alpha: 0.5);
    }
  }
}
</style>
