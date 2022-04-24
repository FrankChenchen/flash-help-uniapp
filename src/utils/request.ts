import { R } from "../typings";

const baseUrl = import.meta.env.VITE_BASE_URL;
const requestWithToken = (
  url: string,
  method:
    | "OPTIONS"
    | "GET"
    | "HEAD"
    | "POST"
    | "PUT"
    | "DELETE"
    | "TRACE"
    | "CONNECT",
  data: any
): Promise<any> => {
  let promise = new Promise((resolve, reject) => {
    let toekn = uni.getStorageSync("token");

    uni.request({
      url: baseUrl + url,
      method: method,
      data: data,
      header: {
        jctoken: toekn,
      },
      dataType: "json",
      success: (result) => {
        let data = result.data as R;
        if (data.code == 500) {
          uni.showToast({
            title: data.msg,
            icon: "none",
          });
        } else if (data.code === 403) {
          uni.navigateTo({ url: "/pages/login/login" });
        } else {
          resolve(data.data);
        }
      },
      fail: (res: any) => {
        reject(res);
      },
    });
  });
  return promise;
};
export default requestWithToken;
