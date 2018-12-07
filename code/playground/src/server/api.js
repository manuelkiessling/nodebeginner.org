import { MongoClient } from "mongodb";


const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url, { useNewUrlParser: true });

const activateApi = (server, callback) => {
    client.connect((err) => {
        if (err) throw err;

        console.info("Connected to MongoDB server.");

        const db = client.db("test");
        const entityEventsByUserId = db.collection("entityEventsByUserId");

        server.get(/^\/api\/entity-events\/$/, (req, res) => {
            console.info(`Received API request: ${JSON.stringify(req.route, null, 4)}`);
            entityEventsByUserId
                .findOne({ userId: 1234 }, {}, (err, doc) => {
                    if (err) {
                        console.error(err);
                        res.writeHead(500, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({error: err.message }))
                    } else {
                        res.writeHead(200, { "Content-Type": "application/json" });
                        if (doc != null && doc.hasOwnProperty("events") && doc.events != null) {
                            res.end(JSON.stringify(doc.events));
                        } else {
                            res.end(JSON.stringify([]));
                        }
                    }
                });

        });

        server.post(/^\/api\/entity-events\/$/, (req, res) => {
            console.info(`Received API request: ${JSON.stringify(req.route, null, 4)}`);
            console.debug(`Request body: ${JSON.stringify(req.body, null, 4)}`);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify("Entity events successfully stored"));
        });

        console.info("API support at /api activated.");
        callback();
    });
};

export default activateApi;
