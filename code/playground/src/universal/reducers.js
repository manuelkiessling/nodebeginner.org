import { combineReducers } from "redux";
import { COMMAND_TASK_ADD } from "./redux-actions/commands";
import { EVENT_TASKS_FETCHING_SUCCEEDED } from "./redux-actions/events";

const initialState = {
    ui: {
        indicateTasksFetching: false
    },
    tasks: [],
    debugInfo: ""
};

// We get and handle one part of the state, the "tasks" array
const tasks = (state = initialState.tasks, action) => {
    switch (action.type) {
        case COMMAND_TASK_ADD:
            return state.concat(action.task);
        case EVENT_TASKS_FETCHING_SUCCEEDED:
            return state.concat(action.json);
        default:
            return state;
    }
};

const debugInfo = (state = initialState.debugInfo, action) => {
    switch (action.type) {
        case EVENT_TASKS_FETCHING_SUCCEEDED:
            return action.json;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    tasks,
    debugInfo
});

export default rootReducer;
