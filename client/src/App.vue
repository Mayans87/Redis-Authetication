<script>
import { RouterLink, RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import successToast from "./components/successToast.vue";
import { authstore } from "./stores/authstore";
export default {
  components: {
    NavBar,
    successToast,
  },
  data() {
    return {
      store: authstore(),
    };
  },
};
</script>

<template>
  <main>
    <div v-if="this.store.$state.showLoginToast">
      <successToast />
    </div>
    <NavBar />
    <RouterView />
  </main>
</template>

<style scoped></style>
