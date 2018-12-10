import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url, { useNewUrlParser: true });

const generateSessionToken = (userId) => {

};


const activateAuth = (server, callback) => {

    server.use(bodyParser.json());

    client.connect((err) => {
        if (err) throw err;

        console.info("Connected to MongoDB server.");

        const db = client.db("test");
        const accounts = db.collection("accounts");

        server.post(/^\/auth\/session-tokens\/$/, (req, res) => {
            console.info(`Received auth request: ${req.method} ${req.originalUrl}`);

            if (    (req.body == null)

                || !(req.body.hasOwnProperty("username"))
                ||  (req.body.username == null)
                || !(typeof req.body.username === "string")
                ||  (req.body.username.length === 0)

                || !(req.body.hasOwnProperty("password"))
                ||  (req.body.password == null)
                || !(typeof req.body.password === "string")
                ||  (req.body.password.length === 0)
            ) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Invalid authentication body." }));
                return;
            }

            const username = req.body.username;
            const password = req.body.password;
            accounts.findOne({ username: username }, {}, (err, doc) => {
                if (err) {
                    console.error(err);
                    res.writeHead(500, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: err.message }));
                } else {
                    if (doc != null && doc.hasOwnProperty("passwordHash") && doc.passwordHash != null) {
                        console.info(`Account with username ${username} exists, verifying password...`);
                        bcrypt.compare(password, doc.passwordHash, (err, matched) => {
                            if (matched === true) {
                                console.info(`Password for account with username ${username} is valid, creating session token...`);
                                res.writeHead(201, { "Content-Type": "application/json" });
                                res.end(JSON.stringify(""));
                            } else {
                                console.info(`Password for account with username ${username} is invalid.`);
                                res.writeHead(403, { "Content-Type": "application/json" });
                                res.end(JSON.stringify("Access denied."));
                            }
                        });
                    } else {
                        console.info(`Account with username ${username} does not yet exist, creating...`);

                        bcrypt.hash(password, 12, (passwordHash) => {

                        });

                            res.writeHead(200, { "Content-Type": "application/json" });
                        res.end(JSON.stringify([]));
                    }
                }
            });

        });

        callback();
    });
};

export default activateAuth;
