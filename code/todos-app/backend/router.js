const URL = require("url").URL;

let registeredHandlers = {};

module.exports = {
    register: (method, pathname, requestHandler) => {
        registeredHandlers[method + pathname] = requestHandler;
    },
    route: (method, url, response) => {
        const pathname = new URL(url).pathname;
        console.log(`About to route request for ${method} ${pathname}`);
        if (typeof registeredHandlers[method + pathname] === 'function') {
            registeredHandlers[method + pathname](response);
            return true;
        } else {
            console.log(`No request handler found for ${pathname}`);
            return false;
        }
    }
};
