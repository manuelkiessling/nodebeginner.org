import uuidv1 from "uuid";
import { eventTypeUpdate } from "../../../src/universal/entities/eventTypes";
import { createInitialCreateTaskEvent, createTaskEventFromObject } from "../../../src/universal/entities/TaskEvent";
import { createTasksFromTaskEvents } from "../../../src/universal/entities/Task";

describe("createTasksFromTaskEvents", () => {

    it("creates tasks for a correct list of task events", () => {
        const fooTaskCreateEvent = createInitialCreateTaskEvent("foo");
        const taskEvents = [
            fooTaskCreateEvent,
            createTaskEventFromObject({
                id: uuidv1(),
                type: eventTypeUpdate(),
                timestamp: Date.now(),
                taskId: fooTaskCreateEvent.id,
                taskUpdates: { title: "foo2" }
            })
        ];

        const tasks = createTasksFromTaskEvents(taskEvents);

        expect(tasks).toEqual([])
    });

});
