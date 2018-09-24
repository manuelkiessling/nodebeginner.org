import { combineReducers } from "redux";
import { COMMAND_INITIALIZE, COMMAND_TASK_ADD } from "../redux-actions/commands";
import { EVENT_ENTITY_EVENTS_FETCHING_SUCCEEDED } from "../redux-actions/events";
import { createFromObject, createTasksFromEntityEvents } from "../entities/TaskEntity";
import { CreateTaskEvent, createTaskEventFromObject } from "../entities/EntityEvents";
import { mergeEntityEventArrays } from "../syncHelpers";

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
        case COMMAND_TASK_ADD: {
            const createTaskEvent = CreateTaskEvent.fromTitle(action.taskTitle);
            const updatedAllEvents = state.tasks.allEvents.concat(createTaskEvent);
            const updatedUnsyncedEvents = state.tasks.unsyncedEvents.concat(createTaskEvent);
            const updatedCalculatedEntities = createTasksFromEntityEvents(updatedAllEvents);
            return {
                ...state,
                tasks: {
                    allEvents: updatedAllEvents,
                    unsyncedEvents: updatedUnsyncedEvents,
                    calculatedEntities: updatedCalculatedEntities
                }
            };
        }
        case EVENT_ENTITY_EVENTS_FETCHING_SUCCEEDED: {
            const receivedEntityEvents = action.json.map((entityEventObject) => createTaskEventFromObject(entityEventObject));
            const updatedAllEvents = mergeEntityEventArrays(state.tasks.allEvents, receivedEntityEvents);
            const updatedCalculatedEntities = createTasksFromEntityEvents(updatedAllEvents);
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    allEvents: updatedAllEvents,
                    calculatedEntities: updatedCalculatedEntities
                }
            };
        }
        default:
            return state;
    }
};

const debugInfo = (state = emptyState().debugInfo, action) => {
    switch (action.type) {
        case COMMAND_INITIALIZE:
            return emptyState().debugInfo;
        case EVENT_ENTITY_EVENTS_FETCHING_SUCCEEDED:
            return JSON.stringify(action.json);
        default:
            return state;
    }
};

export const rootReducer = combineReducers({
    entities,
    debugInfo
});
