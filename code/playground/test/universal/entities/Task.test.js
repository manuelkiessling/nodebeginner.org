import uuidv1 from "uuid";
import { eventTypeUpdate } from "../../../src/universal/entities/eventTypes";
import { createInitialCreateTaskEvent, createTaskEventFromObject } from "../../../src/universal/entities/TaskEvent";
import { createTasksFromTaskEvents } from "../../../src/universal/entities/Task";

describe("createTasksFromTaskEvents", () => {

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

        const tasks = createTasksFromTaskEvents(taskEvents);

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

});
