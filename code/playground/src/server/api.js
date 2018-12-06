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
            res.writeHead(200, { "Content-Type": "application/json" });

            entityEventsByUserId
                .findOne({ userId: 1234 }, {}, (err, doc) => {
                    if (err) {
                        console.error(err);
                        res.end(JSON.stringify({error: err.message }))
                    } else {
                        res.end(JSON.stringify(doc.events))
                    }
                });

        });

        console.info("API support at /api activated.");
        callback();
    });
};

export default activateApi;
