import { MongoClient } from "mongodb";

export default () => new Promise((resolve, reject) => {
    const url = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(url, { useNewUrlParser: true });

    client.connect((err) => {
        if (err) {
            console.error(err);
            reject(new Error("Could not establish connection to MongoDB server."));
        } else {
            console.info("Connected to MongoDB server.");
            resolve(client.db("test"));
        }
    });

});
