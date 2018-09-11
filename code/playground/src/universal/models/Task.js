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
        Object.seal(this); // cannot add attributes in addition to id and title
    }
}
