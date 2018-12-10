import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import uuidv4 from "uuid";
import jwt from "jsonwebtoken";

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url, { useNewUrlParser: true });


const generateSessionToken = (userId, callback) => {
    return jwt.sign({ userId: userId }, "secret", callback);
};


const activateAuth = (server, callback) => {

    server.use(bodyParser.json());

    client.connect((err) => {
        if (err) throw err;

        console.info("Connected to MongoDB server.");

        const db = client.db("test");
        const accounts = db.collection("accounts");

        server.post(/^\/api\/session-tokens\/$/, (req, res) => {
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
                console.info(`Request body ${JSON.stringify(req.body, null, 4)} is invalid.`);
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
                    res.end(JSON.stringify({ error: "Unable to look up your account." }));
                } else {
                    if (doc != null && doc.hasOwnProperty("passwordHash") && doc.passwordHash != null) {

                        console.info(`Account with username ${username} exists, verifying password...`);
                        bcrypt.compare(password, doc.passwordHash, (err, matched) => {
                            if (matched === true) {
                                console.info(`Password for account with username ${username} is valid, creating session token...`);
                                res.writeHead(200, { "Content-Type": "application/json" });
                                res.end(JSON.stringify(generateSessionToken(doc.userId)));
                            } else {
                                console.info(`Password for account with username ${username} is invalid.`);
                                res.writeHead(200, { "Content-Type": "application/json" });
                                res.end(JSON.stringify("Access denied."));
                            }
                        });

                    } else {

                        console.info(`Account with username ${username} does not yet exist, creating...`);

                        bcrypt.genSalt(12, (err, salt) => {
                            bcrypt.hash(password, salt, (err, passwordHash) => {
                                if (err) {
                                    console.error(err);
                                    res.writeHead(500, { "Content-Type": "application/json" });
                                    res.end(JSON.stringify({ error: "Could not create new account." }));

                                } else {

                                    const userId = uuidv4();
                                    accounts.insertOne(
                                        { userId: userId, username: username, passwordHash: passwordHash },
                                        null
                                    ).then(() => {
                                        console.info(`Account with username ${username} has been created with user id ${userId}, creating session token...`);
                                        generateSessionToken(userId, (err, jwt) => {
                                            if (err) {
                                                res.writeHead(500, { "Content-Type": "application/json" });
                                                res.end(JSON.stringify({ error: "Could not create session token." }));
                                            } else {
                                                res.writeHead(200, { "Content-Type": "application/json" });
                                                res.end(JSON.stringify(jwt));
                                            }
                                        });
                                    }).catch((err) => {
                                        console.error(err);
                                        res.writeHead(500, { "Content-Type": "application/json" });
                                        res.end(JSON.stringify({ error: "Could not create new account." }));
                                    });
                                }
                            });
                        });
                    }
                }
            });

        });

        callback();
    });
};

export default activateAuth;
