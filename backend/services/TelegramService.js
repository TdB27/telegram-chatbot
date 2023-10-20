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
      const { data } = await this.#getDataTelegram();
      const logs = await this.#model.getByBotId({ bot_id: data.id });

      data.users = this.#formatDataToView(logs);

      return { status: 200, data };
    } catch (error) {
      return { status: 404, data: error };
    }
  }

  async getNewLogs() {
    try {
      const { newLogs } = await this.#getDataTelegram();
      const users = this.#formatDataToView(newLogs);

      return { status: 200, data: users };
    } catch (error) {
      return { status: 404, data: error };
    }
  }

  async #getDataTelegram() {
    let data = await this.#apiTelegram.getDataTelegram();
    const dataToStore = this.#formatDataToStore(data);

    const newLogs = await this.#store({ dataToStore });

    return { data, newLogs };
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

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minutes =
          date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

        return {
          text: item.text,
          type: item.type,
          time: `${day}/${month}/${year} ${hour}:${minutes}`,
        };
      });

      return {
        chat_id: dataLogs[0].chat_id,
        name: dataLogs[0].name,
        messages,
      };
    });
  }

  async #store({ dataToStore }) {
    const logs = [];

    for (const item of dataToStore) {
      let model = new LogModel();

      let hasMessage = await model.getByMessageId({
        chat_id: item.chat_id,
        message_id: item.message_id,
      });

      if (!hasMessage) {
        await model.store(item);
        logs.push(item);
      }
    }

    return logs;
  }
};
