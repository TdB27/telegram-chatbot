const InstanceTelegramService = require("../services/TelegramService");
const InstanceTelegrafService = require("../services/TelegrafService");

module.exports = (app, io) => {
  const get = async (req, res) => {
    const keyBot = req.params.key_bot;

    const TelegramService = new InstanceTelegramService(keyBot);
    const service = await TelegramService.get();

    return res.status(service.status).send(service.data ?? null);
  };

  const getNewLogs = async (req, res) => {
    const keyBot = req.params.key_bot;

    const TelegramService = new InstanceTelegramService(keyBot);
    const service = await TelegramService.getNewLogs();

    return res.status(service.status).send(service.data ?? null);
  };

  const sendMessage = async (req, res) => {
    const { chatId, msg, socketId } = req.body;
    const { key_bot: keyBot } = req.params;

    const TelegrafService = new InstanceTelegrafService(keyBot);

    TelegrafService.sendMessage({ chatId, msg });

    io.to(socketId).emit("updateChat", { chatId, msg });

    return res.status(204).send();
  };

  return { get, getNewLogs, sendMessage };
};
