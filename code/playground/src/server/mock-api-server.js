const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("src/server/mock-api-db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use("/api", router);
server.listen(8001, () => {
    console.log("JSON Server is running");
});
