import { CreateTaskEntityEvent, UpdateTaskEntityEvent } from "./TaskEntityEvents";
import typeOf from "type-of-data";

export class TaskEntity {
    static entityName() {
        return "Task";
    };

    constructor(id, title, lastModified, isImportant) {
        typeOf([
            { id, is: String },
            { title, is: String },
            { lastModified, is: Number },
            { isImportant, is: Boolean }
        ]);
        this.id = id;
        this.title = title;
        this.lastModified = lastModified;
        this.isImportant = isImportant;
        Object.seal(this);
    }

    static createFromEntityEvents(entityEvents) {

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

            if (!(typeof obj.isImportant === "boolean")) {
                throw "isImportant must be a boolean"
            }

            return new TaskEntity(obj.id, obj.title, obj.lastModified, obj.isImportant);
        };

        const sortedTaskEntityEvents =
            (entityEvents.slice(0))
                .filter(_ => _ instanceof CreateTaskEntityEvent || _ instanceof UpdateTaskEntityEvent)
                .sort(compareTimestamps);

        console.debug(`Handling ${JSON.stringify(sortedTaskEntityEvents)}...`);

        const taskEntities = [];

        sortedTaskEntityEvents.forEach((entityEvent) => {
            console.debug(`Handling ${JSON.stringify(entityEvent)}...`);

            if (entityEvent instanceof CreateTaskEntityEvent) {
                console.debug(`Using ${JSON.stringify(entityEvent)} to create Task entity...`);
                if (taskEntities.find(_ => _.id === entityEvent.entityId)) {
                    console.error(`Found more than one 'create' event for task ${entityEvent.entityId} in event list, unexpected event is ${JSON.stringify(entityEvent)}`);
                } else {
                    const taskEntity = createTaskFromObject({
                        id: entityEvent.entityId,
                        title: entityEvent.payload.title,
                        lastModified: entityEvent.timestamp,
                        isImportant: false
                    });
                    console.debug(`Creating new task ${JSON.stringify(taskEntity)} from event ${JSON.stringify(entityEvent)}`);
                    taskEntities.push(taskEntity);
                }
            } else if (entityEvent instanceof UpdateTaskEntityEvent) {
                console.debug(`Using ${JSON.stringify(entityEvent)} to update Task entity...`);
                const taskEntity = taskEntities.find(_ => _.id === entityEvent.entityId);
                if (taskEntity == null) {
                    throw `Got an 'update' event for a task that is not yet created, unexpected event is ${JSON.stringify(entityEvent)}`;
                } else {
                    console.debug(`Updating task ${JSON.stringify(taskEntity)} from event ${JSON.stringify(entityEvent)}`);
                    taskEntity.lastModified = entityEvent.timestamp;
                    taskEntity.title = entityEvent.payload.title;
                    console.debug(`Updated task ${JSON.stringify(taskEntity)} from event ${JSON.stringify(entityEvent)}`);
                }
            } else {
                console.debug(`Cannot handle ${JSON.stringify(entityEvent)} because it is an instance of ${entityEvent.constructor.name}`);
            }
        });

        return taskEntities;
    };
}
