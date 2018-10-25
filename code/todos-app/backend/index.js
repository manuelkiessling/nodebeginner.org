const startHttpServer = require("./server").start;
const router = require("./router");

router.register("GET", "/", (response) => {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Hello, World on /");
    response.end();
});

router.register("GET", "/foo", (response) => {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Hello, World on /foo");
    response.end();
});

startHttpServer(router);
