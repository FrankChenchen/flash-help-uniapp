<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="scss">
:deep(.uni-easyinput__content-input) {
  font-size: 30rpx;
}
:deep(.uni-easyinput__content-textarea) {
  font-size: 30rpx !important;
}
</style>
