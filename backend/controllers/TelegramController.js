const InstanceTelegramService = require("../services/TelegramService");

module.exports = (app, io) => {
  const get = async (req, res) => {
    const keyBot = req.params.key_bot;

    const TelegramService = new InstanceTelegramService(keyBot);
    // retonar todas as mensagens salvas no DB
    const service = await TelegramService.get();

    return res.status(service.status).send(service.data ?? null);
  };

  const getNewLogs = async (req, res) => {
    const keyBot = req.params.key_bot;

    const TelegramService = new InstanceTelegramService(keyBot);
    // retorna as novas mensagens salvas no DB
    const service = await TelegramService.getNewLogs();

    return res.status(service.status).send(service.data ?? null);
  };

  const sendMessage = async (req, res) => {
    // paramentros requeridos para o envio correto
    // keyBot = req.params
    // socketId = req.body
    // botId = req.body
    // chatId = req.body
    // msg = req.body

    // spread operator
    const { socketId, ...rest } = req.body;
    const { key_bot: keyBot } = req.params;

    const TelegramService = new InstanceTelegramService(keyBot);
    const service = await TelegramService.sendMessage({ ...rest });

    // envia para o socket io client a mensagem enviada para o usuario
    if (service.logs) io.to(socketId).emit("updateChat", service.logs);

    return res.status(service.status).send(service.data ?? null);
  };

  return { get, getNewLogs, sendMessage };
};
