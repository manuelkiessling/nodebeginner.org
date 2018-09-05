import fetch from "cross-fetch";

import { startedFetchingTasksEvent, succeededFetchingTasksEvent } from "./events";

const apiBase = typeof(process.env.APP_API_BASE) === "undefined" ? "" : process.env.APP_API_BASE;

export const fetchTasksThunk = () => {
    return (dispatch) => {
        dispatch(startedFetchingTasksEvent());
        return fetch(apiBase + "/api/tasks")
            .then(response => response.json())
            .then(json => dispatch(succeededFetchingTasksEvent(json)))
            .catch((e) => console.error(e));
    }
};
