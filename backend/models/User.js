const db = require("../config/db");

module.exports = class User {
  constructor() {
    this.model = db("users");
  }

  async get() {
    return await this.model
      .select(["id", "name", "email"])
      .whereNot({ email: "admin@admin.com" })
      .orderBy("id")
      .then((users) => {
        return users;
      })
      .catch((err) => {
        console.log(err);
        return { error: true };
      });
  }

  async getByEmail(email) {
    return await this.model.where({ email }).first();
  }

  async store(user) {
    return await this.model
      .insert(user)
      .then((_) => {
        return { status: 201, msg: "Usuário salvo com sucesso" };
      })
      .catch((err) => {
        return { error: true };
      });
  }

  async update(user) {
    return await this.model
      .update(user)
      .where({ id: user.id })
      .then((_) => {
        return { status: 200, msg: "Usuário atualizado com sucesso" };
      })
      .catch((err) => {
        return { error: true };
      });
  }

  async destroy(user_id) {
    const user = this.model.where({ id: user_id });
    if (!user) return null;

    return await user.delete();
  }
};
