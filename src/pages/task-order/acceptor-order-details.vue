<template>
  <view class="main">
    <view class="detailsHeader">
      <view class="detailsBox" v-if="order.id">
        <view class="pay-info" v-if="order.baseOrder.paymentTime">
          <view>
            <image src="../../static/icons/play_success.png"></image>
          </view>
          <view class="pay-i-text">
            <view>对方已支付</view>
            <view>{{ contents[order.baseOrder.orderStatus] }}</view>
          </view>
        </view>
        <view class="pay-fail" v-else>
          <view>对方未支付，等待支付</view>
          <view>15分钟未支付，订单将自动取消</view>
        </view>
        <view class="order-card-section">
          <view class="pay-line"></view>
          <view class="pay-lines"></view>
          <view class="pay-details-card">
            <view class="details-i-t">
              <image
                :src="order.demander.avatar"
                mode=""
                v-if="order.demander.avatar"
              ></image>
              <image src="../../static/logo.png" mode="" v-else></image>
              <text>{{
                order.demander.nickname ? order.demander.nickname : "默认昵称"
              }}</text>
            </view>
            <view class="line"></view>
            <view class="orde-details">
              <view class="order-item">
                <view>订单编号</view>
                <view>{{ order.id }}</view>
              </view>
              <view class="order-item">
                <view>下单时间</view>
                <view>{{ order.baseOrder.createTime }}</view>
              </view>
              <view class="order-item">
                <view>照片</view>
                <view>
                  <uploadVue ref="upload" :disable="true"></uploadVue
                ></view>
              </view>
              <view class="order-item">
                <view>任务内容</view>
                <view class="word-content" v-if="order.task">
                  {{ order.task.detailsJson.content }}
                </view>
              </view>
              <view class="details-footer">
                <view>支付:</view>
                <view>
                  ¥
                  <text>{{ order.baseOrder.finalPrice }}￥</text>
                </view>
              </view>
            </view>

            <view class="btns">
              <view class="btn" v-if="order.baseOrder.orderStatus == '待支付'">
                <button class="btn1" @click="cancel">取消订单</button>
              </view>
              <view
                class="btn"
                v-if="
                  order.baseOrder.orderStatus == '待确认' ||
                  order.baseOrder.orderStatus == '已完成'
                "
              >
                <button class="btn3" @click="logisticsShow">查看物流</button>
              </view>
              <view class="btn" v-if="order.baseOrder.orderStatus == '待发货'">
                <button class="btn2" @click="open">发货</button>
              </view>
              <view class="btn" v-if="order.baseOrder.orderStatus == '待确认'">
                <button class="btn2" @click="open">重新发货</button>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <uni-popup ref="popup" type="dialog">
      <uni-popup-dialog
        mode="input"
        title="请填写物流单号"
        placeholder="无需发货则可不填"
        :duration="2000"
        :before-close="true"
        @close="close"
        @confirm="confirm"
      ></uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { TaskOrder } from "@/typings";
import { cancelOrder, getOrderById, shipOrder } from "@/api/order";
import { onLoad } from "@dcloudio/uni-app";
import uploadVue from "@/components/upload/upload.vue";
const contents = {
  待发货: "对方正在加速完成任务",
  待确认: "您的任务已经完成，请确认",
  已完成: "您的订单已完结，欢迎继续使用",
};
// 发货对话框
let popup = ref();
const open = () => {
  if (popup) {
    popup.value.open();
  }
};
const close = () => {
  if (popup) {
    popup.value.close();
  }
};
const confirm = (value: string) => {
  ship(value);
  close();
};
// 等待加载，发货，取消
let order = ref({} as TaskOrder);
let upload = ref<InstanceType<typeof uploadVue>>();
const getOrder = (id: string) => {
  getOrderById(id).then((res: TaskOrder) => {
    res.task.detailsJson = JSON.parse(res.task.details);
    order.value = res;
  });
};
const ship = (logisticNo: string) => {
  shipOrder(order.value.id, logisticNo).then((res) => {
    if (res.operation == "success") {
      uni.showToast({
        title: "发货成功",
        icon: "success",
      });
    }
  });
};
const cancel = () => {
  cancelOrder(order.value.id).then((res) => {
    if (res.operation == "success") {
      uni.showToast({
        title: "取消成功",
        icon: "success",
      });
      setTimeout(() => {
        uni.navigateBack({});
      }, 500);
    }
  });
};
const logisticsShow = () => {
  uni.navigateToMiniProgram({
    appId: "wx6885acbedba59c14",
    path: `pages/result/result?nu=${order.value.baseOrder.logisticNo}&com=&querysource=third_xcx`,
  });
};

