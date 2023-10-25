const axios = require("axios");
const { formatDateToLocaleUsa } = require("../generals/date");

module.exports = class Telegram {
  #keyBot;
  #urlDefault = "https://api.telegram.org";

  constructor(keyBot) {
    this.#keyBot = keyBot;
  }

  async getDataTelegram() {
    // Busca o bot segundo o token (keyBot) inserido na instancia
    const me = await this.#getMe();
    if (me.error) throw me.data;

    // A API do Telegram não envia toda a mensagens de todos os usuários que interagem com o bot,
    // apenas as ultimas enviadas no período de +- 24 horas
    // Busca as ultimas mensagens segundo o token (keyBot) inserido na instancia
    const updates = await this.#getUpdates();
    if (updates.error) throw updates.data;

    // Retorna os dados formatados
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
    // Formata as mensagens de acordo com cada usuario
    // Modelo de como precisa estar formatado
    // {
    //   chat_id: 123,
    //   name: 'Usuario 1',
    //   messages: [
    //     {
    //       type: "user",
    //       message_id: 1,
    //       text: 'Teste',
    //       time: '2023-10-25 11:40',
    //     }
    //   ],
    // }

    // pega somente o id dos chats
    const chatIds = updatesBot.map((item) => item.message.chat.id);
    // filtra os chat_ids para ter somente os is diferentes
    const chatIdsFilters = chatIds.filter(
      (item, index) => chatIds.indexOf(item) === index
    );

    // percorre os ids dos chats filtrados
    return chatIdsFilters.map((item) => {
      let filter = updatesBot.filter(
        (itemBot) => itemBot.message.chat.id === item
      );

      // retorna um array com as mensagens formatadas de acordo com o id chat
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
