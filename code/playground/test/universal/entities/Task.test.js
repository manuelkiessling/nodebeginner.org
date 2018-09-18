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
        const taskEvents = [
            fooTaskCreateEvent,
            fooTaskUpdateEvent
        ];

        const tasks = createTasksFromTaskEvents(taskEvents);

        expect(tasks).toEqual([{
            id: fooTaskCreateEvent.taskId,
            isDeleted: false,
            lastModified: fooTaskUpdateEvent.timestamp,
            title: "foo2"
        }]);
    });

});
