import fetch from "cross-fetch";

import { startedFetchingTasksEvent, succeededFetchingTasksEvent } from "./events";

export const fetchTasksThunk = () => {
    return (dispatch) => {
        dispatch(startedFetchingTasksEvent());
        return fetch("http://127.0.0.1:8000/api/tasks")
            .then(response => response.json())
            .then(json => dispatch(succeededFetchingTasksEvent(json)))
            .catch((e) => console.error(e));
    }
};
