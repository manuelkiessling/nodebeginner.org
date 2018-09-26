import uuidv4 from "uuid";
import typeOf from "type-of-data";
import { NoteEntity } from "./NoteEntity";
import { CreateEntityEvent, EntityEvent, UpdateEntityEvent } from "./EntityEvent";

export class CreateNoteEntityEvent extends CreateEntityEvent {
    constructor(id, timestamp, entityId, payload) {
        const { title } = payload;
        typeOf({ title, is: String });
        super(id, timestamp, NoteEntity.entityName(), entityId, payload);
        Object.seal(this);
        Object.freeze(this);
    }

    static withTitle(title) {
        typeOf({ title, is: String });

        return new CreateNoteEntityEvent(
            EntityEvent.createId(),
            EntityEvent.getCurrentTimestamp(),
            uuidv4(),
            { title: title }
        );
    }
}

export class UpdateNoteEntityEvent extends UpdateEntityEvent {
    constructor(id, timestamp, entityId, payload) {
        const { title, isImportant } = payload;
        typeOf([
            { title, is: String, optional: true },
            { isImportant, is: Boolean, optional: true },
        ]);
        super(id, timestamp, NoteEntity.entityName(), entityId, payload);
        Object.seal(this);
        Object.freeze(this);
    }

    static withNewTitle(id, title) {
        typeOf([
            { id, is: String },
            { title, is: String }
            ]);

        return new UpdateNoteEntityEvent(
            EntityEvent.createId(),
            EntityEvent.getCurrentTimestamp(),
            id,
            { title: title }
        );
    }
}
