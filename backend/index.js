const app = require("express")();
const consign = require("consign");
const db = require("./config/db");
const PORT = 3000;

app.db = db;

consign()
  .then("./config/middlewares.js")
  .then("./api/validation.js")
  .then("./controllers")
  .then("./config/routes.js")
  .into(app);

app.listen(PORT, () => {
  console.log("Backend rodando....");
});
