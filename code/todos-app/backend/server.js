const http = require("http");
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

module.exports.start = () => {
    http.createServer((request, response) => {

        console.log(`Received request ${request.method} ${request.url}`);
        if (!router.route(request.method, "http://localhost" + request.url, response)) {
            response.writeHead(404, { "Content-Type": "text/plain" });
            response.write("Not found.");
            response.end();
        }

    }).listen(8000);

    console.log("Server has started.");
};
