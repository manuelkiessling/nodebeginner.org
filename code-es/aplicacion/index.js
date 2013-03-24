var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.inicio;
handle["/inicio"] = requestHandlers.inicio;
handle["/subir"] = requestHandlers.subir;
handle["/mostrar"] = requestHandlers.mostrar;

server.iniciar(router.route, handle);