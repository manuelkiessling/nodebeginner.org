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
        isLoggedIn: false,
        ui: {
            selectedNoteId: null,
            errorMessage: ""
        },
        debugInfo: ""
    };
};


const entities = (state = emptyState().entities, action) => {
    switch (action.type) {
        case COMMAND_INITIALIZE:
            return emptyState().entities;
        case COMMAND_NOTE_CREATE: {
            const createNoteEntityEvent = CreateNoteEntityEvent.withTitle(action.noteTitle);
            const updatedAllEvents = state[NoteEntity.entityName()].allEvents.concat(createNoteEntityEvent);
            const updatedUnsyncedEvents = state[NoteEntity.entityName()].unsyncedEvents.concat(createNoteEntityEvent);
            const updatedCalculatedEntities = entityNamesToClasses[NoteEntity.entityName()].entityClass.createFromEntityEvents(updatedAllEvents);
            return {
                ...state,
                [NoteEntity.entityName()]: {
                    allEvents: updatedAllEvents,
                    unsyncedEvents: updatedUnsyncedEvents,
                    calculatedEntities: updatedCalculatedEntities
                }
            };
        }
        case COMMAND_NOTE_UPDATE_TITLE: {
            const updateNoteEntityEvent = UpdateNoteEntityEvent.withUpdatedTitle(action.note, action.updatedTitle);
            const updatedAllEvents = state[NoteEntity.entityName()].allEvents.concat(updateNoteEntityEvent);
            const updatedUnsyncedEvents = state[NoteEntity.entityName()].unsyncedEvents.concat(updateNoteEntityEvent);
            const updatedCalculatedEntities = entityNamesToClasses[NoteEntity.entityName()].entityClass.createFromEntityEvents(updatedAllEvents);
            return {
                ...state,
                [NoteEntity.entityName()]: {
                    allEvents: updatedAllEvents,
                    unsyncedEvents: updatedUnsyncedEvents,
                    calculatedEntities: updatedCalculatedEntities
                }
            };
        }
        case COMMAND_NOTE_UPDATE_CONTENT: {
            const updateNoteEntityEvent = UpdateNoteEntityEvent.withUpdatedContent(action.note, action.updatedContent);
            const updatedAllEvents = state[NoteEntity.entityName()].allEvents.concat(updateNoteEntityEvent);
            const updatedUnsyncedEvents = state[NoteEntity.entityName()].unsyncedEvents.concat(updateNoteEntityEvent);
            const updatedCalculatedEntities = entityNamesToClasses[NoteEntity.entityName()].entityClass.createFromEntityEvents(updatedAllEvents);
            return {
                ...state,
                [NoteEntity.entityName()]: {
                    allEvents: updatedAllEvents,
                    unsyncedEvents: updatedUnsyncedEvents,
                    calculatedEntities: updatedCalculatedEntities
                }
            };
        }
        case EVENT_ENTITY_EVENTS_FETCHING_SUCCEEDED: {
            const receivedEntityEvents = action.json.map((entityEventObject) => EntityEventFactory.createEntityEventFromObject(entityEventObject));
            const updatedAllEvents = mergeEntityEventArrays(state[NoteEntity.entityName()].allEvents, receivedEntityEvents);
            const updatedCalculatedEntities = entityNamesToClasses[NoteEntity.entityName()].entityClass.createFromEntityEvents(updatedAllEvents);
            return {
                ...state,
                [NoteEntity.entityName()]: {
                    ...state[NoteEntity.entityName()],
                    allEvents: updatedAllEvents,
                    calculatedEntities: updatedCalculatedEntities
                }
            };
        }
        case EVENT_ENTITY_EVENTS_PUSHING_SUCCEEDED: {
            const entityName = action.entityName;
            return {
                ...state,
                [entityName]: {
                    ...state[NoteEntity.entityName()],
                    unsyncedEvents: []
                }
            };
        }
        default:
            return state;
    }
};

const isLoggedIn = (state = emptyState().ui, action) => {
    switch (action.type) {
        case EVENT_SESSION_TOKEN_FETCHING_SUCCEEDED:
            return true;
        case EVENT_SESSION_TOKEN_FETCHING_FAILED:
            return false;
        case EVENT_SESSION_TOKEN_FETCHING_ERRORED:
            return false;
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
    isLoggedIn,
    ui,
    debugInfo
});
