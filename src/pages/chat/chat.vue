<template>
  <view class="main">
    <view class="row" v-for="history in histories" :key="history.id">
      <view class="chat-row chat-left" v-if="history.receiverId == userInfo.id">
        <view class="avatar">
          <image
            :src="receiver.avatar"
            mode="widthFix"
            v-if="receiver?.avatar"
          ></image>
          <image src="@/static/icons/user.png" mode="widthFix" v-else></image>
        </view>
        <text class="message"> {{ history.messageJSON.content }} </text>
      </view>
      <view class="chat-row chat-right" v-else>
        <text class="message">{{ history.messageJSON.content }} </text>
        <view class="avatar">
          <image src="@/static/img/portrait.jpg" mode="widthFix"></image>
        </view>
      </view>
    </view>
  </view>
  <view class="bottom">
    <view class="left">
      <uni-icons type="mic" size="25"></uni-icons>
    </view>
    <view class="mid">
      <view class="input-view">
        <input type="text" @confirm="sendMessage" v-model="content" />
      </view>
    </view>
    <view class="right">
      <uni-icons type="plus" size="25"></uni-icons>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { userStore } from "@/store/userStore";
import { onLoad, onPullDownRefresh } from "@dcloudio/uni-app";
import { getOthersInfo } from "@/api/user";
import { listChatHistory } from "@/api/chat";
import { ref, toRefs } from "vue";
import ws from "@/utils/websocket/ws";
import { BaseSearch, ChatHistory, User } from "@/typings";
let store = userStore();
let { userInfo } = toRefs(store);
let receiver = ref<User>();

let content = ref("");
const sendMessage = () => {
  let message = {
    receiverId: receiver.value?.id,
    messageJSON: { content: content.value },
  } as ChatHistory;
  message.message = JSON.stringify(message.messageJSON);
  ws.send("/chat-server/send", JSON.stringify(message));
  histories.value.push(message);
  content.value = "";
};

let finish = false;
let searchVO = { pageNum: 1, pageSize: 10 } as BaseSearch;
let histories = ref<ChatHistory[]>([]);
const loadHistory = () => {
  if (!finish) {
    listChatHistory(searchVO).then((res) => {
      if (res.pageSize > res.size) {
        finish = true;
      }
      res.list.forEach((chatHistory: ChatHistory) => {
        chatHistory.messageJSON = JSON.parse(chatHistory.message);
      });
      searchVO.pageNum++;
      histories.value.unshift(...res.list);
    });
  }
};

onPullDownRefresh(() => {
  loadHistory();
  uni.stopPullDownRefresh();
});
onLoad(async (ops) => {
  let receiverId = ops.id;
  receiver.value = await getOthersInfo(receiverId as string);
  searchVO.userId = receiver.value.id;
  uni.setNavigationBarTitle({ title: receiver.value.nickname });
  loadHistory();
  ws.connect();
  uni.onSocketOpen(() => {
    ws.subscribe("/user/queue/chat", (message) => {
      console.log(message);
    });
  });
});
</script>
<style lang="scss" scoped>
.main {
  background-color: rgba($color: #000000, $alpha: 0.03);
  padding: 30rpx;
  height: 100vh;
  .chat-view {
    height: 90vh;
  }
}
.row {
  margin-top: 30rpx;
  .chat-row {
    display: flex;
    align-items: flex-start;
    &.chat-right {
      justify-content: flex-end;
      .avatar {
        margin-left: 20rpx;
      }
    }
    &.chat-left {
      .avatar {
        margin-right: 20rpx;
      }
    }
    .avatar {
      image {
        width: 65rpx;
        border-radius: 10rpx;
      }
    }
    .message {
      background-color: white;
      word-break: break-all;
      padding: 15rpx;
      border-radius: 10rpx;
    }
  }
}
.bottom {
  position: fixed;
  bottom: 0;
  width: 750rpx;
  padding: 20rpx;
  background-color: rgba($color: #000000, $alpha: 0.05);
  display: flex;
  align-items: center;
  .left {
    margin-right: 20rpx;
  }
  .mid {
    flex-grow: 1;
    .input-view {
      background-color: white;
      display: flex;
      align-items: center;
      padding: 0 20rpx;
      height: 65rpx;
      border-radius: 10rpx;
    }
  }
  .right {
    margin-left: 20rpx;
    margin-right: 40rpx;
  }
}
</style>
