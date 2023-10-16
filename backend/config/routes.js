module.exports = (app) => {
  app.route("/users/:auth_user_id").get(app.controllers.UserController.get);
  app.route("/users").post(app.controllers.UserController.store);

  app.route("/user/:id").delete(app.controllers.UserController.destroy);

  app.route("/signin").post(app.controllers.AuthController.signin);
};
