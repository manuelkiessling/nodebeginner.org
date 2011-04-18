var sys = require("sys");

function route(resource) {
  sys.puts("About to route a request for " + resource);
}

exports.route = route;
