const instanceUserService = require("../services/UserService");

module.exports = (app) => {
  const get = async (req, res) => {
    const UserService = new instanceUserService();
    const service = await UserService.get({
      auth_user_id: req.params.auth_user_id,
    });

    return res.status(service.status).send(service.data ?? null);
  };

  const store = async (req, res) => {
    const UserService = new instanceUserService();
    const service = await UserService.store({
      params: req.params,
      body: req.body,
    });

    return res.status(service.status).send(service.data ?? null);
  };

  const destroy = async (req, res) => {
    const UserService = new instanceUserService();
    const service = await UserService.destroy({ id: req.params.id });

    return res.status(service.status).send(service.data ?? null);
  };

  return { get, store, destroy };
};
