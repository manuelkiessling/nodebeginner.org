import sourceMapSupport from "source-map-support";
import express from "express";
import React from "react";
import activateEntityApi from "./entityApi";
import activateAuthApi from "./authApi";
import activateSwPrecacheAppshell from "./swPrecacheAppshell";
import activateSsr from "./ssr";
import activateOther from "./other";
import connectToMongoDb from "./mongoDb";

sourceMapSupport.install();

connectToMongoDb()
    .then((mongoDbClient) => {
        const mongoDb = mongoDbClient.db("test");
        const httpServer = express();
        Promise.all(
            [
                activateAuthApi(httpServer, mongoDb),
                activateEntityApi(httpServer, mongoDb),
                activateSwPrecacheAppshell(httpServer),
                activateSsr(httpServer),
                activateOther(httpServer)
            ]
        )
            .then(() => {
                // Handler for everything that is not handled otherwise - must be registered after all other routes are registered
                httpServer.get("/*", (req, res) => {
                    res.sendStatus(404);
                    res.end("404 Not found.")
                });
                httpServer.listen(10000);
                console.info("Server listening on http://127.0.0.1:10000");
            })
            .catch((error) => {
                console.error(error);
                mongoDbClient.close(() => {
                    process.exitCode = 2;
                });
            });
    })
    .catch((err) => {
        console.error(err);
        process.exitCode = 1;
    });
