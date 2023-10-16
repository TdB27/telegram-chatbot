<script setup>
import { ref } from "vue";
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
      localStorage.setItem(userKey, JSON.stringify(resp.data));

      router.push({ path: "/chat" });
    })
    .catch((err) => defaultError(err.response.data));
}
</script>

<template>
  <div id="auth">
    <div class="auth-card">
      <div class="form-group mb-4">
        <label for="name">Email</label>
        <input type="text" v-model="form.email" class="form-control" />
      </div>
      <div class="form-group mb-4">
        <label for="name">Senha</label>
        <input type="password" v-model="form.password" class="form-control" />
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
  margin: 5rem auto 0;
  background: url("./assets/img/bg-chat.png");
  border-radius: 8px;

  opacity: 0.7;
  transition: opacity 0.3s;

  .auth-card {
    padding: 1.5rem;
  }

  label {
    color: #fff;
  }

  &:hover {
    opacity: 1;
  }
}
</style>
