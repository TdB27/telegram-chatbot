const axios = require("axios");
const { formatDateToLocaleUsa } = require("../generals/date");

module.exports = class Telegram {
  #keyBot;
  #urlDefault = "https://api.telegram.org";

  constructor(keyBot) {
    this.#keyBot = keyBot;
  }

  async getDataTelegram() {
    const me = await this.#getMe();
    if (me.error) throw me.data;

    const updates = await this.#getUpdates();
    if (updates.error) throw updates.data;

    return this.#getDataFormatted({
      me: me.data.result,
      updates: updates.data.result,
    });
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
      id: me.id,
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
          message_id: messageFilter.message.message_id,
          text: messageFilter.message.text,
          time: formatDateToLocaleUsa(messageFilter.message.date * 1000),
        };
      });

      const firstName = filter[0].message.chat.first_name;
      const lastName = filter[0].message.chat.last_name ?? "";

      return {
        chat_id: item,
        name: `${firstName} ${lastName}`,
        messages,
      };
    });
  }
};
