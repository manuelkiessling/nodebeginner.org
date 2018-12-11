import uuidv4 from "uuid";
import typeOf from "type-of-data";

export const typeCreate = () => "create";
export const typeUpdate = () => "update";
export const typeDelete = () => "delete";

export const eventTypes = [typeCreate(), typeUpdate(), typeDelete()];


export class EntityEvent {
    constructor(type, id, timestamp, entityName, entityId, payload) { // TODO: add userId attribute, only fetch/push events for current user
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
        return uuidv4();
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

export const mergeEntityEventArrays = (entityEventsA, entityEventsB) => {
    typeOf([
        { entityEventsA, is: Array },
        { entityEventsB, is: Array }
    ]);

    const mergedEntityEvents = entityEventsA.splice(0);

    console.debug(`Merging entity events ${JSON.stringify(entityEventsB, null, 4)} into ${JSON.stringify(mergedEntityEvents, null, 4)}`);

    entityEventsB.forEach((entityEventB) => {
        if (!mergedEntityEvents.find((mergedEntityEvent) => mergedEntityEvent.id === entityEventB.id)) {
            console.debug(`Adding entity event ${JSON.stringify(entityEventB, null, 4)} to ${JSON.stringify(mergedEntityEvents, null, 4)}`);
            mergedEntityEvents.push(entityEventB)
        } else {
            console.debug(`Entity event ${JSON.stringify(entityEventB, null, 4)} already in ${JSON.stringify(mergedEntityEvents, null, 4)}`);
        }
    });
    return mergedEntityEvents;
};
