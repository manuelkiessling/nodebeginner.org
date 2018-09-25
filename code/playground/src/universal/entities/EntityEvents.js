import uuidv1 from "uuid";
import typeOf from "type-of-data";
import { CreateTaskEntityEvent, UpdateTaskEntityEvent } from "./TaskEntityEvents";

export const supportedEntities = ["Task"];

export const typeCreate = () => "create";
const typeUpdate = () => "update";
const typeDelete = () => "delete";

const eventTypes = [typeCreate(), typeUpdate(), typeDelete()];


class EntityEvent {
    constructor(type, id, timestamp, entityName, entityId, payload) {
        typeOf([
            { type, is: String },
            { id, is: String },
            { timestamp, is: Number },
            { entityName, is: String },
            { entityId, is: String },
            { payload, is: Object }
        ]);
        this.type = type;
        this.id = id;
        this.timestamp = timestamp;
        this.entityName = entityName;
        this.entityId = entityId;
        this.payload = payload;
        Object.seal(this);
        Object.freeze(this);
    }

    static createId() {
        return uuidv1();
    }

    static getCurrentTimestamp() {
        return Date.now();
    }
}

export class CreateEntityEvent extends EntityEvent {
    constructor(id, timestamp, entityName, entityId, payload) {
        super(typeCreate(), id, timestamp, entityName, entityId, payload);
    }
}

export class UpdateEntityEvent extends EntityEvent {
    constructor(id, timestamp, entityName, entityId, payload) {
        super(typeUpdate(), id, timestamp, entityName, entityId, payload);
    }
}

export const createEntityEventFromObject = (obj) => {

    const { type, id, timestamp, entityName, entityId, payload } = obj;

    typeOf([
        { type, is: String },
        { id, is: String },
        { timestamp, is: Number },
        { entityName, is: String },
        { entityId, is: String },
        { payload, is: Object }
    ]);

    if (!(supportedEntities.includes(entityName))) {
        throw `${entityName} is not in list of supported entities ${JSON.stringify(supportedEntities)}`
    }

    if (!(eventTypes.includes(type))) {
        throw `${type} is not in list of supported event types ${JSON.stringify(types)}`
    }

    const classes = {
        'CreateTaskEntityEvent': CreateTaskEntityEvent,
        'UpdateTaskEntityEvent': UpdateTaskEntityEvent
    };
    const className = `${type.charAt(0).toUpperCase() + type.substr(1)}${entityName}EntityEvent`;

    if (obj.type === typeCreate() || obj.type === typeUpdate() ) {
        return new classes[className](id, timestamp, entityId, payload)
    }

    throw "Cannot handle object " + JSON.stringify(obj);
};
