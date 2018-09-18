import { eventTypeCreate, eventTypes } from "./eventTypes";
import uuidv1 from "uuid";

class CreateTaskEvent {
    constructor(id, timestamp, taskId, taskTitle) {
        this.id = id;
        this.type = eventTypeCreate();
        this.timestamp = timestamp;
        this.taskId = taskId;
        this.taskTitle = taskTitle;
        Object.seal(this);
    }
}

export const createTaskEventFromObject = (obj) => {

    // We intentionally compare `undefined` with ==, not with ===, to implicitly also check against `null`

    if (obj.id == undefined || typeof obj.id !== "string") {
        throw "Event id is not defined or of wrong type in " + JSON.stringify(obj);
    }

    if (obj.type == undefined || typeof obj.type !== "string" || !eventTypes.includes(obj.type)) {
        throw "Event type is not defined or of wrong type or wrong value in" + JSON.stringify(obj);
    }

    if (obj.timestamp == undefined || typeof obj.type !== "number") {
        throw "Event timestamp is not defined or of wrong type in " + JSON.stringify(obj);
    }

    if (obj.type === eventTypeCreate()) {
        if (obj.taskId == undefined || typeof obj.taskId !== "string") {
            throw "Task id is not defined or of wrong type in " + JSON.stringify(obj);
        }
        if (obj.taskTitle == undefined || typeof obj.taskTitle !== "string") {
            throw "Task title is not defined or of wrong type in " + JSON.stringify(obj);
        }
        return new CreateTaskEvent(obj.id, obj.timestamp, obj.taskId)
    }
};

export const createInitialCreateTaskEvent = (taskTitle) => {
    if (typeof taskTitle !== "string") {
        throw "taskTitle must be string";
    }

    createTaskEventFromObject({
        id: uuidv1(),
        timestamp: Date.now(),
        taskId: uuidv1(),
        taskTitle: taskTitle
    });
};
