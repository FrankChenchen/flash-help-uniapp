import { BaseSearch } from "@/typings";
import requestWithToken from "@/utils/request";

export const listChatHistory = (baseSearch: BaseSearch) => {
  return requestWithToken("/chat/chat-history/list", "GET", baseSearch);
};
export const checkSession = (id: string) => {
  return requestWithToken("/chat/chat-session/check", "GET", { id });
};
export const listSession = (baseSearch: BaseSearch) => {
  return requestWithToken("/chat/chat-session/list", "GET", baseSearch);
};
export const getCheckNum=()=>{
    return requestWithToken("/chat/chat-session/check-num",'GET',{})
}
