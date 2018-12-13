import express from "express";
import path from "path";

export default (httpServer) => {

    return new Promise((resolve) => {

        // Make sure that we don't serve the server code.
        httpServer.get(/^\/server\.(.*)/, (req, res) => {
            console.warn(`${"Not serving".yellow} ${req.method.cyan} ${req.originalUrl.blue}.`);
            res.sendStatus(404);
            res.end("Not found.")
        });


        const staticFilesPath = path.resolve(__dirname);
        httpServer.use(express.static(staticFilesPath));
        console.info(`Will serve ${"static files".blue} from ${"staticFilesPath".cyan}.`);


        // Handler for problematic requests
        httpServer.use((err, req, res, next) => {
            console.info(`Received request: ${req.method} ${req.originalUrl}`);
            if (err) {
                console.error(`${"Received invalid request:".red} ${JSON.stringify(req.headers, null, 4).blue}  ${JSON.stringify(req.body, null, 4).cyan}.`);
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ "error": "Invalid request."}));
            } else {
                next();
            }
        });

        resolve();
    });
};
