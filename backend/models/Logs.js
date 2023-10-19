const db = require("../config/db");

module.exports = class User {
  constructor() {
    this.model = db("logs");
  }

  async getByMessageId({ chat_id, message_id }) {
    return await this.model
      .select("id")
      .where({ chat_id })
      .where({ message_id })
      .first()
      .then((log) => {
        return log;
      });
  }

  async getByBotId({ bot_id }) {
    return await this.model.where({ bot_id }).then((logs) => {
      return logs;
    });
  }

  async store(log) {
    return await this.model.insert(log);
  }
};
