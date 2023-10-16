<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import { userKey } from "../global";

const store = useStore();
const router = useRouter();

const user = computed(() => store.state.user);

function logout() {
  localStorage.removeItem(userKey);
  store.dispatch("setUser", {});
  router.push({ name: "auth" });
}
</script>

<template>
  <div class="user-dropdown">
    <div class="user-button">
      <span class="d-none d-sm-block">
        <i class="bi bi-person-circle"></i>
        {{ user?.name }}
      </span>
      <i class="fa fa-angle-down"></i>
    </div>
    <div class="user-dropdown-content">
      <a href @click.prevent="logout">
        <i class="fa fa-sign-out"></i>
        Sair
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-dropdown {
  position: relative;
  height: 100%;

  .user-button {
    display: flex;
    align-items: center;
    color: var(--color-default);
    font-weight: 500;
    height: 100%;
    padding: 0px 20px;

    cursor: pointer;

    &:hover {
      border-bottom: 1px solid var(--blue-color);
    }
  }

  .user-dropdown-content {
    position: absolute;
    right: 0px;
    background-color: #f9f9f9;
    min-width: 170px;
    border-radius: 8px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    padding: 10px;
    z-index: 1;

    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.2s linear;

    a {
      text-decoration: none;
      color: #000;
      padding: 10px;

      &:hover {
        text-decoration: none;
        color: #000;
        background-color: var(--blue-color-2);
        border-radius: 8px;
      }
    }
  }

  &:hover .user-dropdown-content {
    visibility: visible;
    opacity: 1;
  }
}
</style>
