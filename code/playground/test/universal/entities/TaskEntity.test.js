import uuidv1 from "uuid";
import { CreateTaskEvent, createTaskEventFromObject } from "../../../src/universal/entities/EntityEvents";
import { createTasksFromEntityEvents } from "../../../src/universal/entities/TaskEntity";

describe("createTasksFromEntityEvents", () => {

    it("creates tasks for a correct list of task events", () => {
        const fooTaskCreateEvent = CreateTaskEvent.fromTitle("foo");
        const fooTaskUpdateEvent = createTaskEventFromObject({
            id: uuidv1(),
            type: "update",
            timestamp: Date.now(),
            taskId: fooTaskCreateEvent.taskId,
            taskUpdates: { title: "foo2" }
        });

        const barTaskCreateEvent = CreateTaskEvent.fromTitle("bar");
        const barTaskUpdateEvent1 = createTaskEventFromObject({
            id: uuidv1(),
            type: "update",
            timestamp: Date.now(),
            taskId: barTaskCreateEvent.taskId,
            taskUpdates: { title: "bar2" }
        });
        const barTaskUpdateEvent2 = createTaskEventFromObject({
            id: uuidv1(),
            type: "update",
            timestamp: Date.now(),
            taskId: barTaskCreateEvent.taskId,
            taskUpdates: { title: "bar3" }
        });

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
                id: fooTaskCreateEvent.taskId,
                isDeleted: false,
                lastModified: fooTaskUpdateEvent.timestamp,
                title: "foo2"
            },
            {
                id: barTaskCreateEvent.taskId,
                isDeleted: false,
                lastModified: barTaskUpdateEvent2.timestamp,
                title: "bar3"
            },
        ]);
    });


    it("creates tasks for a correct list of task events where a create and an update event have the same timestamp", () => {
        const fooTaskCreateEvent = CreateTaskEvent.fromTitle("foo");
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
        const fooTaskCreateEvent = CreateTaskEvent.fromTitle("foo");
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
