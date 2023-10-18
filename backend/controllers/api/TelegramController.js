const InstanceTelegramService = require("../../services/TelegramService");

module.exports = (app, io) => {
  const get = async (req, res) => {
    const keyBot = req.params.key_bot;

    const TelegramService = new InstanceTelegramService(keyBot);
    const service = await TelegramService.get();

    return res.status(service.status).send(service.data ?? null);
  };

  const sendMessage = async (req, res) => {
    const { chatId, msg, socketId } = req.body;
    // console.log(req.params.key_bot);

    io.to(socketId).emit("updateChat", { chatId, msg });

    return res.status(204).send();
  };

  return { get, sendMessage };
};
