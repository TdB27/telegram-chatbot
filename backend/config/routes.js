module.exports = (app) => {
  app.route("/users").get(app.api.user.get).post(app.api.user.store);
  app.route("/user/:id").delete(app.api.user.destroy);
};
