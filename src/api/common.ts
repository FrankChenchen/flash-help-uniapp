const baseUrl = import.meta.env.VITE_BASE_URL;

export const uploadFile = (filePath: any) => {
  let promise = new Promise((resolve, reject) => {
    console.log(filePath);
    uni.uploadFile({
      url: baseUrl + "/help/upload",
      header: {
        jctoken: uni.getStorageSync("token"),
      },
      name: "name",
      filePath: filePath,
      success: (res) => {
        console.log(res);
        resolve(JSON.parse(res.data));
      },
      fail: (result) => {
        console.log(result);
        reject(result);
      },
    });
  });
  return promise;
};
