const { Telegraf } = require("telegraf");

module.exports = class TelegrafService {
  #bot;

  constructor(keyBot) {
    this.#bot = new Telegraf(keyBot);
  }

  sendMessage({ chatId, msg }) {
    // Enviando a mensagem como text para o usuario
    this.#bot.telegram.sendMessage(chatId, msg);
  }
};
