import { defineStore } from "pinia";

export const authstore = defineStore("authstore", {
  state: () => {
    return {
      showLoginToast: false,
      token: null,
    };
  },

  actions: {
    setToken(token) { this.token = token},
  },
});
