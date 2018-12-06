db.entityEventsByUserId.find({ userId: 1234 });

db.entityEventsByUserId.updateOne(
    { userId: 1234 },
    { $push:
        { events:
            {
                "type": "create",
                "id": "64d01c2b-7fb0-4b50-a1ed-5302a1026785",
                "timestamp": 1537523057376,
                "entityName": "Note",
                "entityId": "84244957-f782-45fc-988e-d9954720667d",
                "payload": {
                  "title": "This is a new note",
                  "content": "Woohoo!"
                }
            }
        },
    },
    { upsert: true }
);


db.entityEventsByUserId.updateOne(
    { userId: 1234 },
    { $push:
            { events:
                    {
                        "type": "update",
                        "id": "74d01c2b-7fb0-4b50-a1ed-5302a1026785",
                        "timestamp": 1537523057392,
                        "entityName": "Note",
                        "entityId": "84244957-f782-45fc-988e-d9954720667d",
                        "payload": {
                            "title": "This is a new note, updated",
                            "content": "Woohoo!",
                            "isImportant": true
                        }
                    }
            },
    },
    { upsert: true }
);

db.entityEventsByUserId.updateOne(
    { userId: 1234 },
    { $push:
            { events:
                    {
                        "type": "update",
                        "id": "84d01c2b-7fb0-4b50-a1ed-5302a1026785",
                        "timestamp": 1544107584000,
                        "entityName": "Note",
                        "entityId": "84244957-f782-45fc-988e-d9954720667d",
                        "payload": {
                            "title": "This is a new note, updated again",
                            "content": "Woohoo!",
                            "isImportant": true
                        }
                    }
            },
    },
    { upsert: true }
);

db.entityEventsByUserId.updateOne(
    { userId: 1234 },
    { $push:
            { events:
                    {
                        "type": "update",
                        "id": "94d01c2b-7fb0-4b50-a1ed-5302a1026785",
                        "timestamp": 1544107880000,
                        "entityName": "Note",
                        "entityId": "84244957-f782-45fc-988e-d9954720667d",
                        "payload": {
                            "title": "This is a new note, updated once again on the server",
                            "content": "Woohoo!",
                            "isImportant": true
                        }
                    }
            },
    },
    { upsert: true }
);
