import { eventTypeCreate, eventTypes, eventTypeUpdate } from "./eventTypes";
import uuidv1 from "uuid";

class CreateTaskEvent {
    constructor(id, timestamp, taskId, taskTitle) {
        this.id = id;
        this.type = eventTypeCreate();
        this.timestamp = timestamp;
        this.taskId = taskId;
        this.taskTitle = taskTitle;
        Object.seal(this);
        Object.freeze(this);
    }
}

class UpdateTaskEvent {
    constructor(id, timestamp, taskId, taskUpdates) {
        this.id = id;
        this.type = eventTypeUpdate();
        this.timestamp = timestamp;
        this.taskId = taskId;
        this.taskUpdates = taskUpdates;
        Object.seal(this);
        Object.freeze(this);
    }
}

export const createTaskEventFromObject = (obj) => {

    // We intentionally compare `undefined` with ==, not with ===, to implicitly also check against `null`

    if (obj.id== null || typeof obj.id !== "string") {
        throw "Event id is not defined or of wrong type in " + JSON.stringify(obj);
    }

    if (obj.type== null || typeof obj.type !== "string" || !eventTypes.includes(obj.type)) {
        throw "Event type is not defined or of wrong type or wrong value in" + JSON.stringify(obj);
    }

    if (obj.timestamp== null || typeof obj.timestamp !== "number") {
        throw "Event timestamp is not defined or of wrong type in " + JSON.stringify(obj);
    }

    if (obj.taskId== null || typeof obj.taskId !== "string") {
        throw "Task id is not defined or of wrong type in " + JSON.stringify(obj);
    }

    if (obj.type === eventTypeCreate()) {
        if (obj.taskTitle== null || typeof obj.taskTitle !== "string") {
            throw "Task title is not defined or of wrong type in " + JSON.stringify(obj);
        }
        return new CreateTaskEvent(obj.id, obj.timestamp, obj.taskId, obj.taskTitle)
    }

    if (obj.type === eventTypeUpdate()) {
        if (obj.taskUpdates== null || typeof obj.taskUpdates !== "object") {
            throw "taskUpdates is not defined or of wrong type in " + JSON.stringify(obj);
        }
        if (obj.taskUpdates.title== null || typeof obj.taskUpdates.title !== "string") {
            throw "taskUpdates.title is not defined or of wrong type in " + JSON.stringify(obj);
        }
        return new UpdateTaskEvent(obj.id, obj.timestamp, obj.taskId, obj.taskUpdates)
    }

    throw "Cannot handle object " + JSON.stringify(obj);
};

export const createInitialCreateTaskEvent = (taskTitle) => {
    if (typeof taskTitle !== "string") {
        throw "taskTitle must be string";
    }

    return createTaskEventFromObject({
        id: uuidv1(),
        type: eventTypeCreate(),
        timestamp: Date.now(),
        taskId: uuidv1(),
        taskTitle: taskTitle
    });
};
