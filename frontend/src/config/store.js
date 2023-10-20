import { createStore } from "vuex";

export default createStore({
  state: {
    user: {},
    bot: {},
    botUser: {},
    botUsers: [],
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

    setBotUserFromApi(state, payload) {
      const { users, ...rest } = payload;

      state.bot = { ...rest };
      state.botUsers = [...users];
    },

    setSocketIo(state, payload) {
      state.socket = { ...payload };
    },

    updateMessageUser(state, payload) {
      payload.map((p) => {
        const index = state.botUsers.findIndex(
          (item) => item.chat_id == p.chat_id
        );

        if (index == -1) {
          state.botUsers.push(p);
        } else {
          p.messages.forEach((m) => {
            state.botUsers[index].messages.push({
              text: m.text,
              type: m.type,
              time: m.time,
            });
          });
        }
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

    setBotUserFromApi({ commit }, payload) {
      commit("setBotUserFromApi", { ...payload });
    },

    setSocketIo({ commit }, payload) {
      commit("setSocketIo", { ...payload });
    },

    updateMessageUser({ commit }, payload) {
      commit("updateMessageUser", [...payload]);
    },
  },
});
