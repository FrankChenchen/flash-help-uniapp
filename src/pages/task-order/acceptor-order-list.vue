<template>
  <div class="main">
    <view
      class="main-order-section"
      :key="index"
      v-for="(order, index) in orders"
    >
      <view class="order-top">
        <view
          class="logisticsNo"
          v-if="order.baseOrder.logisticNo"
          @click="copy(order.baseOrder.logisticNo)"
        >
          <view class="ordersn">
            {{ "物流单号:" + order.baseOrder.logisticNo }}
          </view>
          <image class="icon" src="../../static/icons/order-icon.png"> </image>
        </view>
        <view
          class="finish"
          @click="
            swtichPage(
              '/pages/task-order/acceptor-order-details?id=' + order.id
            )
          "
        >
          <view class="text">{{ order.baseOrder.orderStatus }}</view>
          <uni-icons class="right-arrow" type="right" size="20"></uni-icons>
        </view>
      </view>
      <view class="main-order">
        <image
          class="order-cover"
          mode="aspectFill"
          src="@/static/img/logo2.png"
        ></image>

        <view class="info">
          <text class="user-info">
            {{ order.task.detailsJson.content }}
          </text>
          <text class="address-info">
            {{
              order.address.address +
              " " +
              order.address.phoneNumber
            }}
          </text>
          <div class="price-wrapper">
            实付款：<text class="price">{{ order.baseOrder.finalPrice + "￥" }}</text>
          </div>
        </view>
      </view>
      <view class="order-bottom">
        <text class="create-time">
          {{ order.baseOrder.createTime }}
        </text>
      </view>
    </view>
  </div>
</template>
<script lang="ts">
import { listOrderForAcceptor } from "@/api/order";
import { BaseOrder, BaseSearch, Task, TaskOrder } from "@/typings";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      orders: [] as TaskOrder[],
      searchVO: {
        pageNum: 1,
        pageSize: 10,
        status: "",
      } as BaseSearch,
      finish: false,
      tips: {
        0: "待支付",
        1: "待寄出",
        2: "已寄出",
        3: "已完成",
      },
    };
  },
  onLoad() {
    this.loadOrder();
  },
  methods: {
    copy(value: any) {
      uni.setClipboardData({
        data: value,
        success: () => {},
      });
    },
    loadOrder() {
      if (!this.finish) {
        listOrderForAcceptor(this.searchVO).then((res) => {
          if (res.pageSize > res.size) {
            this.finish = true;
          }
          this.searchVO.pageNum++;
          let orderList = res.list as TaskOrder[];
          let orderList2 = orderList.map((order) => {
            order.task.detailsJson = JSON.parse(order.task.details);
            return order;
          });
          this.orders.push(...orderList2);
        });
      }
    },
    swtichPage(url: string) {
      uni.navigateTo({ url });
    },
  },
  onReachBottom() {
    this.loadOrder();
  },
});
</script>
<style lang="scss" scoped>
.main {
  border-radius: 15rpx;
  margin: 0 20rpx;
  padding: 20rpx;
  padding-bottom: 200rpx;
}
.main-order-section {
  padding: 20rpx;
  border-radius: 15rpx;
  box-shadow: 2rpx 2rpx 10rpx 10rpx rgba($color: #000000, $alpha: 0.02);
  margin-top: 20rpx;
  font-size: 28rpx;
  .order-top {
    margin-bottom: 20rpx;
    display: flex;
    align-items: center;

    .icon {
      width: 25rpx;
      height: 25rpx;
    }
    .logisticsNo {
      display: flex;
      align-items: center;
      .ordersn {
        font-size: 27rpx;
        color: #656565;
        margin-right: 30rpx;
      }
    }
    .finish {
      flex: 2;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .text {
        color: #c4c4c4;
        margin-right: 10rpx;
      }
    }
  }

  .main-order {
    display: flex;
    align-items: flex-start;
    .order-cover {
      flex-shrink: 0;
      width: 140rpx;
      height: 140rpx;
      border-radius: 10rpx;
    }
    .info {
      width: 100%;
      flex: 2;
      margin-left: 20rpx;
      display: flex;
      flex-direction: column;
      overflow: hidden;

      .user-info {
        font-size: 35rpx;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .address-info {
        margin-top: 20rpx;
        font-size: 28rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: rgba($color: #000000, $alpha: 0.5);
      }
      .price-wrapper {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 28rpx;
        color: rgba($color: #000000, $alpha: 0.8);
        .price {
          font-size: 34rpx;
          font-weight: 500;
          color: #ff471f;
        }
      }
    }
  }
  .order-bottom {
    margin-top: 10rpx;
    display: flex;
    justify-content: flex-end;
    .create-time {
      font-size: 28rpx;
      margin-right: 20rpx;
      color: rgba($color: #000000, $alpha: 0.5);
    }
  }
}
</style>
