<template>
  <view class="navbar">
    <uni-nav-bar>
      <block slot="left">
        <view class="city">
          <view>
            <text class="uni-nav-bar-text">{{ city }}</text>
          </view>
          <uni-icons type="arrowdown" color="#666" size="18" />
        </view>
      </block>
      <view class="mid">
        <view class="input-view">
          <uni-icons
            class="input-uni-icon"
            type="search"
            size="18"
            color="#999"
          />
          <input
            confirm-type="search"
            class="nav-bar-input"
            type="text"
            placeholder="输入搜索关键词"
            @confirm="confirm"
          />
        </view>
      </view>
      <block slot="right">
        <view class="city"> 搜索 </view>
      </block>
    </uni-nav-bar>
  </view>
  <view class="main">
    <view class="row" v-for="task in taskList" :key="task.id">
      <view class="top">
        <view class="left">
          <image
            class="avatar"
            :src="task.user.avatar"
            mode="widthFix"
            v-if="task.user.avatar"
          ></image>
          <image
            class="avatar"
            src="@/static/icons/user.png"
            mode="widthFix"
            v-else
          ></image>

          <view class="info">
            <view class="nickname">{{ task.user.nickname }}</view>
            <view class="time"
              ><uni-dateformat
                :date="task.createTime"
                :threshold="[0, 3600000000]"
                fromat="'yyyy-MM-dd hh:mm:ss'"
              ></uni-dateformat>
            </view>
          </view>
        </view>
      </view>
      <view class="center">
        <view class="title">{{ task.detailsJson.content }}</view>
        <view class="content"></view>
      </view>
      <view class="bottom">
        <view class="price">￥{{ task.price }}</view>
        <view>
          <button plain="true" class="accept-btn" @click="acceptTask(task)">
            我要接受
          </button>
        </view>
      </view>
    </view>
  </view>
  <tabbarVue></tabbarVue>
</template>

<script setup lang="ts">
import { createOrder } from "@/api/order";
import { listTask } from "@/api/task";
import tabbarVue from "@/components/tabbar/tabbar.vue";
import { BaseSearch, Task, TaskOrder } from "@/typings";
import { onReachBottom } from "@dcloudio/uni-app";
import { reactive, ref } from "vue";

let finish = ref(false);
let searchVO = reactive({
  pageSize: 10,
  pageNum: 1,
  keyword: "",
} as BaseSearch);

let taskList = ref<Task[]>([]);
const loadTask = () => {
  if (!finish.value) {
    listTask(searchVO).then((res) => {
      if (res.pageSize > res.size) {
        finish.value = true;
      }
      res.list.forEach((task: Task) => {
        task.detailsJson = JSON.parse(task.details);
      });
      searchVO.pageNum++;
      taskList.value.push(...res.list);
    });
  }
};
loadTask();
onReachBottom(() => {
  loadTask();
});
const confirm = (keyword: any) => {
  console.log(keyword);
};
const acceptTask = (task: Task) => {
  let taskOrder = {
    taskId: task.id,
    baseOrder: {
      discountPrice: 0,
      finalPrice: 0,
      originPrice: 0,
      paymentMethod: "wechat",
    },
  } as TaskOrder;
  createOrder(taskOrder).then((res: TaskOrder) => {
    if (res.id) {
      uni.showToast({ title: "接单成功，请联系需求者沟通" });
    }
  });
};
const city = ref("泉州");
</script>

<style lang="scss" scoped>
.main {
  padding: 32rpx;
  .row {
    margin-top: 20rpx;
    .top {
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 80rpx;
          border-radius: 10rpx;
          margin-right: 20rpx;
        }
        .info {
          .nickname {
            font-size: 30rpx;
            color: rgba($color: #000000, $alpha: 0.9);
            margin-bottom: 10rpx;
          }
          .time {
            font-size: 24rpx;
            color: rgba($color: #000000, $alpha: 0.5);
          }
        }
      }
    }
  }
  .center {
    padding: 30rpx 0;
    color: rgba($color: #000000, $alpha: 0.9);
  }
  .bottom {
    padding-bottom: 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1rpx solid rgba($color: #000000, $alpha: 0.05);
    .price {
      font-size: 32rpx;
      color: rgba($color: #ff0000, $alpha: 1);
    }
    .accept-btn {
      padding: 0 !important;
      font-size: 22rpx;
      color: rgba($color: #000000, $alpha: 0.7);
      width: 110rpx;
      border: 0;
      background-color: rgba($color: $uni-theme-color, $alpha: 1);
    }
  }
}
.navbar {
  margin-top: calc(var(--status-bar-height) + 10px);
}
.mid {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.input-view {
  display: flex;
  align-items: center;
  padding: 0 20rpx;
  background-color: rgba($color: #000000, $alpha: 0.1);
  height: 65rpx;
  border-radius: 32.5rpx;
}
</style>
