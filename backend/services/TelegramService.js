const axios = require("axios");

module.exports = class TelegramService {
  #keyBot;
  #urlDefault = "https://api.telegram.org";

  constructor(keyBot) {
    this.#keyBot = keyBot;
  }

  async get() {
    const me = await this.#getMe();
    if (me.error) return { status: me.status, data: me.data };

    const updates = await this.#getUpdates();
    if (updates.error) return { status: updates.status, data: updates.data };

    const data = this.#getDataFormatted({
      me: me.data.result,
      updates: updates.data.result,
    });

    return { status: 200, data };
  }

  async #getMe() {
    return await axios
      .get(`${this.#urlDefault}/bot${this.#keyBot}/getMe`)
      .then((resp) => {
        return {
          status: 200,
          data: resp.data,
        };
      })
      .catch((err) => {
        return {
          error: true,
          status: 404,
          data: "Este usuário não tem Bot e/ou a chave do Bot está incorreto",
          //   data: err.response.data,
        };
      });
  }

  async #getUpdates() {
    return await axios
      .get(`${this.#urlDefault}/bot${this.#keyBot}/getUpdates`)
      .then((resp) => {
        return {
          status: 200,
          data: resp.data,
        };
      })
      .catch((err) => {
        return {
          error: true,
          status: 404,
          data: "Erro ao buscar as mensagens desse Bot",
        };
      });
  }

  #getDataFormatted({ me, updates }) {
    return {
      chat_id: me.id,
      username: me.username,
      first_name: me.first_name,
      users: this.#formatUpdates(updates),
    };
  }

  #formatUpdates(updatesBot) {
    const chatIds = updatesBot.map((item) => item.message.chat.id);
    const chatIdsFilters = chatIds.filter(
      (item, index) => chatIds.indexOf(item) === index
    );

    return chatIdsFilters.map((item) => {
      let filter = updatesBot.filter(
        (itemBot) => itemBot.message.chat.id === item
      );

      let messages = filter.map((messageFilter) => {
        return {
          type: "user",
          text: messageFilter.message.text,
          time: this.#formatDate(messageFilter.message.date),
        };
      });

      return {
        chat_id: item,
        name: `${filter[0].message.chat.first_name} ${filter[0].message.chat.last_name}`,
        messages,
      };
    });
  }

  #formatDate(value) {
    const date = new Date(value * 1000);
    return `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }
};
