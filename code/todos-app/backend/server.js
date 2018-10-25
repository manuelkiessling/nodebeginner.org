const http = require("http");

module.exports.start = (router) => {
    http.createServer((request, response) => {

        console.log(`Received request ${request.method} ${request.url}`);

        if (!router.route(request, response)) {
            response.writeHead(404, { "Content-Type": "text/plain" });
            response.write("Not found.");
            response.end();
        }

    }).listen(8000);

    console.log("Server has started.");
};
