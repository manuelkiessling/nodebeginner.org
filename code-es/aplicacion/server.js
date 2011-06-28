var http = require("http");
var url = require("url");

function iniciar(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Peticion para " + pathname + " recibida.");
    route(handle, pathname, response, request);
  }

  http.createServer(onRequest).listen(8888);
  console.log("Servidor Iniciado.");
}

exports.start = start;
