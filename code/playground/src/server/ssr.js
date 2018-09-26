import sourceMapSupport from "source-map-support";
import express from "express";
import proxy from "express-http-proxy";
import path from "path";
import fs from "fs";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter as Router, matchPath } from "react-router-dom";
import { Provider } from "react-redux";
import AppContainer from "../universal/react-components/container/AppContainer";
import clientAssetsManifest from "../../dist/client-assets-manifest.json";
import { initializeCommand } from "../universal/redux-actions/commands";
import routes from "../universal/routes";
import { SheetsRegistry } from "react-jss/lib/jss";
import JssProvider from "react-jss/lib/JssProvider";
import { MuiThemeProvider, createGenerateClassName } from "@material-ui/core/styles";
import muiTheme from "../universal/styling/muiTheme";
import { createStoreFromInitialState } from "../universal/redux-state/store";

sourceMapSupport.install();

const server = express();

const staticPath = path.resolve(__dirname); // Webpack will store the bundled server.js
                                            // file into /dist, where the other static stuff ends up, too


server.get(/^\/server\.(.*)/, (req, res) => {
    res.sendStatus(404);
    res.end("404 Not found.")
});

server.use(express.static(staticPath));


server.use(
    "/api",
    proxy(
        "127.0.0.1:10001",
        {
            // The (mock) API server expects requests at /api/...
            proxyReqPathResolver: (req) => {
                const resolvedPath = "/api" + require("url").parse(req.url).path;
                console.info("Proxying to " + resolvedPath);
                return "http://127.0.0.1:10001" + resolvedPath;
            }
        }
    )
);


server.get("/sw-precache-appshell", (req, res) => {
    const templateFileName = path.resolve(__dirname, "..", "src", "universal", "html-templates", "sw-precache-appshell.html");

    fs.readFile(templateFileName, "utf8", (err, templateContent) => {
        if (err) {
            console.error("err", err);
            return res.status(404).end()
        }

        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(renderHtmlTemplate(templateContent, false, false, false));

    });
});


server.get(/^\/(tasks|)(\?.*)*$/, (req, res) => {

    console.debug("__dirname:" + __dirname);
    console.debug("path.resolve(__dirname):" + path.resolve(__dirname));

    const templateFileName = path.resolve(__dirname, "..", "src", "universal", "html-templates", "index.html");

    fs.readFile(templateFileName, "utf8", (err, templateContent) => {
        if (err) {
            console.error("err", err);
            return res.status(404).end()
        }

        const store = createStoreFromInitialState();
        store.dispatch(initializeCommand());

        const ssrDispatchHooks =
            routes
                .filter((route) => matchPath(req.url, route))                    // filter matching paths
                .map((route) => route.component)                                 // map to components
                .filter((component) => component.ssrDispatchHook)                // filter to components that have a SSR trigger
                .map((component) => {
                    console.debug("Triggering ssrDispatchHook on " + component.name);
                    return store.dispatch(component.ssrDispatchHook());          // dispatch trigger
                });

        Promise.all(ssrDispatchHooks).then(() => {
            const context = {};

            const sheetsRegistry = new SheetsRegistry();

            // Create a sheetsManager instance.
            const sheetsManager = new Map();

            // Create a new class name generator.
            const generateClassName = createGenerateClassName();

            console.debug("Building JSX");
            const jsx = (
                <Provider store={store}>
                    <Router context={context} location={req.url}>
                        <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
                            <MuiThemeProvider theme={muiTheme} sheetsManager={sheetsManager}>
                                <AppContainer/>
                            </MuiThemeProvider>
                        </JssProvider>
                    </Router>
                </Provider>
            );

            console.debug("Starting JSX rendering...");
            const reactDom = renderToString(jsx);
            console.debug("Finished JSX rendering.");

            const style = sheetsRegistry.toString();

            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(renderHtmlTemplate(templateContent, reactDom, store, style));
        });
    });
});


server.get("/*", (req, res) => {
    res.sendStatus(404);
    res.end("404 Not found.")
});


server.listen(10000);

console.info("Will serve static files from " + staticPath);
console.info("Will proxy requests to /api to http://127.0.0.1:10001/api");
console.info("SSR server listening on http://127.0.0.1:10000");


const extractAssets = (assets, chunks, ending) => Object.keys(assets)
    .filter(asset => chunks.indexOf(asset.replace(ending, "")) > -1)
    .map(k => assets[k]);

const javascriptChunks = extractAssets(clientAssetsManifest, ["main"], ".js")
    .map(c => `<script type="text/javascript" src="/${c}"></script>`);

const cssChunks = extractAssets(clientAssetsManifest, ["main"], ".css")
    .map(c => `<link rel="stylesheet" href="/${c}" />`);


const renderHtmlTemplate = (templateContent, reactDom, store, inlineStyle) => {
    return (
        templateContent
            // write the rendered React app DOM
            .replace('<div id="app"></div>', reactDom ? `<div id="app">${reactDom}</div>` : '<div id="app"></div>')

            // write the Redux store state
            .replace("<!-- window.SSR_REDUX_STORE_STATE placeholder -->", store ? `<script>window.SSR_REDUX_STORE_STATE = ${ JSON.stringify(store.getState()) }</script>` : "")

            // write the React JS app script tag(s)
            .replace("<!-- SSR <script> placeholder -->", javascriptChunks.join(""))

            // write the style link tag(s)
            .replace("<!-- SSR style link tag placeholder -->", cssChunks.join(""))

            // write the inline style tag
            .replace("<!-- SSR inline style tag placeholder -->", inlineStyle ? `<style id="ssr-inline-style">${ inlineStyle }</style>` : "")
    );
};
