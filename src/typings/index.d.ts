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
  status: number;
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
