import requestWithToken from "../utils/request";

export const wechatLogin = function () {
  console.log("微信登陆");

  uni.login({
    provider: "weixin",
    success: (res) => {
      let params = {
        code: res.code,
        serviceName: "flash-task",
      };
      requestWithToken("/security/auth?type=wechat", "POST", params).then(
        (res2) => {
          if (res2.tokenValue) {
            uni.setStorage({
              key: "token",
              data: res2.tokenValue,
              success: () => {
                setTimeout(() => {
                  uni.reLaunch({
                    url: "/pages/index/index",
                  });
                }, 1500);
              },
            });
          }
        }
      );
    },
  });
};
