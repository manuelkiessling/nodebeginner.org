import uuidv1 from "uuid";
import typeOf from "type-of-data";
import { entityName } from "./TaskEntity";
import { CreateEntityEvent, EntityEvent, UpdateEntityEvent } from "./EntityEvent";

export class CreateTaskEntityEvent extends CreateEntityEvent {
    constructor(id, timestamp, entityId, payload) {
        const { title } = payload;
        typeOf({ title, is: String });
        super(id, timestamp, entityName, entityId, payload);
        Object.seal(this);
        Object.freeze(this);
    }

    static fromTitle(title) {
        typeOf({ title, is: String });

        return new CreateTaskEntityEvent(
            EntityEvent.createId(),
            EntityEvent.getCurrentTimestamp(),
            uuidv1(),
            { title: title }
        );
    }
}

export class UpdateTaskEntityEvent extends UpdateEntityEvent {
    constructor(id, timestamp, entityId, payload) {
        const { title, isImportant } = payload;
        typeOf([
            { title, is: String, optional: true },
            { isImportant, is: Boolean, optional: true },
        ]);
        super(id, timestamp, entityName, entityId, payload);
        Object.seal(this);
        Object.freeze(this);
    }

    static withNewTitle(id, title) {
        typeOf([
            { id, is: String },
            { title, is: String }
            ]);

        return new UpdateTaskEntityEvent(
            EntityEvent.createId(),
            EntityEvent.getCurrentTimestamp(),
            id,
            { title: title }
        );
    }
}
