<script setup>
import { watch, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

import Content from "./layout/Content.vue";
import Header from "./layout/Header.vue";
import Chat from "./pages/chat/Index.vue";

import { userKey } from "./global";

const route = useRoute();
const router = useRouter();
const isAuth = ref(false);

const store = useStore();
const userStore = computed(() => store.state.user);

watch(route, (value) => {
  let { path } = value;

  isAuth.value = path === "/auth" ? true : false;

  const user = localStorage.getItem(userKey);

  if (user === null) {
    router.push({ path: "/auth" });
  } else {
    const json = JSON.parse(user);

    if (!userStore.value.id) {
      store.dispatch("setUser", { ...json });
    }

    if (path === "/auth") router.push({ path: "/chat" });
  }
});
</script>

<template>
  <div class="container-xl">
    <Header v-if="!isAuth" />
    <Content />
  </div>
</template>
