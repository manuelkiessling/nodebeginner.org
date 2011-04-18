var sys = require("sys");
var http = require("http");
var url = require("url");

function start(route) {
  function handle(request, response) {
    var pathname = url.parse(request.url).pathname;
    sys.puts("Request for " + pathname + " received.");

    route(pathname);

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(handle).listen(8888);
  sys.puts("Server has started.");
}

exports.start = start;
