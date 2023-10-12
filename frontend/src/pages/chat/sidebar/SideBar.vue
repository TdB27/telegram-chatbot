<script setup>
import Filtro from "./Filtro.vue";
import { reactive, computed } from "vue";

import { useStore } from "vuex";

const store = useStore();
const bot = reactive(store.state.bot);

const users = bot.users.map((item) => {
  item.time = item.messages[item.messages.length - 1].time;
  return item;
});

const selectUser = (user) => store.dispatch("selectUser", { ...user });
</script>

<template>
  <aside id="sidebar">
    <div class="d-flex align-items-center p-3">
      <div class="img"></div>
      <div class="content">
        <div class="name">{{ bot.name }}</div>
      </div>
    </div>

    <Filtro />

    <ul>
      <li class="p-3" v-for="u in users" :key="u.id" @click="selectUser(u)">
        <div class="img"></div>
        <div class="content">
          <div class="name">{{ u.name }}</div>
          <div class="time">{{ u.time }}</div>
        </div>
      </li>
    </ul>
  </aside>
</template>

<style lang="scss" scoped>
#sidebar {
  border-right: 1px solid var(--gray-border);
  max-height: calc(100vh - 24px);
  min-height: calc(100vh - 24px);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    background-color: var(--gray-bg-2);
  }
}

li {
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 14px;

  &:not(:last-child) {
    border-bottom: 1px solid var(--gray-border);
  }

  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;

    .name {
      font-weight: 500;
    }

    .time {
      font-size: 12px;
      color: var(--gray-color);
      font-weight: 700;
    }
  }

  &:hover {
    background-color: rgb(0, 0, 255, 0.35);
    border-radius: 1rem;
    border-bottom: none;
  }
}

.img {
  width: 40px;
  height: 40px;
  border-radius: 50px;
  background-color: var(--gray-bg-1);

  margin-right: 12px;
}
</style>
