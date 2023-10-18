import { createStore } from "vuex";

export default createStore({
  state: {
    user: {},
    botUser: {},
    bot: {},
    // modelo de  mensagens dentro de users do bot
    // messages: [
    //   {
    //     type: "user",
    //     text: "texto do usuario",
    //     time: "12:07",
    //   },
    //   {
    //     type: "bot",
    //     text: "texto do bot",
    //     time: "12:09",
    //   },
    // ],
    socket: {},
  },

  mutations: {
    selectUserBot(state, payload) {
      state.botUser = { ...payload };
    },

    setUser(state, payload) {
      state.user = { ...payload };
    },

    setUserBotFromApi(state, payload) {
      state.bot = { ...payload };
    },

    setSocketIo(state, payload) {
      state.socket = { ...payload };
    },

    updateMessageUser(state, payload) {
      const index = state.bot.users.findIndex(
        (item) => item.chat_id === payload.chatId
      );

      state.bot.users[index].messages.push({
        text: payload.msg,
        type: "bot",
      });
    },
  },

  actions: {
    selectUserBot({ commit }, payload) {
      commit("selectUserBot", { ...payload });
    },

    setUser({ commit }, payload) {
      commit("setUser", { ...payload });
    },

    setUserBotFromApi({ commit }, payload) {
      commit("setUserBotFromApi", { ...payload });
    },

    setSocketIo({ commit }, payload) {
      commit("setSocketIo", { ...payload });
    },

    updateMessageUser({ commit }, payload) {
      commit("updateMessageUser", { ...payload });
    },
  },
});
