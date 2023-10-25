<script setup>
import Sidebar from "./sidebar/SideBar.vue";
import Content from "./content/Content.vue";

import { onUnmounted, ref } from "vue";
import { useStore } from "vuex";
import { baseApiUrl } from "../../global";
import { defaultSuccess, defaultError } from "../../config/msgs";
import axios from "axios";

const store = useStore();

const hasChat = ref(false);
const setInterv = ref({ hasInterv: false });

// Buscar todas as mensagens salvas no DB quando renderiza o componente
function getChat() {
  axios
    .get(`${baseApiUrl}/api/telegram/${store.state.user.key_bot}`)
    .then((resp) => {
      hasChat.value = true;
      store.dispatch("setBotUserFromApi", { ...resp.data });
    })
    .catch((err) => {
      defaultError(err.response.data);
    });
}

function getNewMessages() {
  axios
    .get(
      `${baseApiUrl}/api/telegram/get-new-messages/${store.state.user.key_bot}`
    )
    .then((resp) => {
      // Buscar todas as novas mensagens salvas no DB e atualiza-las no front
      if (resp.data.length) store.dispatch("updateMessageUser", resp.data);
    })
    .catch((err) => {
      clearInterval(setInterv.value.interv);
      defaultError(err.response.data);
    });
}

getChat();

watch(hasChat, () => {
  if (hasChat.value) {
    // Estamos usando o setInterval para buscas as novas mensagens de 2 em 2 seg, mas futuramente alteraremos para salvar as mensagens usando WebHook
    setInterv.value = {
      hasInterv: true,
      interv: setInterval(() => getNewMessages(), 2000),
    };
  }
});

onUnmounted(() => {
  // Remover o setInterval quando o componente for desmontando
  if (setInterv.value.hasInterv) clearInterval(setInterv.value.interv);
});

// Conexão com o Backend em tempo real usando o socket io client
const ioClient = io.connect(baseApiUrl, { withCredentials: false });

ioClient.on("connect", (msg) => {
  // console.log("connected!", ioClient.id);
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
