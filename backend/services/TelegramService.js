const LogModel = require("../models/Logs");
const InstanceTelegram = require("../integrations/Telegram");

module.exports = class TelegramService {
  #keyBot;
  #model;
  #apiTelegram;

  constructor(keyBot) {
    this.#model = new LogModel();
    this.#keyBot = keyBot;
    this.#apiTelegram = new InstanceTelegram(keyBot);
  }

  async get() {
    try {
      let data = await this.#apiTelegram.getDataTelegram();

      const dataToStore = this.#formatDataToStore(data);
      await this.#store({ dataToStore, bot_id: data.id });

      const logs = await this.#model.getByBotId({ bot_id: data.id });

      data.users = this.#formatDataToView(logs);

      return { status: 200, data };
    } catch (error) {
      console.log(error);
      return { status: 404, data: error };
    }
  }

  #formatDataToStore(data) {
    let dataToStore = [];

    data.users.forEach((user) => {
      user.messages.forEach((message) => {
        dataToStore.push({
          bot_id: data.id,
          chat_id: user.chat_id,
          message_id: message.message_id,
          name: user.name,
          text: message.text,
          type: message.type,
          created_at: message.time,
        });
      });
    });

    return dataToStore;
  }

  #formatDataToView(logs) {
    const chatsId = logs.map((item) => item.chat_id);
    const chatsIdFiltered = chatsId.filter(
      (item, index) => chatsId.indexOf(item) === index
    );

    return chatsIdFiltered.map((item) => {
      const dataLogs = logs.filter((log) => item === log.chat_id);

      const messages = dataLogs.map((item) => {
        let date = new Date(item.created_at);
        return {
          text: item.text,
          type: item.type,
          time: `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
        };
      });

      return {
        chat_id: dataLogs[0].chat_id,
        name: dataLogs[0].name,
        messages,
      };
    });
  }

  async #store({ dataToStore, bot_id }) {
    await dataToStore.forEach(async (item) => {
      let model = new LogModel();

      let hasMessage = await model.getByMessageId({
        chat_id: item.chat_id,
        message_id: item.message_id,
      });

      if (!hasMessage) await model.store(item);
    });
  }
};
