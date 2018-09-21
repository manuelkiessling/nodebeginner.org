import uuidv1 from "uuid";
import { eventTypeUpdate } from "../../../src/universal/entities/eventTypes";
import { createInitialCreateTaskEvent, createTaskEventFromObject } from "../../../src/universal/entities/TaskEvent";
import { createTasksFromEntityEvents } from "../../../src/universal/entities/Task";

describe("createTasksFromEntityEvents", () => {

    it("creates tasks for a correct list of task events", () => {
        const fooTaskCreateEvent = createInitialCreateTaskEvent("foo");
        const fooTaskUpdateEvent = createTaskEventFromObject({
            id: uuidv1(),
            type: eventTypeUpdate(),
            timestamp: Date.now(),
            taskId: fooTaskCreateEvent.taskId,
            taskUpdates: { title: "foo2" }
        });

        const barTaskCreateEvent = createInitialCreateTaskEvent("bar");
        const barTaskUpdateEvent1 = createTaskEventFromObject({
            id: uuidv1(),
            type: eventTypeUpdate(),
            timestamp: Date.now(),
            taskId: barTaskCreateEvent.taskId,
            taskUpdates: { title: "bar2" }
        });
        const barTaskUpdateEvent2 = createTaskEventFromObject({
            id: uuidv1(),
            type: eventTypeUpdate(),
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
        const fooTaskCreateEvent = createInitialCreateTaskEvent("foo");
        const fooTaskUpdateEvent = createTaskEventFromObject({
            id: uuidv1(),
            type: eventTypeUpdate(),
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
        const fooTaskCreateEvent = createInitialCreateTaskEvent("foo");
        const fooTaskUpdateEvent = createTaskEventFromObject({
            id: uuidv1(),
            type: eventTypeUpdate(),
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
