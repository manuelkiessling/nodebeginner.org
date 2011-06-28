// requestHandlers.js
// Ejemplo de NodeBeginner
// Se intenta traducir al máximo al Español,
// sin embargo, con el fin de preservar el sentido, se dejan 
// algunas variables en inglés.

var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");

function iniciar(response) {
  console.log("Manipulador de Peticion para 'inicio' fue llamado.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function subir(response, request) {
  console.log("Manipulador de Peticion para 'subir' fue llamado.");

  var form = new formidable.IncomingForm();
  console.log("A punto de parsear");
  form.parse(request, function(err, fields, files) {
    console.log("parseo hecho");
    fs.renameSync(files.upload.path, "/tmp/test.png");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("imagen recibida:<br/>");
    response.write("<img src='/show' />");
    response.end();
  });
}

function mostrar(response) {
  console.log("Manipulador de Peticion para 'mostrar' fue llamado.");
  fs.readFile("/tmp/test.png", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(err + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binario");
      response.end();
    }
  });
}

exports.iniciar = iniciar;
exports.subir = subir;
exports.mostrar = mostrar;
