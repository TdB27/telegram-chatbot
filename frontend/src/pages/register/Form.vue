<script setup>
import { ref, onMounted, defineEmits } from "vue";
import { Modal } from "bootstrap";
import axios from "axios";

let modal = ref({});
const form = ref({});
const emit = defineEmits(["store"]);

defineExpose({ modal, form });

onMounted(() => {
  modal.value = new Modal(document.getElementById("modal-user"), {});
});

const store = () => emit("store", form);
</script>

<template>
  <div class="modal fade" id="modal-user" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Cadastro de Usuário</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Fechar"></button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="name">Nome</label>
            <input type="text" v-model="form.name" class="form-control" />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" v-model="form.email" class="form-control" />
          </div>
          <div class="form-group">
            <label for="password">Senha</label>
            <input
              type="password"
              v-model="form.password"
              class="form-control" />
          </div>
          <div class="form-group">
            <label for="key_bot">Chave do Bot Telegram</label>
            <input type="text" v-model="form.key_bot" class="form-control" />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" @click="store" class="btn btn-success">
            Salvar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
