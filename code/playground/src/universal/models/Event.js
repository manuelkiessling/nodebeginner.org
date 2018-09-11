export const eventTypeAddTask = () => "add-task";


const eventTypes = [eventTypeAddTask()];


export class EventPayloadAddTask {
    constructor(task) {
        this.payload = task;
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
        this.isSyncedWithBackend = isSyncedWithBackend;
        Object.seal(this);
    }
}
