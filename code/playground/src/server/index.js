const express = require("express");
const path = require("path");
const React = require("React");
const reactServer = require("react-dom/server");
const AppContainer = require("../universal/react-components/container/AppContainer");

const server = express();

server.use(express.static(path.resolve(__dirname, "../dist")));

server.get("/*", (req, res) => {
    const jsx = (React.createElement("AppContainer"));
    const reactDom = reactServer.renderToString(jsx);

    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(htmlTemplate(reactDom));
});

const htmlTemplate = (reactDom) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Playground SSR</title>
        </head>
        
        <body>
            <div id="app">${ reactDom }</div>
            <script src="./app.bundle.js"></script>
        </body>
        </html>
    `;
};
