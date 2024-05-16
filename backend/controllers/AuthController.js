const InstanceAuthService = require("../services/AuthService");

module.exports = (app) => {
  const signin = async (req, res) => {
    // Fazer autenticação básica do usuário
    const AuthService = new InstanceAuthService();
    const service = await AuthService.signin({ body: req.body });

    return res.status(service.status).send(service.data ?? null);
  };

  const on = async (req, res) => {
    // Verificar se o servidor está on
    return res.status(200).send(JSON.stringify('O servidor está on'));
  };

  return { signin, on };
};
