const bcrypt = require("bcrypt-nodejs");

module.exports = (app) => {
  const { existsOrError, notExistsOrError } = app.api.validation;

  const get = (req, res) => {
    app
      .db("users")
      .then((users) => res.json(users))
      .catch((err) => res.status(500).send());
  };

  const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  const store = async (req, res) => {
    const user = { ...req.body };

    if (req.params.id) user.id = req.params.id;

    try {
      existsOrError(user.name, "Nome não informado");
      existsOrError(user.email, "Email não informado");
      existsOrError(user.password, "Senha não informada");
      existsOrError(user.key_bot, "Chave do bot não informado");

      const userFromDB = await app
        .db("users")
        .where({ email: user.email })
        .first();
      if (!user.id) {
        notExistsOrError(userFromDB, "Usuário já cadastrado");
      }
    } catch (msg) {
      return res.status(400).send(msg);
    }

    user.password = encryptPassword(user.password);

    if (user.id) {
      app
        .db("users")
        .update(user)
        .where({ id: user.id })
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send());
    } else {
      app
        .db("users")
        .insert(user)
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send());
    }
  };

  const destroy = async (req, res) => {
    try {
      const user = await app.db("users").where({ id: req.params.id }).delete();
      existsOrError(user, "Usuário não foi encontrado.");

      res.status(204).send();
    } catch (error) {
      res.status(500).send(msg);
    }
  };

  return { get, store, destroy };
};
