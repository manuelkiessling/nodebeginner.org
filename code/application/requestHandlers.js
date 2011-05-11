var exec = require("child_process").exec;

function start(response) {
  console.log("Request handler 'start' was called.");

  var body = '<form action="/upload" method="post" enctype="multipart/form-data">'+
    '<input type="file" name="upload-file">'+
    '<input type="submit" value="Upload">'+
    '</form>'

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("Hello Upload");
  response.end();
}

exports.start = start;
exports.upload = upload;
