const InstanceAuthService = require("../services/AuthService");

module.exports = (app) => {
  const signin = async (req, res) => {
    const AuthService = new InstanceAuthService();
    const service = await AuthService.signin({ body: req.body });

    return res.status(service.status).send(service.data ?? null);
  };

  return { signin };
};
