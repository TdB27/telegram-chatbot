<script setup>
import { reactive, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const botUser = computed(() => store.state.botUser);

const messages = reactive([
  {
    type: "user",
    text: "texto do usuario",
    time: "12:07",
  },
  {
    type: "bot",
    text: "texto do bot",
    time: "12:09",
  },
]);
</script>

<template>
  <section id="content">
    <header id="header" class="p-3" v-if="botUser.id">
      <div class="img"></div>
      <div class="name">{{ botUser.name }}</div>
    </header>
    <section id="main">
      <p
        class="message"
        :class="m.type == 'user' ? 'start' : 'end'"
        v-for="(m, key) in botUser.messages"
        :key="key">
        <span>
          {{ m.text }}
        </span>
        <span class="time"> {{ m.time }}</span>
      </p>
    </section>
    <section id="send-message" v-if="botUser.id">
      <input
        type="text"
        class="form-control"
        placeholder="Escreva sua mensagem aqui" />

      <button class="btn-send">
        <i class="bi bi-send"></i>
      </button>
    </section>
  </section>
</template>

<style lang="scss" scoped>
#content {
  overflow: hidden;
  max-height: calc(100vh - 24px);
  display: flex;
  flex-direction: column;
}

#header {
  display: flex;
  align-items: center;
  height: 70px;

  .img {
    width: 40px;
    height: 40px;
    border-radius: 20%;
    background-color: var(--gray-bg-1);

    margin-right: 12px;
  }

  .name {
    font-weight: 500;
  }
}

#main {
  background: url("./assets/img/bg-chat.png");
  flex: 1;
  width: 100%;
  padding: 1rem;

  overflow-y: scroll;

  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    background-color: var(--white-color);
  }

  .message {
    padding: 0.5rem;
    margin-bottom: 8px;
    border-radius: 8px;
    font-size: 12px;

    max-width: 55%;

    position: relative;

    .time {
      display: block;
      font-size: 10px;
      text-align: right;
    }

    &::after {
      position: absolute;
      top: 18px;
      display: block;
      width: 8px;
      height: 6px;
      content: "";
      -moz-transform: rotate(29deg) skew(-35deg);
      -ms-transform: rotate(29deg) skew(-35deg);
      -webkit-transform: rotate(29deg) skew(-35deg);
      transform: rotate(29deg) skew(-35deg);
    }

    &.start {
      align-self: start;
      background-color: var(--gray-white-color);
      color: var(--blue-color);

      &::after {
        left: -4px;
        background-color: var(--gray-white-color);
      }
    }

    &.end {
      align-self: end;
      background-color: var(--blue-color);
      color: var(--gray-white-color);

      &::after {
        right: -4px;
        background-color: var(--blue-color);
      }
    }
  }
}

#send-message {
  padding: 1rem;
  border-top: 1px solid var(--gray-color);
  display: flex;
  height: 70px;

  input {
    border: 1px dashed var(--gray-border);
    flex: 1;
    margin-right: 8px;

    &:focus {
      box-shadow: 1px 2px 5px 4px var(--gray-border);
    }
  }

  button.btn-send {
    padding: 8px 10px;
    border-radius: 50%;
    border: none;
    background-color: var(--blue-color);
    transition: all 0.3s;

    &:hover {
      background-color: rgb(48 70 173);
    }
  }
}
</style>
