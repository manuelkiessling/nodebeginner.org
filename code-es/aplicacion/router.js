function route(handle, pathname, response, request) {
  console.log("A punto de rutear una peticion para " + pathname);
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response, request);
  } else {
    console.log("No hay manipulador de peticion para " + pathname);
    response.writeHead(404, {"Content-Type": "text/html"});
    response.write("404 No Encontrado");
    response.end();
  }
}

exports.route = route;
