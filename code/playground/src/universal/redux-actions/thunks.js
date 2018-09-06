import "cross-fetch/polyfill";
import { startedFetchingTasksEvent, succeededFetchingTasksEvent } from "./events";
import { getEnvVar } from "../utils/env";

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
