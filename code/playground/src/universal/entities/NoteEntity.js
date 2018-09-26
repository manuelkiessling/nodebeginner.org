import { CreateNoteEntityEvent, UpdateNoteEntityEvent } from "./NoteEntityEvents";
import typeOf from "type-of-data";

export class NoteEntity {
    static entityName() {
        return "Note";
    };

    constructor(id, title, lastModified, isImportant) {
        typeOf([
            { id, is: String },
            { title, is: String },
            { lastModified, is: Number },
            { isImportant, is: Boolean }
        ]);
        this.id = id;
        this.title = title;
        this.lastModified = lastModified;
        this.isImportant = isImportant;
        Object.seal(this);
    }

    static createFromEntityEvents(entityEvents) {

        const compareTimestamps = (a, b) => {
            if (a.timestamp < b.timestamp)
                return -1;
            if (a.timestamp > b.timestamp)
                return 1;
            return 0;
        };

        const createNoteFromObject = (obj) => {
            if (!(typeof obj.id === "string")) {
                throw "id must be a string"
            }

            if (!(typeof obj.title === "string")) {
                throw "title must be a string in " + JSON.stringify(obj)
            }

            if (!(typeof obj.lastModified === "number")) {
                throw "lastModified must be a number"
            }

            if (!(typeof obj.isImportant === "boolean")) {
                throw "isImportant must be a boolean"
            }

            return new NoteEntity(obj.id, obj.title, obj.lastModified, obj.isImportant);
        };

        const sortedNoteEntityEvents =
            (entityEvents.slice(0))
                .filter(_ => _ instanceof CreateNoteEntityEvent || _ instanceof UpdateNoteEntityEvent)
                .sort(compareTimestamps);

        console.debug(`Handling ${JSON.stringify(sortedNoteEntityEvents)}...`);

        const noteEntities = [];

        sortedNoteEntityEvents.forEach((entityEvent) => {
            console.debug(`Handling ${JSON.stringify(entityEvent)}...`);

            if (entityEvent instanceof CreateNoteEntityEvent) {
                console.debug(`Using ${JSON.stringify(entityEvent)} to create Note entity...`);
                if (noteEntities.find(_ => _.id === entityEvent.entityId)) {
                    console.error(`Found more than one 'create' event for note ${entityEvent.entityId} in event list, unexpected event is ${JSON.stringify(entityEvent)}`);
                } else {
                    const noteEntity = createNoteFromObject({
                        id: entityEvent.entityId,
                        title: entityEvent.payload.title,
                        lastModified: entityEvent.timestamp,
                        isImportant: false
                    });
                    console.debug(`Creating new note ${JSON.stringify(noteEntity)} from event ${JSON.stringify(entityEvent)}`);
                    noteEntities.push(noteEntity);
                }
            } else if (entityEvent instanceof UpdateNoteEntityEvent) {
                console.debug(`Using ${JSON.stringify(entityEvent)} to update Note entity...`);
                const noteEntity = noteEntities.find(_ => _.id === entityEvent.entityId);
                if (noteEntity == null) {
                    throw `Got an 'update' event for a note that is not yet created, unexpected event is ${JSON.stringify(entityEvent)}`;
                } else {
                    console.debug(`Updating note ${JSON.stringify(noteEntity)} from event ${JSON.stringify(entityEvent)}`);
                    noteEntity.lastModified = entityEvent.timestamp;
                    noteEntity.title = entityEvent.payload.title;
                    console.debug(`Updated note ${JSON.stringify(noteEntity)} from event ${JSON.stringify(entityEvent)}`);
                }
            } else {
                console.debug(`Cannot handle ${JSON.stringify(entityEvent)} because it is an instance of ${entityEvent.constructor.name}`);
            }
        });

        return noteEntities;
    };
}
