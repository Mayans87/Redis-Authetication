<template lang="">
  <div class="mt-52">
    <form class="max-w-sm mx-auto bg-teal-300 rounded-md p-5">
      <div class="mb-5">
        <h2 class="text-center font-extrabold text-blue-800">Login Form</h2>
        <label
          for="username"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Your Username</label
        >
        <input
          v-model="username"
          type="text"
          id="user"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Welcome"
          required
        />
      </div>
      <div class="mb-5">
        <label
          for="password"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Your password</label
        >
        <input
          v-model="password"
          type="password"
          id="pass"
          placeholder="Password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div class="flex items-start mb-5">
        <div class="flex items-center h-5">
          <input
            id="remember"
            type="checkbox"
            value=""
            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            required
          />
        </div>
        <label
          for="remember"
          class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >Remember me</label
        >
      </div>
      <button
        @click.prevent="Loginhandler"
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Login
      </button>
      <button
        @click.prevent="SignUpHandler"
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-5"
      >
        New? SignUp!
      </button>
    </form>
  </div>
</template>
<script>
import { authstore } from "../stores/authstore";
export default {
  data() {
    return {
      username: "",
      password: "",
      successToast: false,
      store: authstore(),
    };
  },
  methods: {
    setToken(token) {
      this.store.setToken(token);
    },
    async Loginhandler() {
      console.log("login button clicked!");

      const userDetails = { username: this.username, password: this.password };
      console.log(JSON.stringify(userDetails));

      try {
        const response = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userDetails),
        });

        if (!response.ok) {
          // Handle non-OK response here if needed
          console.error("Login failed");
          return;
        }

        const data = await response.json();
        console.log(data.token);

        this.store.$patch({ showLoginToast: true });
        this.store.setToken(data.token);

        console.log("Welcome!");
        console.log(this.store.$state.showLoginToast);
        console.log(this.store.$state.token);
      } catch (error) {
        console.error("Error during login:", error);
        // Handle error here if needed
      }
    },
    SignUpHandler() {
      this.$router.push({ name: "signup" });
    },
  },
};
</script>
<style lang=""></style>
