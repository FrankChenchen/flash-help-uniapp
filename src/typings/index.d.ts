export type User = {
  id: number;
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
export type R = {
  code: number;
  msg: string;
  data: any;
};
