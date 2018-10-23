const URL = require("url").URL;

const parsedUrl = new URL("http://www.example.com:8000/foo?bar=1&baz=yes#main");

console.log(parsedUrl);
