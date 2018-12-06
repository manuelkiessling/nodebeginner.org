import sourceMapSupport from "source-map-support";
import express from "express";
import path from "path";
import fs from "fs";
import React from "react";
import activateApiServer from "./api";
import activateSsr from "./ssr";
import renderHtmlTemplate from "./renderHtmlTemplate";

sourceMapSupport.install();

const server = express();

const boot = () => {
    activateSsr(server);

    const staticPath = path.resolve(__dirname); // Webpack will store the bundled server.js
                                                // file into /dist, where the other static stuff ends up, too


    server.get(/^\/server\.(.*)/, (req, res) => {
        res.sendStatus(404);
        res.end("404 Not found.")
    });

    server.use(express.static(staticPath));

    server.get("/sw-precache-appshell", (req, res) => {
        const templateFileName = path.resolve(__dirname, "..", "src", "universal", "html-templates", "sw-precache-appshell.html");

        fs.readFile(templateFileName, "utf8", (err, templateContent) => {
            if (err) {
                console.error("err", err);
                return res.status(404).end()
            }

            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(renderHtmlTemplate(templateContent, false, false, false));

        });
    });

    server.get("/*", (req, res) => {
        res.sendStatus(404);
        res.end("404 Not found.")
    });


    server.listen(10000);

    console.info("Will serve static files from " + staticPath);
    console.info("Server listening on http://127.0.0.1:10000");
};

activateApiServer(server, boot);
