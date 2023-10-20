module.exports = (app) => {
  app.route("/users/:auth_user_id").get(app.controllers.UserController.get);
  app.route("/users").post(app.controllers.UserController.store);

  app.route("/user/:id").delete(app.controllers.UserController.destroy);

  app.route("/signin").post(app.controllers.AuthController.signin);

  app
    .route("/api/telegram/:key_bot")
    .get(app.controllers.TelegramController.get);

  app
    .route("/api/telegram/get-new-messages/:key_bot")
    .get(app.controllers.TelegramController.getNewLogs);

  app
    .route("/api/telegram/:key_bot/send-message")
    .post(app.controllers.TelegramController.sendMessage);
};
