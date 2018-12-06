import mockApiContent from "./mock-api-db";

export default (server) => {
    console.info("API support at /api activated.");
    server.get(/^\/api(\?.*)*$/, (req, res) => {
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(mockApiContent));
    });
}
