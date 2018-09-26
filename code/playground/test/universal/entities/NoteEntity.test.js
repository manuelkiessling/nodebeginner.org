import uuidv1 from "uuid";
import { CreateNoteEntityEvent, UpdateNoteEntityEvent } from "../../../src/universal/entities/NoteEntityEvents";
import { NoteEntity } from "../../../src/universal/entities/NoteEntity";

describe("NoteEntity", () => {
    describe("createFromEntityEvents", () => {

        it("creates notes for a correct list of note events", () => {
            const fooNoteCreateEvent = CreateNoteEntityEvent.withTitle("foo");
            const fooNoteUpdateEvent = UpdateNoteEntityEvent.withNewTitle(
                fooNoteCreateEvent.entityId,
                "foo2"
            );

            const barNoteCreateEvent = CreateNoteEntityEvent.withTitle("bar");
            const barNoteUpdateEvent1 = UpdateNoteEntityEvent.withNewTitle(
                barNoteCreateEvent.entityId,
                "bar2"
            );
            const barNoteUpdateEvent2 = UpdateNoteEntityEvent.withNewTitle(
                barNoteCreateEvent.entityId,
                "bar3"
            );

            const noteEvents = [
                fooNoteCreateEvent,
                barNoteCreateEvent,
                barNoteUpdateEvent1,
                fooNoteUpdateEvent,
                barNoteUpdateEvent2
            ];

            const notes = NoteEntity.createFromEntityEvents(noteEvents);

            expect(notes).toEqual([
                {
                    id: fooNoteCreateEvent.entityId,
                    isImportant: false,
                    lastModified: fooNoteUpdateEvent.timestamp,
                    title: "foo2"
                },
                {
                    id: barNoteCreateEvent.entityId,
                    isImportant: false,
                    lastModified: barNoteUpdateEvent2.timestamp,
                    title: "bar3"
                },
            ]);
        });


        it("creates notes for a correct list of note events where a create and an update event have the same timestamp", () => {
            const fooNoteCreateEvent = CreateNoteEntityEvent.withTitle("foo");
            const fooNoteUpdateEvent = UpdateNoteEntityEvent.withNewTitle(
                fooNoteCreateEvent.entityId,
                "foo2"
            );

            const noteEvents = [
                fooNoteCreateEvent,
                fooNoteUpdateEvent,
            ];

            const notes = NoteEntity.createFromEntityEvents(noteEvents);

            expect(notes).toEqual([
                {
                    id: fooNoteCreateEvent.entityId,
                    isImportant: false,
                    lastModified: fooNoteUpdateEvent.timestamp,
                    title: "foo2"
                },
            ]);
        });


        it("fails to create notes for an event list where the update event is older than the create event", () => {
            const fooNoteCreateEvent = CreateNoteEntityEvent.withTitle("foo");
            const fooNoteUpdateEvent = new UpdateNoteEntityEvent(
                uuidv1(),
                fooNoteCreateEvent.timestamp - 1000,
                fooNoteCreateEvent.entityId,
                { title: "foo2" }
            );

            expect(() =>
                NoteEntity.createFromEntityEvents([
                    fooNoteCreateEvent,
                    fooNoteUpdateEvent,
                ])
            ).toThrow();
        });

    });

});
