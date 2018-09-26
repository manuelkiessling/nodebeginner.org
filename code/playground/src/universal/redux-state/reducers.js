import { combineReducers } from "redux";
import { COMMAND_INITIALIZE, COMMAND_TASK_ADD } from "../redux-actions/commands";
import { EVENT_ENTITY_EVENTS_FETCHING_SUCCEEDED } from "../redux-actions/events";
import { mergeEntityEventArrays } from "../syncHelpers";
import { entityName as taskEntityName } from "../entities/TaskEntity";
import { CreateTaskEntityEvent } from "../entities/TaskEntityEvents";
import { EntityEventFactory, entityNamesToClasses } from "../entities/EntityEventFactory";

export const emptyState = () => {

    const entities = {};

    for (const entityName in entityNamesToClasses) {
        entities[entityName] = {
            allEvents: [],
            unsyncedEvents: [],
            calculatedEntities: [],
        };
    }

    return {
        entities: entities,
        debugInfo: ""
    };
};


const entities = (state = emptyState().entities, action) => {
    switch (action.type) {
        case COMMAND_INITIALIZE:
            return emptyState().entities;
        case COMMAND_TASK_ADD: {
            const createTaskEntityEvent = CreateTaskEntityEvent.withTitle(action.taskTitle);
            const updatedAllEvents = state[taskEntityName].allEvents.concat(createTaskEntityEvent);
            const updatedUnsyncedEvents = state[taskEntityName].unsyncedEvents.concat(createTaskEntityEvent);
            const updatedCalculatedEntities = entityNamesToClasses[taskEntityName].entityClass.createFromEntityEvents(updatedAllEvents);
            return {
                ...state,
                [taskEntityName]: {
                    allEvents: updatedAllEvents,
                    unsyncedEvents: updatedUnsyncedEvents,
                    calculatedEntities: updatedCalculatedEntities
                }
            };
        }
        case EVENT_ENTITY_EVENTS_FETCHING_SUCCEEDED: {
            const receivedEntityEvents = action.json.map((entityEventObject) => EntityEventFactory.createEntityEventFromObject(entityEventObject));
            const updatedAllEvents = mergeEntityEventArrays(state[taskEntityName].allEvents, receivedEntityEvents);
            const updatedCalculatedEntities = entityNamesToClasses[taskEntityName].entityClass.createFromEntityEvents(updatedAllEvents);
            return {
                ...state,
                [taskEntityName]: {
                    ...state[taskEntityName],
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
