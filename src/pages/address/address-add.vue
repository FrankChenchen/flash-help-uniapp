<template>
  <view class="main">
    <view class="form">
      <view class="row">
        <view class="label">联系人</view>
        <view class="input">
          <uni-easyinput
            :inputBorder="false"
            v-model="params.name"
            placeholder="请输入姓名"
          ></uni-easyinput>
        </view>
      </view>
      <view class="row">
        <view class="label">手机</view>
        <view class="input">
          <uni-easyinput
            :inputBorder="false"
            v-model="params.phoneNumber"
            placeholder="请输入手机号"
          ></uni-easyinput>
        </view>
      </view>
      <view class="row">
        <view class="label">地址</view>
        <view class="input">
          <uni-easyinput
            :inputBorder="false"
            v-model="params.address"
            placeholder="请输入详细地址"
          ></uni-easyinput>
        </view>
      </view>
    </view>
    <button class="submit" @click="submit">保存地址</button>
  </view>
</template>

<script lang="ts">
import { saveAddress } from "@/api/address";
import { Address } from "@/typings";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      params: {
        name: "",
        phoneNumber: "",
        address: "",
      } as Address,
    };
  },
  methods: {
    submit() {
      saveAddress(this.params).then((res) => {
        if (res == true) {
          uni.showToast({
            title: "添加成功",
          });
          setTimeout(() => {
            uni.navigateBack({});
          }, 1000);
        }
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.main {
  border-radius: 15rpx;
  margin: 0 20rpx;
  padding: 20rpx;
  .form {
    padding: 30rpx 20rpx;
    box-shadow: 5rpx 5rpx 5rpx 5rpx rgba($color: #000000, $alpha: 0.01);
    border-radius: 15rpx;
    .row {
      display: flex;
      align-items: center;
      padding: 10rpx;
      .label {
        width: 120rpx;
        font-size: 26rpx;
        color: rgba($color: #000000, $alpha: 0.9);
      }
      .input {
        width: 100%;
        border-bottom: rgba($color: #000000, $alpha: 0.05) 1rpx solid;
      }
    }
  }

  .submit {
    width: 400rpx;
    height: 70rpx;
    line-height: 70rpx;
    border-radius: 10rpx;
    margin-top: 50rpx;
    margin-bottom: 30rpx;
    border: 0;
    color: rgba($color: #000000, $alpha: 0.9);
    box-shadow: 10rpx 10rpx 15rpx rgb(245, 245, 245);
    background-color: $uni-theme-color;
  }
}
</style>
