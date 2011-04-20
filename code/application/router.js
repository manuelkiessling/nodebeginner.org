function route(handle, pathname) {
  console.log("About to route a request for " + pathname);
  if (handle[pathname] != undefined) {
	  handle[pathname]();
  } else {
	  console.log("No request handler found for " + pathname);
  }
}

exports.route = route;
