import uuidv1 from "uuid";
import typeOf from "type-of-data";

export const typeCreate = () => "create";
export const typeUpdate = () => "update";
export const typeDelete = () => "delete";

export const eventTypes = [typeCreate(), typeUpdate(), typeDelete()];


export class EntityEvent {
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
