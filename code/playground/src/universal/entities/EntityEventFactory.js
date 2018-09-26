import typeOf from "type-of-data";
import { TaskEntity } from "./TaskEntity";
import { CreateTaskEntityEvent, UpdateTaskEntityEvent } from "./TaskEntityEvents";
import { eventTypes, typeCreate, typeUpdate } from "./EntityEvent";

export const entityNamesToClasses = {
    [TaskEntity.entityName()]: { entityClass: TaskEntity }
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
            "CreateTaskEntityEvent": CreateTaskEntityEvent,
            "UpdateTaskEntityEvent": UpdateTaskEntityEvent
        };
        const className = `${type.charAt(0).toUpperCase() + type.substr(1)}${entityName}EntityEvent`;

        if (obj.type === typeCreate() || obj.type === typeUpdate() ) {
            return new classes[className](id, timestamp, entityId, payload)
        }

        throw "Cannot handle object " + JSON.stringify(obj);
    }
}
