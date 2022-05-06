export interface TaskOrder {
  id: string;
  orderId: string;
  demanderId: number;
  acceptorId: number;
  taskId: string;
  taskPrice: number;
  createTime: string;
  updateTime: string;
  deleted: boolean;
  baseOrder: BaseOrder;
  address: Address;
  demander: User;
  acceptor: User;
  task: Task;
}

export interface BaseOrder {
  id: string;
  discountPrice: number;
  finalPrice: number;
  originPrice: number;
  orderStatus: string;
  orderNo: string;
  paymentTime: string;
  paymentMethod: string;
  priceDetails: string;
  type: string;
  remark: string;
  logisticNo: string;
  serviceName: string;
  updateTime: string;
  createTime: string;
  deleted: boolean;
  taskOrder: TaskOrder;
}
export type User = {
  id: string;
  username: string;
  password: string;
  email: string;
  gender: string;
  phoneNumber: string;
  nickname: string;
  serviceName: string;
  avatar: string;
  updateTime: string;
  createTime: string;
  deleted: boolean;
};
export type Task = {
  id: string;
  title: string;
  details: string;
  detailsJson: TaskDetails;
  price: number;
  demanderId: string;
  addressId: string;
  accept: boolean;
  updateTime: string;
  createTime: string;
  deleted: boolean;
  user: User;
};
export type TaskDetails = {
  imgs: MyFile[];
  content: string;
};
export type Address = {
  id: string;
  name: string;
  address: string;
  userId: string;
  phoneNumber: string;
  createTime: string;
  updateTime: string;
  deleted: boolean;
};
export type R = {
  code: number;
  msg: string;
  data: any;
};
export type BaseSearch = {
  id: string;
  status: string;
  userId: number;
  pageNum: number;
  pageSize: number;
  startTime: string;
  endTime: string;
  keyword: string;
  type: string;
};
interface MyFile {
  name: string;
  path: string;
  status: "ready" | "uploading" | "finish";
}
export type PayParams = {
  /** 随机字符串，长度为32个字符以下 */
  nonceStr: string;
  /** 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=*** */
  package: string;
  /** 签名，具体见微信支付文档 */
  paySign: string;
  /** 时间戳，从 1970 年 1 月 1 日 00:00:00 至今的秒数，即当前的时间 */
  timeStamp: string;
  /** 签名算法，应与后台下单时的值一致
   *
   * 可选值：
   * - 'MD5': 仅在 v2 版本接口适用;
   * - 'HMAC-SHA256': 仅在 v2 版本接口适用;
   * - 'RSA': 仅在 v3 版本接口适用; */
  signType?: "MD5" | "HMAC-SHA256" | "RSA";
};
