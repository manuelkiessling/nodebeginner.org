// router.js
// Ejemplo de NodeBeginner
// Se intenta traducir al máximo al Español,
// sin embargo, con el fin de preservar el sentido, se dejan 
// algunas variables en inglés.

function route(handle, pathname, response, request) {

  // Ojo! A node.js no le gustan los strings con acentos
  // No he probado los character entities a ver si ayudan aca.
  console.log("A punto de rutear una peticion para " + pathname);
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response, request);
  } 
  else {
    console.log("No hay manipulador de peticion para " + pathname);
    response.writeHead(404, {"Content-Type": "text/html"});
    response.write("404 No Encontrado");
    response.end();
  }
}

exports.route = route;