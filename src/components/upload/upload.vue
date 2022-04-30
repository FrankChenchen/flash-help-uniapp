<template>
  <view class="uploader">
    <view class="file" v-for="(file, index) in files" :key="index">
      <image mode="aspectFill" class="cover" :src="file.path"></image>
      <template v-if="!disable">
        <uni-icons
          class="icon"
          type="closeempty"
          size="20"
          @click="removeFile(index)"
        ></uni-icons>
      </template>
    </view>
    <image
      v-if="!disable"
      @click="chooseFile"
      class="upload-image"
      src="@/static/icons/plus-black.png"
      mode="widthFix"
    ></image>
  </view>
</template>
<script lang="ts">
import { uploadFile } from "@/api/common";
import { MyFile } from "@/typings";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      files: [] as MyFile[],
    };
  },
  props: {
    disable: {
      type: Boolean,
      default: false,
    },
    limit: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    chooseFile() {
      console.log("选择文件");
      let resLimit = this.limit - this.files.length;
      if (resLimit == 0) {
        return;
      }
      uni.chooseImage({
        count: resLimit,
        success: (result) => {
          let tempFiles = result.tempFilePaths as string[];
          tempFiles.forEach((path) => {
            let name = path.replace("//", "/").split("/").pop() as string;
            this.files.push({
              name,
              path: path,
              status: "ready",
            });
          });
          this.upload();
        },
      });
    },
    async upload() {
      let unUploadFiles = this.files.filter(
        (value) => !value.path.startsWith("https")
      );

      for (let index = 0; index < unUploadFiles.length; index++) {
        let file = unUploadFiles[index];
        file.status = "uploading";
        let res: any = await uploadFile(file.path);
        file.status = "finish";
        file.path = res.data[0];
      }
    },
    removeFile(index: number) {
      this.files.splice(index, 1);
    },
    getUploadFiles() {
      return this.files.filter((value) => value.path.startsWith("https"));
    },
    setFiles(filesArr: MyFile[]) {
      this.files = filesArr;
    },
    downLoadFile(file: MyFile) {
      let image = ["bmp", "jpg", "jpeg", "png", "gif"];
      let document = ["doc", "xls", "ppt", "pdf", "docx", "xlsx", "pptx"];
      let postFix = file.name.split(".").pop() as string;
      postFix = postFix.toLowerCase();
      if (image.includes(postFix)) {
        uni.previewImage({ urls: [file.path] });
      } else if (document.includes(postFix)) {
        uni.downloadFile({
          url: file.path,
          success: (res) => {
            uni.openDocument({ filePath: res.tempFilePath });
          },
        });
      } else {
        uni.downloadFile({
          url: file.path,
          success: (res) => {
            uni.saveFile({
              tempFilePath: res.tempFilePath,
              success: (res) => {
                uni.showModal({
                  title: "文件已保存到",
                  content: res.savedFilePath,
                });
              },
            });
          },
        });
      }
    },
  },
});
</script>
<style lang="scss" scoped>
@keyframes spin {
  100% {
    transform: rotate(-360deg);
  }
}

.uploader {
  display: flex;
  flex-wrap: wrap;
  .file {
    position: relative;
    margin-right: 30rpx;
    .cover {
      height: 100rpx;
      width: 100rpx;
      border-radius: 15rpx;
    }
    .icon {
      position: absolute;
      top: 0;
      right: 0;
    }
  }

  .upload-image {
    width: 100rpx;
    border-radius: 15rpx;
    opacity: 0.3;
    border: rgba($color: #000000, $alpha: 0.2) 1rpx solid;
  }
}
.upload-bottom {
  display: flex;
  justify-content: space-between;
  .left-pic {
    margin-left: 20rpx;
  }
}
</style>
