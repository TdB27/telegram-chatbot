const app = require("express")();
const { createServer } = require("http");
const { Server } = require("socket.io");
const consign = require("consign");
const db = require("./config/db");
const { port } = require("./config/serverConfig.js");
// const PORT = 3000;

if(process.env.NODE_ENV !== 'test')
  process.env.PORT = port

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

httpServer.listen(process.env.PORT, () => {
  const serverInfo = httpServer.address()
  console.log(`Backend rodando na porta ${serverInfo.address}:${serverInfo.port}`);
});

module.exports = httpServer