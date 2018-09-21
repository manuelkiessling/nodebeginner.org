import { eventTypeCreate, eventTypeUpdate } from "./eventTypes";
import { succeededFetchingTasksEvent } from "../redux-actions/events";

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



export const createTasksFromTaskEvents = (taskEvents) => {

    const sortedTaskEvents = (taskEvents.slice(0)).sort(compareTimestamps);

    const tasks = [];

    for (let i = 0; i < sortedTaskEvents.length; i++) {
        const taskEvent = sortedTaskEvents[i];

        if (taskEvent.type === eventTypeCreate()) {
            if (tasks.find(_ => _.id === taskEvent.taskId)) {
                console.error(`Found more than one 'create' event for task ${taskEvent.taskId} in event list, unexpected event is ${JSON.stringify(taskEvent)}`);
            } else {
                tasks.push(createTaskFromObject({ id: taskEvent.taskId, title: taskEvent.taskTitle, lastModified: taskEvent.timestamp, isDeleted: false }));
            }
        }

        if (taskEvent.type === eventTypeUpdate()) {
            const task = tasks.find(_ => _.id === taskEvent.taskId);
            if (task == null) {
                throw `Got an 'update' event for a task that is not yet created, unexpected event is ${JSON.stringify(taskEvent)}`;
            } else {
                task.lastModified = taskEvent.timestamp;
                task.title = taskEvent.taskUpdates.title;
            }
        }
    }

    return tasks;
};
