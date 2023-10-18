<script setup>
import Sidebar from "./sidebar/SideBar.vue";
import Content from "./content/Content.vue";

import { useStore } from "vuex";
import { baseApiUrl } from "../../global";
import { defaultSuccess, defaultError } from "../../config/msgs";
import axios from "axios";

const store = useStore();

function getChat() {
  axios
    .get(`${baseApiUrl}/api/telegram/${store.state.user.key_bot}`)
    .then((resp) => {
      store.dispatch("setUserBotFromApi", { ...resp.data });
    })
    .catch((err) => {
      defaultError(err.response.data);
    });
}

getChat();

const ioClient = io.connect(baseApiUrl, { withCredentials: false });

ioClient.on("connect", (msg) => {
  console.log("connected!", ioClient.id);
  store.dispatch("setSocketIo", { socketId: ioClient.id });
});

ioClient.on("updateChat", (value) => {
  store.dispatch("updateMessageUser", value);
});
</script>

<template>
  <div class="card">
    <div id="chat-layout">
      <Sidebar class="col-4" />
      <Content class="col-8" />
    </div>
  </div>
</template>

<style scoped>
#chat-layout {
  display: flex;
  box-shadow: 0 4px 6px 0 rgba(85, 85, 85, 0.08),
    0 1px 20px 0 rgba(0, 0, 0, 0.07), 0px 1px 11px 0px rgba(0, 0, 0, 0.07);
}
</style>
