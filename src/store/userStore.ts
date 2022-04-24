import { getUserInfo } from '@/api/user';
import { User } from '@/typings';
import { defineStore } from 'pinia';
export const userStore = defineStore('main', {
  state: () => {
    return {
      userInfo: {nickname:"匿名用户"} as User,
    };
  },
  actions: {
    async getUserInfo(): Promise<User> {
      if (this.userInfo.id) {
        return this.userInfo;
      } else {
        let user = await getUserInfo();
        this.setUserInfo(user);
        return user;
      }
    },
    setUserInfo(userInfo: User) {
      this.userInfo = userInfo;
    },
  },
});
