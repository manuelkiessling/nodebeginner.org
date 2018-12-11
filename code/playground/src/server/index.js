import sourceMapSupport from "source-map-support";
import express from "express";
import path from "path";
import fs from "fs";
import React from "react";
import activateEntityApi from "./entityApi";
import activateAuthApi from "./authApi";
import activateSsr from "./ssr";
import renderHtmlTemplate from "./renderHtmlTemplate";
import mongoDb from "./mongoDb";

sourceMapSupport.install();


const activateOther = (httpServer) => {

    return new Promise((resolve) => {

        const staticPath = path.resolve(__dirname); // Webpack will store the bundled server.js
                                                    // file into /dist, where the other static stuff ends up, too

        httpServer.get(/^\/server\.(.*)/, (req, res) => {
            res.sendStatus(404);
            res.end("404 Not found.")
        });

        httpServer.use(express.static(staticPath));
        console.info("Will serve static files from " + staticPath);

        httpServer.get("/sw-precache-appshell", (req, res) => {
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
        console.info("Will serve sw precache appshell from /sw-precache-appshell");

        httpServer.get("/*", (req, res) => {
            res.sendStatus(404);
            res.end("404 Not found.")
        });

        httpServer.use((err, req, res, next) => {
            console.info(`Received request: ${req.method} ${req.originalUrl}`);
            if (err) {
                console.error(`Received invalid request: ${JSON.stringify(req.headers)}  ${JSON.stringify(req.body)}`);
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ "error": "Invalid request."}));
            } else {
                next();
            }
        });

        resolve();

    });
};


mongoDb()
    .then((mongoDb) => {
        const httpServer = express();
        Promise.all(
            [
                activateAuthApi(httpServer, mongoDb),
                activateEntityApi(httpServer, mongoDb),
                activateSsr(httpServer),
                activateOther(httpServer)
            ]
        )
            .then(() => {
                httpServer.listen(10000);
                console.info("Server listening on http://127.0.0.1:10000");
            })
            .catch((error) => {
                console.error(error);
            });
    })
    .catch((err) => {
        console.error(err);
    });
