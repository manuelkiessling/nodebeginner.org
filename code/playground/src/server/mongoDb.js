import { MongoClient } from "mongodb";

const uri = "mongodb://127.0.0.1:27017";

export default () => new Promise((resolve, reject) => {
    const client = new MongoClient(uri, { useNewUrlParser: true });

    client.connect()
        .then(() =>{
            console.info(`${"Connected to MongoDB server".green} at ${uri.blue}.`);
            resolve(client);
        })
        .catch((err) => {
            console.error(err);
            reject(new Error("Could not establish connection to MongoDB server."));
        });

});
