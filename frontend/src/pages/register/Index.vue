<script setup>
import { ref } from "vue";
import Form from "./Form.vue";

const Modal = ref(null);

function openForm(usuario = {}) {
  Modal.value.form = { ...usuario };
  Modal.value.modal.show();
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
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Email</th>
              <th class="col-2 text-center">Ação</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Thiago</td>
              <td>thiago@gmail.com</td>
              <td class="d-flex flex-nowrap justify-content-center">
                <button class="btn btn-sm btn-warning me-2">
                  <i class="bi bi-pen"></i>
                </button>
                <button class="btn btn-sm btn-danger">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <Form ref="Modal" />
  </div>
</template>
