import typeOf from "type-of-data";
import { NoteEntity } from "./NoteEntity";
import { CreateNoteEntityEvent, UpdateNoteEntityEvent } from "./NoteEntityEvents";
import { eventTypes, typeCreate, typeUpdate } from "./EntityEvent";

export const entityNamesToClasses = {
    [NoteEntity.entityName()]: { entityClass: NoteEntity }
};

export class EntityEventFactory {
    static createEntityEventFromObject(obj) {

        const { type, id, timestamp, entityName, entityId, payload } = obj;

        typeOf([
            { type, is: String },
            { id, is: String },
            { timestamp, is: Number },
            { entityName, is: String },
            { entityId, is: String },
            { payload, is: Object }
        ]);

        if (!(entityName in entityNamesToClasses)) {
            throw `${entityName} is not in list of supported entities ${JSON.stringify(entityNamesToClasses)}`
        }

        if (!(eventTypes.includes(type))) {
            throw `${type} is not in list of supported event types ${JSON.stringify(types)}`
        }

        const classes = {
            "CreateNoteEntityEvent": CreateNoteEntityEvent,
            "UpdateNoteEntityEvent": UpdateNoteEntityEvent
        };
        const className = `${type.charAt(0).toUpperCase() + type.substr(1)}${entityName}EntityEvent`;

        if (obj.type === typeCreate() || obj.type === typeUpdate() ) {
            return new classes[className](id, timestamp, entityId, payload)
        }

        throw new Error("Cannot handle object " + JSON.stringify(obj));
    }
}
