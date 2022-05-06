import { BaseSearch, TaskOrder } from "@/typings";
import requestWithToken from "@/utils/request";

export const createOrder = (taskOrder: TaskOrder) => {
  return requestWithToken("/help/task-order/create", "POST", taskOrder);
};
export const payOrder = (id: string) => {
  return requestWithToken("/help/task-order/pay", "GET", { id });
};
export const confirmOrder = (id: string) => {
  return requestWithToken("/help/task-order/confirm", "GET", { id });
};
export const shipOrder = (id: string, logisticNo: string) => {
  return requestWithToken("/help/task-order/ship", "GET", { id, logisticNo });
};
export const cancelOrder = (id: string) => {
  return requestWithToken("/help/task-order/cancel", "GET", { id });
};

export const listOrderForDemander = (search: BaseSearch) => {
  return requestWithToken("/help/task-order/list-for-demander", "GET", search);
};
export const listOrderForAcceptor = (search: BaseSearch) => {
  return requestWithToken("/help/task-order/list-for-acceptor", "GET", search);
};
export const getOrderById = (id: string) => {
  return requestWithToken("/help/task-order/get-by-id", "GET", { id });
};
