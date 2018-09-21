import { combineReducers } from "redux";
import { COMMAND_INITIALIZE, COMMAND_TASK_ADD } from "../redux-actions/commands";
import { EVENT_TASKS_FETCHING_SUCCEEDED } from "../redux-actions/events";
import {createFromObject, createTasksFromTaskEvents} from "../entities/Task";
import {createInitialCreateTaskEvent} from "../entities/TaskEvent";

export const emptyState = () => ({
    entities: {
        tasks: {
            allEvents: [],
            unsyncedEvents: [],
            calculatedEntities: []
        }
    },
    debugInfo: ""
});

const entities = (state = emptyState().entities, action) => {
    switch (action.type) {
        case COMMAND_INITIALIZE:
            return emptyState().entities;
        case COMMAND_TASK_ADD:
            const createTaskEvent = createInitialCreateTaskEvent(action.taskTitle);
            const updatedAllEvents = state.tasks.allEvents.concat(createTaskEvent);
            const updatedUnsyncedEvents = state.tasks.unsyncedEvents.concat(createTaskEvent);
            const updatedCalculatedEntities = createTasksFromTaskEvents(updatedAllEvents);
            return { ...state, tasks: { allEvents: updatedAllEvents, unsyncedEvents: updatedUnsyncedEvents, calculatedEntities: updatedCalculatedEntities } };
        case EVENT_TASKS_FETCHING_SUCCEEDED:
            return state;
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
    entities,
    debugInfo
});
