<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";

import { baseApiUrl, userKey } from "../../global";
import { defaultSuccess, defaultError } from "../../config/msgs";

const store = useStore();
const router = useRouter();

const form = ref({});

function signin() {
  axios
    .post(`${baseApiUrl}/signin`, form.value)
    .then((resp) => {
      store.dispatch("setUser", { ...resp.data });
      store.dispatch("selectUserBot", {});
      localStorage.setItem(userKey, JSON.stringify(resp.data));

      router.push({ path: "/chat" });
    })
    .catch((err) => defaultError(err.response.data));
}

onMounted(() => {
  document.querySelector("body").style.background =
    "url('./assets/img/bg-chat.png')";
});

onUnmounted(() => {
  document.querySelector("body").removeAttribute("style");
});
</script>

<template>
  <div id="auth">
    <div class="auth-card">
      <div class="img">
        <img src="../../assets/img/chatbot_logo.png" alt="chatbot_logo" />
      </div>
      <div class="form-group mb-4">
        <label for="name">Email</label>
        <input type="text" v-model="form.email" class="form-control" />
      </div>
      <div class="form-group mb-4">
        <label for="name">Senha</label>
        <input
          type="password"
          @keyup.enter="signin"
          v-model="form.password"
          class="form-control" />
      </div>
      <div class="d-flex justify-content-center">
        <button type="button" @click="signin" class="btn btn-primary">
          Entrar
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#auth {
  max-width: 500px;
  margin: 5rem auto;

  background: linear-gradient(
    180deg,
    #fff 0%,
    rgba(255, 255, 255, 0.9) 50%,
    rgba(255, 255, 255, 0.7) 90%,
    rgba(255, 255, 255, 0.5) 100%
  );

  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(9.5px);
  -webkit-backdrop-filter: blur(9.5px);

  border: 2px solid #fff;
  border-radius: 10px;

  opacity: 0.9;
  transition: opacity 0.3s;

  .img {
    margin: 0 auto 1rem;
    width: 250px;

    img {
      width: 100%;
    }
  }

  .auth-card {
    padding: 1.5rem;
  }

  label {
    color: #000;
    margin-bottom: 0.5rem;
  }

  .form-control {
    border: 0.5px solid #000;
  }

  &:hover {
    opacity: 1;
  }
}
</style>
