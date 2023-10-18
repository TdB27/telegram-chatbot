<script setup>
import Filtro from "./Filtro.vue";

import { computed, ref, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const bot = computed(() => store.state.bot);
const user = computed(() => store.state.user);

let usersBot = [];
let listUsers = ref([]);

watch(bot, (value) => {
  if (value.id) {
    usersBot = value.users.map((item) => {
      item.time = item.messages[item.messages.length - 1].time;
      return item;
    });

    listUsers = ref([...usersBot]);
  }
});

function search(event) {
  listUsers.value = usersBot.filter((item) => {
    let name = item.name.toLowerCase();
    let eventName = event.toLowerCase();

    return name.includes(eventName);
  });
}

const selectUserBot = (user) => store.dispatch("selectUserBot", { ...user });
</script>

<template>
  <aside id="sidebar">
    <div
      v-if="!user.key_bot || !bot.id"
      class="d-flex justify-content-center p-3">
      <div class="content">
        <div class="name">Esse usuário não tem BOT</div>
      </div>
    </div>
    <div v-else>
      <div class="d-flex align-items-center p-3">
        <div class="img"></div>
        <div class="content">
          <div class="name">{{ bot.username }}</div>
        </div>
      </div>

      <Filtro @search="search" />

      <ul v-if="listUsers.length">
        <li
          class="p-3"
          v-for="u in listUsers"
          :key="u.chat_id"
          @click="selectUserBot(u)">
          <div class="img"></div>
          <div class="content">
            <div class="name">{{ u.name }}</div>
            <div class="time">{{ u.time }}</div>
          </div>
        </li>
      </ul>
      <p class="text-center" v-else>Não há registros nessa pesquisa</p>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
#sidebar {
  border-right: 1px solid var(--gray-border);
  max-height: calc(100vh - 72px);
  min-height: calc(100vh - 72px);
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
