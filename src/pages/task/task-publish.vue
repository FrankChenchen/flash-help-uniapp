<template>
  <view class="main">
    <view class="top">
      <view>
        <button plain="true" class="submit" @click="publish">发布</button>
      </view>
    </view>
    <view class="center">
      <uni-easyinput
        class="input"
        type="textarea"
        autoHeight
        :inputBorder="false"
        v-model="details.content"
        placeholder="请输入详细内容"
      ></uni-easyinput>
      <Upload :limit="6" ref="upload"></Upload>
      <view class="address">
        <uni-icons type="location" size="20"></uni-icons>
        <view
          class="address-details"
          @click="switchPage('/pages/address/address-list?type=task')"
          >{{ address?.id ? address.address : "请选择地址" }}</view
        >
        <uni-icons class="right-arrow" type="right" size="20"></uni-icons>
      </view>
    </view>
    <view class="bottom">
      <input
        :inputBorder="false"
        type="digit"
        :styles="{ color: 'red' }"
        :maxlength="10"
        v-model="task.price"
        class="priceInput"
      />
      <view class="left">
        <image src="@/static/icons/price.png" mode="widthFix"></image>
        <view class="label">价格</view>
      </view>
      <view class="right">
        <view class="price">￥{{ task.price }}</view>
        <uni-icons class="right-arrow" type="right" size="20"></uni-icons>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { saveTask } from "@/api/task";
import { Address, MyFile, Task } from "@/typings";
import { reactive, ref } from "vue";
import Upload from "@/components/upload/upload.vue";

let details = reactive({ content: "", imgs: [] as MyFile[] });
let task = reactive({ details: "", addressId: "", price: 0 } as Task);
let address = ref<Address>();
let upload = ref<InstanceType<typeof Upload>>();
const switchPage = (url: string) => {
  uni.navigateTo({
    url: url,
    events: {
      addressSelect: (res: Address) => {
        address.value = res;
      },
    },
  });
};
const publish = () => {
  if (!address.value) {
    uni.showToast({ title: "请选择地址", icon: "error" });
    return;
  }
  task.addressId = address.value?.id;
  let imgs = upload.value?.getUploadFiles() as MyFile[];
  details.imgs = imgs;
  task.details = JSON.stringify(details);
  saveTask(task).then((res) => {
    if (res == true) {
      uni.showToast({ title: "发布成功", icon: "success" });
      setTimeout(() => {
        uni.navigateBack({});
      }, 1000);
    }
  });
};
</script>
<style lang="scss" scoped>
.main {
  padding: 32rpx;
  .top {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    .submit {
      font-size: 24rpx;
      color: rgba($color: #000000, $alpha: 0.7);
      width: 120rpx;
      border: 0;
      background-color: rgba($color: $uni-theme-color, $alpha: 1);
    }
  }
  .center {
    padding: 30rpx 0;
    border-bottom: rgba($color: #000000, $alpha: 0.05) solid 1rpx;
    .upload-image {
      width: 100rpx;
      border-radius: 15rpx;
      opacity: 0.3;
      border: rgba($color: #000000, $alpha: 0.2) 1rpx solid;
    }
    .address {
      display: flex;
      align-items: center;
      padding: 20rpx 0;
      .address-details {
        margin: 0 20rpx;
        font-size: 30rpx;
        color: rgba($color: #000000, $alpha: 0.5);
      }
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx 0;
    font-size: 30rpx;

    .left {
      display: flex;
      align-items: center;
      color: rgba($color: #000000, $alpha: 0.5);
      image {
        margin-right: 20rpx;
        width: 30rpx;
      }
    }
    .right {
      display: flex;
      align-items: center;
      .price {
        color: rgba($color: #ff0000, $alpha: 1);
        margin-right: 20rpx;
      }
    }
  }
}
.priceInput {
  position: absolute;
  left: -400rpx;
  width: 1000rpx;
}
.right-arrow {
  opacity: 0.5;
}
</style>
