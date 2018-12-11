import express from "express";
import path from "path";

export default (httpServer) => {

    return new Promise((resolve) => {

        const staticFilesPath = path.resolve(__dirname);
        httpServer.use(express.static(staticFilesPath));
        console.info(`Will serve static files from ${staticFilesPath}.`);


        httpServer.get(/^\/server\.(.*)/, (req, res) => { // Make sure that we don't serve the server code
            res.sendStatus(404);
            res.end("404 Not found.")
        });


        // Handler for problematic requests
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
