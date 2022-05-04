<template>
  <div class="main">
    <view
      class="main-order-section"
      :key="index"
      v-for="(order, index) in computedOrders"
    >
      <view class="order-top">
        <view
          class="logisticsNo"
          v-if="order.logisticsNo"
          @click="copy(order.logisticsNo)"
        >
          <view class="ordersn">
            {{ "物流单号:" + order.logisticsNo }}
          </view>
          <image class="icon" src="@/static/icons/order-icon.png"> </image>
        </view>
        <view
          class="finish"
          @click="
            swtichPage(
              '/pages/task-order/demander-order-details?id=' +
                order.taskOrder.id
            )
          "
        >
          <view class="text">{{ order.orderStatus }}</view>
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
            {{ order.taskOrder.task.detailsJson.content }}
          </text>
          <text class="address-info">
            {{
              order.taskOrder.address.address +
              " " +
              order.taskOrder.address.phoneNumber
            }}
          </text>
          <div class="price-wrapper">
            实付款：<text class="price">{{ order.finalPrice + "￥" }}</text>
          </div>
        </view>
      </view>
      <view class="order-bottom">
        <text class="create-time">
          {{ order.createTime }}
        </text>
      </view>
    </view>
  </div>
</template>
<script lang="ts">
import { listOrderForDemander } from "@/api/order";
import { BaseOrder, BaseSearch, TaskOrder } from "@/typings";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      orders: [] as BaseOrder[],
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
  computed: {
    computedOrders() {
      let list: BaseOrder[] = this.orders.map((res) => {
        //旧的数据已经转换过了，不需要重新parse
        try {
          res.taskOrder = JSON.parse(res.priceDetails);
          res.taskOrder.task.detailsJson = JSON.parse(
            res.taskOrder.task.details
          );
          console.log(res);
        } catch (err) {}
        return res;
      });
      return list;
    },
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
        listOrderForDemander(this.searchVO).then((res) => {
          if (res.pageSize > res.size) {
            this.finish = true;
          }
          this.searchVO.pageNum++;
          this.orders.push(...res.list);
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
