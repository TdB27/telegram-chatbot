<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import axios from "axios";

import Form from "./Form.vue";
import Table from "./Table.vue";

import { defaultSuccess, defaultError } from "../../config/msgs";
import { baseApiUrl } from "../../global";

onMounted(() => {
  get();
});

const Modal = ref(null);

const storeV = useStore();
const user = computed(() => storeV.state.user);

function openForm(usuario = {}) {
  Modal.value.form = { ...usuario };
  Modal.value.modal.show();
}

let users = ref([]);
async function get() {
  await axios
    .get(`${baseApiUrl}/users/${user.value.id}`)
    .then((res) => {
      users.value = res.data;
    })
    .catch((err) => defaultError(err.response));
}

async function store(event) {
  const { value } = event;

  await axios
    .post(`${baseApiUrl}/users`, value)
    .then((resp) => {
      defaultSuccess(resp.data);
      get();
      Modal.value.modal.hide();
    })
    .catch((err) => defaultError(err.response.data));
}

async function destroy(id) {
  await axios
    .delete(`${baseApiUrl}/user/${id}`)
    .then((resp) => {
      defaultSuccess(resp.data);
      get();
    })
    .catch((err) => defaultError(err.response.data));
}
</script>

<template>
  <div class="card m-auto col-12 col-md-10 col-xl-8">
    <div class="card-header d-flex align-items-center justify-content-between">
      <h5 class="card-title mb-0">Lista de Usuários</h5>
      <div class="card-tools">
        <button type="button" class="btn btn-primary" @click="openForm()">
          Novo
        </button>
      </div>
    </div>
    <div class="card-body">
      <Table :users="users" @openForm="openForm" @destroy="destroy" />
    </div>

    <Form ref="Modal" @store="store" />
  </div>
</template>
