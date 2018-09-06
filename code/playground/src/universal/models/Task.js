class Task {
    constructor(id, title) {
        this.title = title;
        this.id = id;
        Object.seal(this); // cannot add attributes in addition to id and title
    }
}

export default Task
