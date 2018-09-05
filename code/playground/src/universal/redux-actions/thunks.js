import fetch from "cross-fetch";

import { startedFetchingTasksEvent, succeededFetchingTasksEvent } from "./events";

export const fetchTasksThunk = () => {
    return (dispatch) => {
        dispatch(startedFetchingTasksEvent());
        return fetch("/api/tasks")
            .then(response => response.json())
            .then(json => dispatch(succeededFetchingTasksEvent(json)));
    }
};
