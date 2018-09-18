import "cross-fetch/polyfill";
import { startedFetchingTasksEvent, succeededFetchingTasksEvent } from "./events";
import { getEnvVar } from "../utils/env";
import {TaskEvent, EventPayloadAddTask, eventTypeAddTask} from "../entities/TaskEvent";
import uuidv1 from "uuid";
import { addTaskCommand } from "./commands";
import { handleUserTriggeredChangeEvent } from "../../client/syncHelpers";

const apiBase = getEnvVar("APP_API_BASE", "");

export const fetchTasksThunk = () => (dispatch) => {
    dispatch(startedFetchingTasksEvent());
    return fetch(apiBase + "/api/tasks")
        .then((response) => response.json())
        .then((json) => {
            dispatch(succeededFetchingTasksEvent(json));
            console.debug("Done fetching tasks.");
        })
        .catch((e) => console.error(e));
};


export const addTaskThunk = (task) => (dispatch) => {
    const event = new TaskEvent(
        uuidv1(),
        Date.now(),
        eventTypeAddTask(),
        new EventPayloadAddTask(task)
    );
    handleUserTriggeredChangeEvent(event);
    dispatch(addTaskCommand(task));
};
