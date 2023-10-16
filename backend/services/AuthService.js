const bcrypt = require("bcrypt-nodejs");
const UserModel = require("../models/User");

module.exports = class UserService {
  constructor() {
    this.model = new UserModel();
  }

  async signin({ body }) {
    if (!body.email || !body.password) {
      return { status: 400, data: "Informe usuário e senha!" };
    }

    const user = await this.model.getByEmail(body.email);

    if (!user) return { status: 400, data: "Usuário não encontrado!" };

    const isMatch = bcrypt.compareSync(body.password, user.password);
    if (!isMatch) return { status: 401, data: "Email/senha inválidos!" };

    return {
      status: 200,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        key_bot: user.key_bot,
      },
    };
  }
};
