import { defineStore } from "pinia";

export const tabbarStore = defineStore("tabbar", {
  state: () => {
    return {
      active: "首页",
    };
  },
  actions: {
    changeActive(name: string) {
      this.active = name;
    },
  },
});
