import { createStore } from "vuex";

export default createStore({
  state: {
    user: {},
    botUser: {},
    bot: {},
    // modelo de  messagens dentro de users do bot
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
  },
});
