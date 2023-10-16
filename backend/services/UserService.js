const bcrypt = require("bcrypt-nodejs");
const UserModel = require("../models/User");
const {
  existsOrError,
  notExistsOrError,
} = require("../generals/validations/user");

module.exports = class UserService {
  constructor() {
    this.model = new UserModel();
  }

  async get({ auth_user_id }) {
    const data = await this.model.get({ auth_user_id });

    if (data.error) return { status: 500 };
    return { status: 200, data };
  }

  #encryptPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  async store({ params, body }) {
    const user = { ...body };

    if (params.id) user.id = params.id;

    try {
      existsOrError(user.name, "Nome não informado");
      existsOrError(user.email, "Email não informado");

      if (!user.id) {
        existsOrError(user.password, "Senha não informada");
        existsOrError(user.key_bot, "Chave do bot não informado");

        const userFromDB = await this.model.getByEmail(user.email);

        if (!user.id) {
          notExistsOrError(userFromDB, "Usuário já cadastrado");
        }
      }
    } catch (msg) {
      return { status: 400, data: msg };
    }

    user.password = this.#encryptPassword(user.password);

    let data = !user.id
      ? await this.model.store(user)
      : await this.model.update(user);

    if (data.error) return { status: 500 };
    return { status: data.status, data: data.msg };
  }

  async destroy({ id }) {
    try {
      const user = await this.model.destroy(id);

      existsOrError(user, "Usuário não foi encontrado.");

      return { status: 200, data: "Usuário excluído com sucesso" };
    } catch (msg) {
      return { status: 500, data: msg };
    }
  }
};
