import { eventTypeCreate, eventTypeUpdate } from "./eventTypes";
import uuidv1 from "uuid";
import typeOf from "type-of-data";

export class CreateTaskEvent {
    constructor(id, timestamp, taskId, taskTitle) {
        this.id = id;
        this.entityName = "task";
        this.type = eventTypeCreate();
        this.timestamp = timestamp;
        this.taskId = taskId;
        this.taskTitle = taskTitle;
        Object.seal(this);
        Object.freeze(this);
    }

    static fromTitle(title) {
        typeOf({ title, is: String });

        return createTaskEventFromObject({
            id: uuidv1(),
            type: eventTypeCreate(),
            timestamp: Date.now(),
            taskId: uuidv1(),
            taskTitle: title
        });
    }
}

class UpdateTaskEvent {
    constructor(id, timestamp, taskId, taskUpdates) {
        this.id = id;
        this.entityName = "task";
        this.type = eventTypeUpdate();
        this.timestamp = timestamp;
        this.taskId = taskId;
        this.taskUpdates = taskUpdates;
        Object.seal(this);
        Object.freeze(this);
    }
}

export const createTaskEventFromObject = (obj) => {

    const { id, type, timestamp, taskId, taskTitle, taskUpdates } = obj;

    typeOf([
        { id, is: String },
        { type, is: String },
        { timestamp, is: Number },
        { taskId, is: String },
    ]);

    if (obj.type === eventTypeCreate()) {
        typeOf({ taskTitle, is: String });
        return new CreateTaskEvent(obj.id, obj.timestamp, obj.taskId, obj.taskTitle)
    }

    if (obj.type === eventTypeUpdate()) {
        typeOf({ taskUpdates, is: Object });
        const { title } = obj.taskUpdates;
        typeOf({ title, is: String });
        return new UpdateTaskEvent(obj.id, obj.timestamp, obj.taskId, obj.taskUpdates)
    }

    throw "Cannot handle object " + JSON.stringify(obj);
};
