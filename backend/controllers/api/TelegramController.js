const InstanceTelegramService = require("../../services/TelegramService");

module.exports = (app) => {
  const get = async (req, res) => {
    const keyBot = req.params.key_bot;

    const TelegramService = new InstanceTelegramService(keyBot);
    const service = await TelegramService.get();

    return res.status(service.status).send(service.data ?? null);
  };

  return { get };
};
