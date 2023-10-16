module.exports = (app) => {
  app
    .route("/users")
    .get(app.controllers.UserController.get)
    .post(app.controllers.UserController.store);

  app.route("/user/:id").delete(app.controllers.UserController.destroy);
};
