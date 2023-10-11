<script setup></script>

<template>
  <div class="search p-3">
    <div class="input-group">
      <span class="input-group-text">
        <i class="bi bi-search"></i>
      </span>
      <input type="text" class="form-control" placeholder="Pesquisar" />
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
