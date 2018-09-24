import uuidv1 from "uuid";
import { CreateTaskEntityEvent, UpdateTaskEntityEvent } from "../../../src/universal/entities/TaskEntityEvents";
import { createTasksFromEntityEvents } from "../../../src/universal/entities/TaskEntity";

describe("createTasksFromEntityEvents", () => {

    it("creates tasks for a correct list of task events", () => {
        const fooTaskCreateEvent = CreateTaskEntityEvent.fromTitle("foo");
        const fooTaskUpdateEvent = UpdateTaskEntityEvent.withNewTitle(
            fooTaskCreateEvent.entityId,
            "foo2"
        );

        const barTaskCreateEvent = CreateTaskEntityEvent.fromTitle("bar");
        const barTaskUpdateEvent1 = UpdateTaskEntityEvent.withNewTitle(
            barTaskCreateEvent.entityId,
            "bar2"
        );
        const barTaskUpdateEvent2 = UpdateTaskEntityEvent.withNewTitle(
            barTaskCreateEvent.entityId,
            "bar3"
        );

        const taskEvents = [
            fooTaskCreateEvent,
            barTaskCreateEvent,
            barTaskUpdateEvent1,
            fooTaskUpdateEvent,
            barTaskUpdateEvent2
        ];

        const tasks = createTasksFromEntityEvents(taskEvents);

        expect(tasks).toEqual([
            {
                id: fooTaskCreateEvent.entityId,
                isImportant: false,
                lastModified: fooTaskUpdateEvent.timestamp,
                title: "foo2"
            },
            {
                id: barTaskCreateEvent.entityId,
                isImportant: false,
                lastModified: barTaskUpdateEvent2.timestamp,
                title: "bar3"
            },
        ]);
    });


    it("creates tasks for a correct list of task events where a create and an update event have the same timestamp", () => {
        const fooTaskCreateEvent = CreateTaskEntityEvent.fromTitle("foo");
        const fooTaskUpdateEvent = createTaskEventFromObject({
            id: uuidv1(),
            type: "update",
            timestamp: fooTaskCreateEvent.timestamp,
            taskId: fooTaskCreateEvent.taskId,
            taskUpdates: { title: "foo2" }
        });

        const taskEvents = [
            fooTaskCreateEvent,
            fooTaskUpdateEvent,
        ];

        const tasks = createTasksFromEntityEvents(taskEvents);

        expect(tasks).toEqual([
            {
                id: fooTaskCreateEvent.taskId,
                isDeleted: false,
                lastModified: fooTaskUpdateEvent.timestamp,
                title: "foo2"
            },
        ]);
    });


    it("fails to create tasks for an event list where the update event ", () => {
        const fooTaskCreateEvent = CreateTaskEntityEvent.fromTitle("foo");
        const fooTaskUpdateEvent = createTaskEventFromObject({
            id: uuidv1(),
            type: "update",
            timestamp: fooTaskCreateEvent.timestamp - 1000,
            taskId: fooTaskCreateEvent.taskId,
            taskUpdates: { title: "foo2" }
        });

        const taskEvents = [
            fooTaskCreateEvent,
            fooTaskUpdateEvent,
        ];

        expect(() =>
            createTasksFromEntityEvents([
                fooTaskCreateEvent,
                fooTaskUpdateEvent,
            ])
        ).toThrow();
    });

});
