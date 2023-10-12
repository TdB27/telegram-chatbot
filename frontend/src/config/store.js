import { createStore } from "vuex";

export default createStore({
  state: {
    botUser: {},
    bot: {
      name: "Bot do Thiago",
      users: [
        {
          id: 1,
          name: "Thiago",
          messages: [
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
          ],
        },
        {
          id: 2,
          name: "Billy",
          messages: [
            {
              type: "user",
              text: "texto do usuario",
              time: "09:12",
            },
            {
              type: "user",
              text: "outro texto do user",
              time: "13:50",
            },
            {
              type: "bot",
              text: "wait",
              time: "15:55",
            },
          ],
        },
        {
          id: 3,
          name: "Santana",
          messages: [
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
            {
              type: "bot",
              text: "texto do bot",
              time: "12:12",
            },
          ],
        },
      ],
    },
  },

  mutations: {
    selectUser(state, payload) {
      state.botUser = { ...payload };
    },
  },

  actions: {
    selectUser({ commit }, payload) {
      commit("selectUser", { ...payload });
    },
  },
});
