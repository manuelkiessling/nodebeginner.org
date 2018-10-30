const startHttpServer = require("./server").start;
const router = require("./router");

router.register("GET", "/", (response) => {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Hello, World on /");
    response.end();
});

router.register("GET", "/api/todos/", (response) => {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Guess I should serve a list of todos...");
    response.end();
});

startHttpServer(router);
