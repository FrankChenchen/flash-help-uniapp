import { Task, BaseSearch } from "@/typings";
import requestWithToken from "@/utils/request";

export const listTask = (search: BaseSearch) => {
  return requestWithToken("/help/task/list", "GET", search);
};
export const deleteTask = (id: string) => {
  return requestWithToken("/help/task/delete", "GET", { id });
};
export const saveTask = (data: Task) => {
  return requestWithToken("/help/task/save", "POST", data);
};
export const getTask = (id: string) => {
  return requestWithToken("/help/task/get", "GET", { id });
};