onLoad((option) => {
  let ops = option as Record<string, string>;
  if (option != undefined) {
    getOrder(ops.id);
  }
});
onMounted(() => {
  setTimeout(() => {
    if (upload.value) {
      upload.value?.setFiles(order.value.task.detailsJson.imgs);
    }
  }, 2000);
});
</script>

<style lang="scss" scoped>
.detailsBox {
  width: 100%;
  height: 337rpx;
  background: url(../../static/icons/bg.png) no-repeat;
  background-size: 100% 100%;
  position: absolute;

  .pay-info {
    display: flex;
    padding: 0rpx 0rpx 0rpx 50rpx;
    view:first-child {
      image {
        width: 150rpx;
        height: 150rpx;
      }
    }
    .pay-i-text {
      padding-top: 10rpx;

      view:first-child {
        font-size: 40rpx;
        font-weight: bold;
        color: #ffffff;
      }

      view:last-child {
        font-size: 26rpx;
        font-weight: 400;
        color: #ffffff;
        margin-top: 8rpx;
      }
    }
  }
  .pay-fail {
    margin: 20rpx 0 20rpx 50rpx;
    view:first-child {
      font-size: 40rpx;
      font-weight: bold;
      color: #ffffff;
    }

    view:last-child {
      font-size: 26rpx;
      font-weight: 400;
      color: #ffffff;
      margin-top: 8rpx;
    }
  }
  .order-card-section {
    position: relative;

    .pay-line {
      position: absolute;
      width: 672rpx;
      height: 24rpx;
      background: #047dd9;
      border-radius: 7rpx;
      left: 40rpx;
    }

    .pay-lines {
      position: absolute;
      width: 614rpx;
      height: 24rpx;
      background: url(../../static/icons/c1a794c7bd5e28075c5cd47bb6ad715.png)
        no-repeat;
      background-size: 100% 100%;
      left: 68rpx;
      top: 15rpx;
      z-index: 99;
    }

    .pay-details-card {
      position: absolute;
      width: 637rpx;
      background: url(../../static/icons/bg2.png) no-repeat;
      background-size: 100% 100%;
      left: 58rpx;
      margin-top: 10rpx;
      padding-bottom: 50rpx;
      .details-i-t {
        display: flex;
        align-items: center;
        padding: 40rpx 0rpx 24rpx 24rpx;

        image {
          width: 68rpx;
          height: 69rpx;
        }

        text {
          font-size: 31rpx;
          font-weight: bold;
          color: #333333;
          opacity: 0.9;
          margin-left: 10px;
        }
      }

      .orde-details {
        padding: 38rpx;

        .order-item {
          margin-top: 32rpx;
          display: flex;
          view:first-child {
            width: 140rpx;
            font-size: 26rpx;
            color: #999999;
            flex-shrink: 0;
          }

          view:last-child {
            font-size: 26rpx;
            color: #000000;
          }
        }
      }
      .product-price {
        margin-top: 32rpx;
        display: flex;
        align-items: flex-start;
        .label {
          width: 140rpx;
          font-size: 26rpx;
          color: #999999;
        }
        .product-wrapper {
          font-size: 26rpx;
          color: #000000;
        }
      }
      .details-footer {
        display: flex;
        justify-content: flex-end;
        margin-right: 40rpx;
        margin-top: 8rpx;
        height: 66rpx;

        view:first-child {
          font-size: 26rpx;
          font-weight: 500;
          color: #333333;
          margin-right: 15rpx;
          line-height: 78rpx;
        }

        view:last-child {
          font-size: 33rpx;
          font-weight: 500;
          color: #ff471f;
          line-height: 66rpx;

          text {
            font-size: 51rpx;
            font-weight: 500;
            color: #ff471f;
            line-height: 66rpx;
          }
        }
      }
    }

    .btns {
      position: relative;
      // position: fixed;
      // bottom: 105rpx;
      margin: 45rpx;
      // left: 0;
      // right: 0;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .btn {
        display: inline;
        margin: 20rpx;

        button {
          font-size: 29rpx;
          color: #ffffff;
          background: #07c160;
          border-radius: 6rpx;
          line-height: 88rpx;
        }
        .btn1 {
          background: #ffc300 !important;
        }
        .btn3 {
          background: #10aeff;
        }
      }
    }
  }
}

.template-cover {
  width: 100rpx;
  height: 100rpx;
}
.word-content {
  height: 200rpx;
  overflow: scroll;
  // text-overflow: ellipsis;
  // white-space: nowrap;
  word-break: break-all;
}
</style>
