import uuidv4 from "uuid";
import typeOf from "type-of-data";
import { NoteEntity } from "./NoteEntity";
import { CreateEntityEvent, EntityEvent, UpdateEntityEvent } from "./EntityEvent";
import { noteById } from "./Helpers";

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
    constructor(eventId, timestamp, entityId, payload) {
        if (payload.content == null) {
            payload.content = "";
        }
        if (payload.isImportant == null) {
            payload.isImportant = false;
        }
        const { title, content, isImportant } = payload;
        typeOf([
            { title, is: String },
            { content, is: String },
            { isImportant, is: Boolean },
        ]);
        super(eventId, timestamp, NoteEntity.entityName(), entityId, payload);
        Object.seal(this);
        Object.freeze(this);
    }

    static withUpdatedTitle(note, updatedTitle) {
        typeOf([
            { note, is: NoteEntity },
            { updatedTitle, is: String }
        ]);

        return new UpdateNoteEntityEvent(
            EntityEvent.createId(),
            EntityEvent.getCurrentTimestamp(),
            note.id,
            {
                title: updatedTitle,
                content: note.content,
                isImportant: note.isImportant,
            }
        );
    }

    static withUpdatedContent(note, updatedContent) {
        typeOf([
            { note, is: NoteEntity },
            { updatedContent, is: String }
        ]);

        return new UpdateNoteEntityEvent(
            EntityEvent.createId(),
            EntityEvent.getCurrentTimestamp(),
            note.id,
            {
                title: note.title,
                content: updatedContent,
                isImportant: note.isImportant,
            }
        );
    }
}
