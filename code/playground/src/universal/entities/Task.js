export default class Task {
    constructor(id, title, lastModified) {
        if (!(typeof id === "string")) {
            throw "id must be a string"
        }

        if (!(typeof title === "string")) {
            throw "title must be a string"
        }

        if (!(typeof lastModified === "number")) {
            throw "lastModified must be a number"
        }

        this.id = id;
        this.title = title;
        this.lastModified = lastModified;
        Object.seal(this); // cannot add further attributes
    }
}

export const createFromObject = (obj) => new Task(obj.id, obj.title, obj.lastModified);
