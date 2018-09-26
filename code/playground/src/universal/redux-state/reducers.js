import { combineReducers } from "redux";
import { COMMAND_INITIALIZE, COMMAND_TASK_ADD } from "../redux-actions/commands";
import { EVENT_ENTITY_EVENTS_FETCHING_SUCCEEDED } from "../redux-actions/events";
import { mergeEntityEventArrays } from "../entities/EntityEvent";
import { TaskEntity } from "../entities/TaskEntity";
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
            const updatedAllEvents = state[TaskEntity.entityName()].allEvents.concat(createTaskEntityEvent);
            const updatedUnsyncedEvents = state[TaskEntity.entityName()].unsyncedEvents.concat(createTaskEntityEvent);
            const updatedCalculatedEntities = entityNamesToClasses[TaskEntity.entityName()].entityClass.createFromEntityEvents(updatedAllEvents);
            return {
                ...state,
                [TaskEntity.entityName()]: {
                    allEvents: updatedAllEvents,
                    unsyncedEvents: updatedUnsyncedEvents,
                    calculatedEntities: updatedCalculatedEntities
                }
            };
        }
        case EVENT_ENTITY_EVENTS_FETCHING_SUCCEEDED: {
            const receivedEntityEvents = action.json.map((entityEventObject) => EntityEventFactory.createEntityEventFromObject(entityEventObject));
            const updatedAllEvents = mergeEntityEventArrays(state[TaskEntity.entityName()].allEvents, receivedEntityEvents);
            const updatedCalculatedEntities = entityNamesToClasses[TaskEntity.entityName()].entityClass.createFromEntityEvents(updatedAllEvents);
            return {
                ...state,
                [TaskEntity.entityName()]: {
                    ...state[TaskEntity.entityName()],
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
