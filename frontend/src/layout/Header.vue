<script setup>
import DropdownUser from "./DropdownUser.vue";
</script>

<template>
  <header>
    <ul class="d-flex">
      <li>
        <a href="#">
          <i class="bi bi-arrow-right"></i>
          Chat
        </a>
      </li>
      <li>
        <a href="#">
          <i class="bi bi-arrow-right"></i>
          Cadastro
        </a>
      </li>
    </ul>
    <DropdownUser />
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

li {
  padding: 1rem 0.5rem;

  a {
    cursor: pointer;
    text-decoration: none;
    color: var(--color-default);
    border-bottom: 0px solid var(--blue-color);

    &:hover {
      color: var(--blue-color);
      font-weight: 500;
      border-bottom-width: 1px;
    }
  }
}
</style>
