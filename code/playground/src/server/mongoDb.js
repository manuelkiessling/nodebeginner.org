import { MongoClient } from "mongodb";

export default () => new Promise((resolve, reject) => {
    const url = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(url, { useNewUrlParser: true });

    client.connect()
        .then(() =>{
            console.info("Connected to MongoDB server.");
            resolve(client);
        })
        .catch((err) => {
            console.error(err);
            reject(new Error("Could not establish connection to MongoDB server."));
        });

});
