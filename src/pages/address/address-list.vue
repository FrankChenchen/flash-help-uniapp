<template>
  <view class="main">
    <view
      class="address-row"
      v-for="(address, index) in addresses"
      :key="index"
    >
      <view class="address-header" @click="goback(address)">
        <text class="user-info">{{
          address.name + " " + address.phoneNumber
        }}</text>
        <text class="address-info">{{ address.address }}</text>
      </view>
      <view class="address-footer">
        <view class="footer-right">
          <view
            class="edit-address"
            @click="switchPage('/pages/address/address-edit?id=' + address.id)"
          >
            <uni-icons size="20" type="compose"></uni-icons>
            <text class="text">编辑</text>
          </view>
          <view class="delete-address" @click="deleteAdd(address.id)">
            <uni-icons size="20" type="trash"></uni-icons>
            <text class="text">删除</text>
          </view>
        </view>
      </view>
    </view>
    <button
      @click="switchPage('/pages/address/address-add')"
      class="add-button"
    >
      新增
    </button>
  </view>
</template>

<script lang="ts">
import { deleteAddress, listAddress } from "@/api/address";
import { Address, BaseSearch } from "@/typings";
import { userStore } from "@/store/userStore";
import { toRefs, defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      isDefault: false,
      addresses: [] as Address[],
      // 是从哪个页面进来的
      type: "",
      searchVO: {
        pageNum: 1,
        pageSize: 10,
      } as BaseSearch,
      finish: false,
    };
  },
  setup() {
    let store = userStore();
    let { userInfo } = toRefs(store);
    return { userInfo };
  },
  onLoad(ops: any) {
    this.type = ops.type as string;
  },
  onShow() {
    this.searchVO.pageNum = 1;
    this.finish = false;
    this.loadAddress();
  },
  methods: {
    switchPage(value: string) {
      uni.navigateTo({
        url: value,
      });
    },
    loadAddress() {
      if (!this.finish) {
        listAddress(this.searchVO).then((res) => {
          if (res.pageSize > res.size) {
            this.finish = true;
          }
          this.searchVO.pageNum++;
          this.addresses.push(...res.list);
        });
      }
    },
    goback(address: Address) {
      // 从用户页面过来的
      if (this.type == "user") {
        return;
      }
      let that: any = this;
      const eventChannel = that.getOpenerEventChannel();
      eventChannel.emit("addressSelect", address);
      uni.navigateBack({});
    },
    deleteAdd(id: string) {
      deleteAddress(id).then((res) => {
        if (res == true) {
          uni.showToast({ icon: "success", title: "删除成功" });
          this.loadAddress();
        }
      });
    },
    onReachBottom() {
      this.loadAddress();
    },
  },
});
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  padding: 20rpx;
}
.address-row {
  border-radius: 8.83rpx;
  background-color: white;
  margin-top: 30rpx;
  display: flex;
  flex-direction: column;
  padding: 10rpx;
  .address-header {
    display: flex;
    flex-direction: column;
    padding: 20rpx;
    border-bottom: 1px solid #f3f3f3;

    .user-info {
      font-size: 35rpx;
      font-weight: bold;
    }

    .address-info {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-top: 10rpx;
      color: #7b7b7f;
    }
    .address-postcode {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-top: 10rpx;
      color: #7b7b7f;
    }
  }

  .address-footer {
    padding: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .footer-right {
      display: flex;

      .edit-address {
        padding-right: 10rpx;
      }

      .text {
        padding-left: 5rpx;
      }
    }
  }
}
.add-button {
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
</style>
<style lang="scss">
page {
  background-color: rgba($color: #000000, $alpha: 0.05);
}
</style>
