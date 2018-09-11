import Task from "./Task";

export const eventTypeAddTask = () => "add-task";


const eventTypes = [eventTypeAddTask()];


export class EventPayloadAddTask {
    constructor(task) {
        if (!(task instanceof Task)) {
            throw `Expected instance of class Task, got ${typeof task}`
        }
        this.task = task;
        Object.seal(this);
        Object.freeze(this);
    }
}


export class Event {
    constructor(id, timestamp, type, payload, isSyncedWithBackend = false) {
        if (!eventTypes.includes(type)) {
            throw "Unknown event type " + type;
        }

        if (type === eventTypeAddTask() && !(payload instanceof EventPayloadAddTask)) {
            throw "Payload of type " + typeof payload + " does not match expected type AddTaskEventPayload."
        }

        this.id = id;
        this.timestamp = timestamp;
        this.type = type;
        this.payload = payload;
        this.isSyncedWithBackend = isSyncedWithBackend;
        Object.seal(this);
    }
}
