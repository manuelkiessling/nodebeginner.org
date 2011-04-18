var sys = require("sys");
var http = require("http");

function start() {
  function handle(request, response) {
    sys.puts("Request received.");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(handle).listen(8888);
  sys.puts("Server has started.");
}

exports.start = start;
