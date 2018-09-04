export const EVENT_TASKS_FETCHING_STARTED = "EVENT_TASKS_FETCHING_STARTED";
export const EVENT_TASKS_FETCHING_SUCCEEDED = "EVENT_TASKS_FETCHING_SUCCEEDED";
export const EVENT_TASKS_FETCHING_ERRORED = "EVENT_TASKS_FETCHING_ERRORED";

export const startedFetchingTasksEvent = () => ({ type: EVENT_TASKS_FETCHING_STARTED });

export const succeededFetchingTasksEvent = (json) => ({ type: EVENT_TASKS_FETCHING_SUCCEEDED, json: json });
