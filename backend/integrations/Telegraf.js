const { Telegraf } = require("telegraf");

module.exports = class TelegrafService {
  #bot;

  constructor(keyBot) {
    this.#bot = new Telegraf(keyBot);
  }

  sendMessage({ chatId, msg }) {
    this.#bot.telegram.sendMessage(chatId, msg);
    // this.#bot.start((ctx) => ctx.reply("Welcome"));
    // this.#bot.hears("hi", (ctx) => ctx.reply("Hey there"));
    // this.#bot.launch();
  }
};
