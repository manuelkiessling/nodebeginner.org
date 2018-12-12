import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { EntityEventFactory } from "../universal/entities/EntityEventFactory";
import { getUserIdFromRequest } from "./authApi";

const getUserIdFromRequestOrDeny = (req, res) => {
    return new Promise((resolve, reject) => {
        getUserIdFromRequest(req)
            .then((userId) => {
                if (userId != null) {
                    resolve(userId);
                } else {
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: "No valid session token found." }));
                    reject(new Error("No valid session token found."));
                }
            })
            .catch((error) => {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Could not authenticate request." }));
                reject(new Error("Could not authenticate request."));
            });
    });
};

const activateApi = (httpServer, mongoDb) => {

    return new Promise((resolve) => {

        httpServer.use(bodyParser.json());
        httpServer.use(cookieParser());

        const entityEventsByUserId = mongoDb.collection("entityEventsByUserId");

        httpServer.get(/^\/api\/entity-events\/$/, (req, res) => {
            console.info(`Received entity events API request ${req.method.cyan} ${req.originalUrl.green}`);

            getUserIdFromRequestOrDeny(req, res)
                .then((userId) => {
                    entityEventsByUserId.findOne({ userId: userId }, {}, (err, doc) => {
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
                })
                .catch((error) => {
                    console.warn(`Not responding with entity events: ${error.message}`.yellow);
                });
        });

        httpServer.post(/^\/api\/entity-events\/$/, (req, res) => {
            console.info(`Received entity events API request ${req.method.cyan} ${req.originalUrl.green}`);
            console.debug(`Request body: ${JSON.stringify(req.body, null, 4).blue}`);

            getUserIdFromRequestOrDeny(req, res)
                .then((userId) => {
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
                })
                .catch((error) => {
                    console.warn(`Not storing entity events: ${error.message}`.yellow);
                });
        });

        console.info(`Will serve ${"entity events API".blue} at ${"/api/entity-events/".green}.`);
        resolve();

    });
};

export default activateApi;
