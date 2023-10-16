<script setup>
import { useRoute } from "vue-router";
import { watch, ref } from "vue";

import Content from "./layout/Content.vue";
import Header from "./layout/Header.vue";
import Chat from "./pages/chat/Index.vue";

const route = useRoute();
const isAuth = ref(false);

watch(route, (value) => {
  isAuth.value = value.path == "/auth" ? true : false;
});
</script>

<template>
  <div class="container-xl">
    <Header v-if="!isAuth" />
    <Content />
  </div>
</template>
