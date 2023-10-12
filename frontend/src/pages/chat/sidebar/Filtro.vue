<script setup>
import { defineEmits, ref } from "vue";

const emit = defineEmits(["search"]);
const search = ref("");

const sendEmit = () => emit("search", search.value);
</script>

<template>
  <div class="search p-3">
    <div class="input-group">
      <span class="input-group-text">
        <i class="bi bi-search"></i>
      </span>
      <input
        type="text"
        v-model="search"
        @input="sendEmit"
        class="form-control"
        placeholder="Pesquisar" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search {
  i {
    color: var(--gray-bg-2);
  }
}
</style>
