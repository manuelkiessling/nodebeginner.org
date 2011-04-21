function route(handle, pathname) {
  console.log("About to route a request for " + pathname);
  if (handle[pathname] != undefined) {
	  return handle[pathname]();
  } else {
	  return "404 Not found";
	  console.log("No request handler found for " + pathname);
  }
}

exports.route = route;
