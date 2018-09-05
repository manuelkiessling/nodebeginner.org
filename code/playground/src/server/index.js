import sourceMapSupport from "source-map-support";
import express from "express";
import proxy from "express-http-proxy";
import path from "path";
import fs from "fs";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter as Router } from "react-router-dom";
import AppContainer from "../universal/react-components/container/AppContainer";
import manifest from "../../dist/manifest.json";

sourceMapSupport.install();

const server = express();

const staticPath = path.resolve(__dirname); // Webpack will store the bundled server.js
                                            // file into dist, where the other static stuff ends up, too
console.info("Will serve static files from " + staticPath);

server.use(express.static(staticPath));

console.info("Will proxy requests to /api to http://127.0.0.1:8001/api");
server.use(
    "/api",
    proxy(
        "127.0.0.1:8001",
        {
            // The (mock) API server expects requests at /api/...
            proxyReqPathResolver: (req) => {
                const resolvedPath = "/api" + require("url").parse(req.url).path;
                console.info("Proxying to " + resolvedPath);
                return "http://127.0.0.1:8001" + resolvedPath;
            }
        }
    )
);

server.get("/*", (req, res) => {

    console.debug("__dirname:" + __dirname);
    console.debug("path.resolve(__dirname):" + path.resolve(__dirname));

    const templateFileName = path.resolve(__dirname, "..", "src", "universal", "html-templates", "index.html");

    fs.readFile(templateFileName, "utf8", (err, templateContent) => {
        if (err) {
            console.error('err', err);
            return res.status(404).end()
        }

        const context = {};
        const jsx = (
            <Router context={context} location={req.url}>
                <AppContainer />
            </Router>
        );
        const reactDom = renderToString(jsx);

        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(htmlTemplate(templateContent, reactDom));
    });
});


console.info("SSR server listening on http://127.0.0.1:8000");
server.listen(8000);

const extractAssets = (assets, chunks) => Object.keys(assets)
    .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
    .map(k => assets[k]);

const extraChunks = extractAssets(manifest, ["main"])
    .map(c => `<script type="text/javascript" src="/${c}"></script>`);

const htmlTemplate = (templateContent, reactDom) => {
    return (
        templateContent
            // write the rendered React app DOM
            .replace('<div id="app"></div>', `<div id="app">${reactDom}</div>`)

            // write the React JS app script tag
            .replace('<!-- SSR <script> placeholder -->', extraChunks.join(''))
    );
};
