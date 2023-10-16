<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps(["users"]);
const emit = defineEmits(["openForm", "destroy"]);

const openForm = (user) => emit("openForm", user);
const destroy = (user_id) => emit("destroy", user_id);
</script>

<template>
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
        <tr v-for="u in users" :key="u.id">
          <td>{{ u.name }}</td>
          <td>{{ u.email }}</td>
          <td class="d-flex flex-nowrap justify-content-center">
            <button @click="openForm(u)" class="btn btn-sm btn-warning me-2">
              <i class="bi bi-pen"></i>
            </button>
            <button @click="destroy(u.id)" class="btn btn-sm btn-danger">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
