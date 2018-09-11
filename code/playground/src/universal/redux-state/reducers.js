import { combineReducers } from "redux";
import { COMMAND_INITIALIZE, COMMAND_TASK_ADD } from "../redux-actions/commands";
import { EVENT_TASKS_FETCHING_SUCCEEDED } from "../redux-actions/events";
import Task from "../models/Task";

export const emptyState = () => ({
    ui: {
        indicateTasksFetching: false
    },
    tasks: [],
    debugInfo: ""
});

// We get and handle one part of the state, the "tasks" array
const tasks = (state = emptyState().tasks, action) => {
    switch (action.type) {
        case COMMAND_INITIALIZE:
            return emptyState().tasks;
        case COMMAND_TASK_ADD:
            return state.concat(action.task);
        case EVENT_TASKS_FETCHING_SUCCEEDED:
            const newTasks = action.json.map( task =>
                new Task(task.id, task.title)
            );
            return state.concat(newTasks);
        default:
            return state;
    }
};

const debugInfo = (state = emptyState().debugInfo, action) => {
    switch (action.type) {
        case COMMAND_INITIALIZE:
            return emptyState().debugInfo;
        case EVENT_TASKS_FETCHING_SUCCEEDED:
            return action.json;
        default:
            return state;
    }
};

export const rootReducer = combineReducers({
    tasks,
    debugInfo
});
