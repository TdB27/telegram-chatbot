const bcrypt = require("bcrypt-nodejs");
const UserModel = require("../models/User");

module.exports = (app) => {
  const { existsOrError, notExistsOrError } = app.api.validation;

  const get = async (req, res) => {
    const model = new UserModel();
    const data = await model.get();

    if (data.error) return res.status(500).send();
    return res.json(data);
  };

  const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  const store = async (req, res) => {
    const model = new UserModel();
    const user = { ...req.body };

    if (req.params.id) user.id = req.params.id;

    try {
      existsOrError(user.name, "Nome não informado");
      existsOrError(user.email, "Email não informado");

      if (!user.id) {
        existsOrError(user.password, "Senha não informada");
        existsOrError(user.key_bot, "Chave do bot não informado");

        const userFromDB = await model.getByEmail(user.email);

        if (!user.id) {
          notExistsOrError(userFromDB, "Usuário já cadastrado");
        }
      }
    } catch (msg) {
      return res.status(400).send(msg);
    }

    user.password = encryptPassword(user.password);

    let data;

    if (!user.id) data = await model.store(user);
    else data = await model.update(user);

    if (data.error) return res.status(500).send();

    return res.status(data.status).send(data.msg);
  };

  const destroy = async (req, res) => {
    const model = new UserModel();

    try {
      const user = await model.destroy(req.params.id);

      existsOrError(user, "Usuário não foi encontrado.");

      res.status(200).send("Usuário excluído com sucesso");
    } catch (msg) {
      res.status(500).send(msg);
    }
  };

  return { get, store, destroy };
};
