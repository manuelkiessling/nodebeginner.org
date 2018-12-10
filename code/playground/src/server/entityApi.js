import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
import { EntityEventFactory } from "../universal/entities/EntityEventFactory";

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url, { useNewUrlParser: true });

const activateApi = (server, callback) => {

    server.use(bodyParser.json());

    client.connect((err) => {
        if (err) throw err;

        console.info("Connected to MongoDB server.");

        const db = client.db("test");
        const entityEventsByUserId = db.collection("entityEventsByUserId");

        server.get(/^\/api\/entity-events\/$/, (req, res) => {
            console.info(`Received API request: ${req.method} ${req.originalUrl}`);
            entityEventsByUserId
                .findOne({ userId: 1234 }, {}, (err, doc) => {
                    if (err) {
                        console.error(err);
                        res.writeHead(500, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ error: err.message }));
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
            console.info(`Received API request: ${req.method} ${req.originalUrl}`);
            console.debug(`Request body: ${JSON.stringify(req.body, null, 4)}`);

            const updatePromises = [];
            const entityEvents = [];

            try {
                for (let i=0; i < req.body.length; i++) {
                    entityEvents.push(EntityEventFactory.createEntityEventFromObject(req.body[i]))
                }
            } catch (e) {
                console.error(e);
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: e.message }));
                return;
            }


            for (let i=0; i < entityEvents.length; i++) {
                updatePromises.push(entityEventsByUserId.updateOne(
                    { userId: 1234 },
                    { $push: { events: entityEvents[i] } },
                    { upsert: true }
                ));
            }

            Promise.all(updatePromises)
                .then(() => {
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify("Entity events successfully stored"));
                })
                .catch((err) => {
                    res.writeHead(500, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: err.message }));
                });
        });

        console.info("API support at /api activated.");
        callback();
    });
};

export default activateApi;
