import { User } from "@/typings";
import requestWithToken from "@/utils/request";

export const getUserInfo = (): Promise<User> => {
  return requestWithToken("/account/user/user-info", "GET", {});
};
export const updateUserInfo = (user: User) => {
  return requestWithToken("/account/user/update", "POST", user);
};
export const getOthersInfo = (id: string): Promise<User> => {
  return requestWithToken("/account/user/others-info", "GET", { id });
};
