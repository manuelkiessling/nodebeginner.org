import bodyParser from "body-parser";
import { EntityEventFactory } from "../universal/entities/EntityEventFactory";

const activateApi = (httpServer, mongoDb) => {

    return new Promise((resolve) => {

        httpServer.use(bodyParser.json());

        const entityEventsByUserId = mongoDb.collection("entityEventsByUserId");

        httpServer.get(/^\/api\/entity-events\/$/, (req, res) => {
            console.info(`Received entity events API request ${req.method.cyan} ${req.originalUrl.green}`);
            entityEventsByUserId.findOne({ userId: 1234 }, {}, (err, doc) => {
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

        httpServer.post(/^\/api\/entity-events\/$/, (req, res) => {
            console.info(`Received entity events API request ${req.method.cyan} ${req.originalUrl.green}`);
            console.debug(`Request body: ${JSON.stringify(req.body, null, 4).blue}`);

            const updatePromises = [];
            const entityEvents = [];

            try {
                for (let i = 0; i < req.body.length; i++) {
                    entityEvents.push(EntityEventFactory.createEntityEventFromObject(req.body[i]))
                }
            } catch (e) {
                console.error(e);
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: e.message }));
                return;
            }


            for (let i = 0; i < entityEvents.length; i++) {
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

        console.info(`Will serve ${"entity events API".blue} at ${"/api/entity-events/".green}.`);
        resolve();

    });
};

export default activateApi;
