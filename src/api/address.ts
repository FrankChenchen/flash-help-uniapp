import { Address, BaseSearch } from "@/typings";
import requestWithToken from "@/utils/request";

export const listAddress = (search: BaseSearch) => {
  return requestWithToken("/help/address/list", "GET", search);
};
export const deleteAddress = (id: string) => {
  return requestWithToken("/help/address/delete", "GET", { id });
};
export const saveAddress = (data: Address) => {
  return requestWithToken("/help/address/save", "POST", data);
};
export const getAddress = (id: string) => {
  return requestWithToken("/help/address/get", "GET", { id });
};
