
// Websocket地址，仅为测试地址，请替换成自己的后台地址
// export const wsUrl = 'wss://www.jarcheng.top/flash-api/chat/websocket'
export const wsUrl = import.meta.env.VITE_BASE_SOCKET;

/**
 * 模拟请求刷新token，并缓存到localStorage
 */
export function refreshToken() {
    return uni.getStorageSync("token")
}