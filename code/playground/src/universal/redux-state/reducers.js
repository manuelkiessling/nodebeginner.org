import { combineReducers } from "redux";
import { COMMAND_INITIALIZE, COMMAND_TASK_ADD } from "../redux-actions/commands";
import { EVENT_TASKS_FETCHING_SUCCEEDED } from "../redux-actions/events";
import { createFromObject } from "../models/Task";
import { taskMustBeUpsertedToArray, upsertTaskToArray } from "../../client/syncHelpers";

export const emptyState = () => ({
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
                createFromObject(task)
            );

            let newState = emptyState().tasks;

            for (let i = 0; i < state.tasks.length; i++) {
                newState.push(state.tasks[i]);
            }

            for (let i = 0; i < newTasks.length; i++) {
                if (taskMustBeUpsertedToArray(newTasks[i])) {
                    newState = upsertTaskToArray(newTasks[i], newState);
                }
            }

            return newState;
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
