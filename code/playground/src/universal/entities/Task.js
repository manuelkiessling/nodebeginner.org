import { eventTypeCreate, eventTypeUpdate } from "./eventTypes";
import { succeededFetchingEntityEventsEvent } from "../redux-actions/events";

export class Task {
    constructor(id, title, lastModified, isDeleted) {
        this.id = id;
        this.title = title;
        this.lastModified = lastModified;
        this.isDeleted = isDeleted;
        Object.seal(this);   // cannot add further attributes
    }
}

const compareTimestamps = (a, b) => {
    if (a.timestamp < b.timestamp)
        return -1;
    if (a.timestamp > b.timestamp)
        return 1;
    return 0;
};

const createTaskFromObject = (obj) => {
    if (!(typeof obj.id === "string")) {
        throw "id must be a string"
    }

    if (!(typeof obj.title === "string")) {
        throw "title must be a string in " + JSON.stringify(obj)
    }

    if (!(typeof obj.lastModified === "number")) {
        throw "lastModified must be a number"
    }

    if (!(typeof obj.isDeleted === "boolean")) {
        throw "isDeleted must be a number"
    }

    return new Task(obj.id, obj.title, obj.lastModified, obj.isDeleted);
};



export const createTasksFromEntityEvents = (entityEvents) => {

    const sortedEntityEvents = (entityEvents.slice(0)).sort(compareTimestamps);

    const tasks = [];

    for (let i = 0; i < sortedEntityEvents.length; i++) {
        const entityEvent = sortedEntityEvents[i];

        if (entityEvent.entityName === "task") {

            if (entityEvent.type === eventTypeCreate()) {
                if (tasks.find(_ => _.id === entityEvent.taskId)) {
                    console.error(`Found more than one 'create' event for task ${entityEvent.taskId} in event list, unexpected event is ${JSON.stringify(entityEvent)}`);
                } else {
                    const task = createTaskFromObject({
                        id: entityEvent.taskId,
                        title: entityEvent.taskTitle,
                        lastModified: entityEvent.timestamp,
                        isDeleted: false
                    });
                    console.debug(`Creating new task ${JSON.stringify(task)} from event ${JSON.stringify(entityEvent)}`);
                    tasks.push(task);
                }
            }

            if (entityEvent.type === eventTypeUpdate()) {
                const task = tasks.find(_ => _.id === entityEvent.taskId);
                if (task == null) {
                    throw `Got an 'update' event for a task that is not yet created, unexpected event is ${JSON.stringify(entityEvent)}`;
                } else {
                    console.debug(`Updating task ${JSON.stringify(task)} from event ${JSON.stringify(entityEvent)}`);
                    task.lastModified = entityEvent.timestamp;
                    task.title = entityEvent.taskUpdates.title;
                    console.debug(`Updated task ${JSON.stringify(task)} from event ${JSON.stringify(entityEvent)}`);
                }
            }

        }
    }

    return tasks;
};
