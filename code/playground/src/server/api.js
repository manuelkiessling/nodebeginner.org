import fs from "fs";
import path from "path";

export default (server) => {
    console.info("API support at /api activated.");
    server.get(/^\/api\/entity-events\/$/, (req, res) => {
        res.writeHead(200, {"Content-Type": "application/json"});
        fs.readFile(path.join(__dirname, "..", "src", "server", "mock-api-db.json"), "utf8", (err, data) => {
            if (err) throw err;
            res.end(data);
        });
    });
}
