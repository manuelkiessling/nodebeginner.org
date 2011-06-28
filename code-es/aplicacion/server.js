// server.js
// Ejemplo de NodeBeginner
// Se intenta traducir al máximo al Español,
// sin embargo, con el fin de preservar el sentido, se dejan 
// algunas variables en inglés.

var http = require("http");
var url = require("url");

// se opta por mantener los verbos route y handle
// que significan, respectivamente, rutear y manipular
function iniciar(route, handle) {

  function onRequest(request, response) {
    
    // pathname es el nombre de la ruta
    // ej: http://dominio/pathname/to/myfile.htm
    var pathname = url.parse(request.url).pathname;
    console.log("Peticion para " + pathname + " recibida.");
    route(handle, pathname, response, request);
  }

  http.createServer(onRequest).listen(8888);
  console.log("Servidor Iniciado.");
}

exports.iniciar = iniciar;