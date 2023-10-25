const app = require("express")();
const { createServer } = require("http");
const { Server } = require("socket.io");
const consign = require("consign");
const db = require("./config/db");
const PORT = 3000;

// inicializar o socket io sentro do server
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    credentials: false,
  },
});

io.on("connection", (socket) => console.log("someone connected", socket.id));

app.db = db;

consign()
  .then("./config/middlewares.js")
  .then("./controllers")
  .then("./config/routes.js")
  .into(app, io);

httpServer.listen(PORT, () => {
  console.log("Backend rodando....");
});
