import { combineReducers } from "redux";
import {
    COMMAND_INITIALIZE,
    COMMAND_NOTE_CREATE,
    COMMAND_NOTE_SELECT,
    COMMAND_NOTE_UPDATE_CONTENT,
    COMMAND_NOTE_UPDATE_TITLE
} from "../redux-actions/commands";
import {
    EVENT_ENTITY_EVENTS_FETCHING_SUCCEEDED,
    EVENT_ENTITY_EVENTS_PUSHING_SUCCEEDED,
    EVENT_SESSION_TOKEN_FETCHING_ERRORED,
    EVENT_SESSION_TOKEN_FETCHING_FAILED,
    EVENT_SESSION_TOKEN_FETCHING_SUCCEEDED
} from "../redux-actions/events";
import { mergeEntityEventArrays } from "../entities/EntityEvent";
import { NoteEntity } from "../entities/NoteEntity";
import { CreateNoteEntityEvent, UpdateNoteEntityEvent } from "../entities/NoteEntityEvents";
import { EntityEventFactory, entityNamesToClasses } from "../entities/EntityEventFactory";

export const emptyState = () => {
    return {
        entities: {},
        session: {
            isLoggedIn: false,
            userId: null,
        },
        ui: {
            selectedNoteId: null,
            errorMessage: ""
        },
        debugInfo: ""
    };
};

const entities = (state = emptyState().entities, action) => {

    const initializeForUserId = (entitiesFromState, userId) => {
        if (!entitiesFromState.hasOwnProperty(userId)) {
            const entities = {};
            for (const entityName in entityNamesToClasses) {
                entities[entityName] = {
                    allEvents: [],
                    unsyncedEvents: [],
                    calculatedEntities: []
                }
            }
            return {
                ...entitiesFromState,
                [action.userId]: entities
            };
        } else {
            return entitiesFromState;
        }
    };


    switch (action.type) {
        case COMMAND_INITIALIZE:
            return emptyState().entities;
        case EVENT_SESSION_TOKEN_FETCHING_SUCCEEDED:
            return initializeForUserId(state, action.userId);
        case COMMAND_NOTE_CREATE: {
            const createNoteEntityEvent = CreateNoteEntityEvent.withTitle(action.noteTitle);
            const updatedAllEvents = state[action.userId][NoteEntity.entityName()].allEvents.concat(createNoteEntityEvent);
            const updatedUnsyncedEvents = state[action.userId][NoteEntity.entityName()].unsyncedEvents.concat(createNoteEntityEvent);
            const updatedCalculatedEntities = entityNamesToClasses[NoteEntity.entityName()].entityClass.createFromEntityEvents(updatedAllEvents);
            return {
                ...state,
                [action.userId]: {
                    ...state[action.userId],
                    [NoteEntity.entityName()]: {
                        allEvents: updatedAllEvents,
                        unsyncedEvents: updatedUnsyncedEvents,
                        calculatedEntities: updatedCalculatedEntities
                    }
                }
            };
        }
        case COMMAND_NOTE_UPDATE_TITLE: {
            const updateNoteEntityEvent = UpdateNoteEntityEvent.withUpdatedTitle(action.note, action.updatedTitle);
            const updatedAllEvents = state[action.userId][NoteEntity.entityName()].allEvents.concat(updateNoteEntityEvent);
            const updatedUnsyncedEvents = state[action.userId][NoteEntity.entityName()].unsyncedEvents.concat(updateNoteEntityEvent);
            const updatedCalculatedEntities = entityNamesToClasses[NoteEntity.entityName()].entityClass.createFromEntityEvents(updatedAllEvents);
            return {
                ...state,
                [action.userId]: {
                    ...state[action.userId],
                    [NoteEntity.entityName()]: {
                        allEvents: updatedAllEvents,
                        unsyncedEvents: updatedUnsyncedEvents,
                        calculatedEntities: updatedCalculatedEntities
                    }
                }
            };
        }
        case COMMAND_NOTE_UPDATE_CONTENT: {
            const updateNoteEntityEvent = UpdateNoteEntityEvent.withUpdatedContent(action.note, action.updatedContent);
            const updatedAllEvents = state[action.userId][NoteEntity.entityName()].allEvents.concat(updateNoteEntityEvent);
            const updatedUnsyncedEvents = state[action.userId][NoteEntity.entityName()].unsyncedEvents.concat(updateNoteEntityEvent);
            const updatedCalculatedEntities = entityNamesToClasses[NoteEntity.entityName()].entityClass.createFromEntityEvents(updatedAllEvents);
            return {
                ...state,
                [action.userId]: {
                    ...state[action.userId],
                    [NoteEntity.entityName()]: {
                        allEvents: updatedAllEvents,
                        unsyncedEvents: updatedUnsyncedEvents,
                        calculatedEntities: updatedCalculatedEntities
                    }
                }
            };
        }
        case EVENT_ENTITY_EVENTS_FETCHING_SUCCEEDED: {
            state = initializeForUserId(state, action.userId);
            const receivedEntityEvents = action.json.map((entityEventObject) => EntityEventFactory.createEntityEventFromObject(entityEventObject));
            const updatedAllEvents = mergeEntityEventArrays(state[action.userId][NoteEntity.entityName()].allEvents, receivedEntityEvents);
            const updatedCalculatedEntities = entityNamesToClasses[NoteEntity.entityName()].entityClass.createFromEntityEvents(updatedAllEvents);
            return {
                ...state,
                [action.userId]: {
                    ...state[action.userId],
                    [NoteEntity.entityName()]: {
                        ...state[action.userId][NoteEntity.entityName()],
                        allEvents: updatedAllEvents,
                        calculatedEntities: updatedCalculatedEntities
                    }
                }
            };
        }
        case EVENT_ENTITY_EVENTS_PUSHING_SUCCEEDED: {
            return {
                ...state,
                [action.userId]: {
                    ...state[action.userId],
                    [action.entityName]: {
                        ...state[action.userId][action.entityName],
                        unsyncedEvents: []
                    }
                }
            };
        }
        default:
            return state;
    }
};

const session = (state = emptyState().session, action) => {
    switch (action.type) {
        case EVENT_SESSION_TOKEN_FETCHING_SUCCEEDED:
            return {
                isLoggedIn: true,
                userId: action.userId,
            };
        case EVENT_SESSION_TOKEN_FETCHING_FAILED:
            return {
                isLoggedIn: false,
                userId: null,
            };
        case EVENT_SESSION_TOKEN_FETCHING_ERRORED:
            return {
                isLoggedIn: state.isLoggedIn,
                userId: state.userId,
            };
        default:
            return state;
    }
};


const ui = (state = emptyState().ui, action) => {
    switch (action.type) {
        case COMMAND_INITIALIZE:
            return emptyState().ui;
        case COMMAND_NOTE_SELECT:
            return {
               ...state,
                selectedNoteId: action.note.id
            };
        case EVENT_SESSION_TOKEN_FETCHING_SUCCEEDED:
            return emptyState().ui;
        case EVENT_SESSION_TOKEN_FETCHING_FAILED:
            return {
                ...state,
                errorMessage: "Login failed due to invalid credentials."
            };
        case EVENT_SESSION_TOKEN_FETCHING_ERRORED:
            return {
                ...state,
                errorMessage: "Login failed due to an unknown error."
            };
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
    session,
    ui,
    debugInfo
});
