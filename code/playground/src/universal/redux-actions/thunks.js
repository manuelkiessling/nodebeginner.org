import "cross-fetch/polyfill";
import {
    erroredFetchingSessionTokenEvent,
    failedFetchingSessionTokenEvent,
    startedFetchingEntityEventsEvent, startedFetchingSessionTokenEvent,
    startedSyncingEntityEventsEvent,
    succeededFetchingEntityEventsEvent, succeededFetchingSessionTokenEvent, succeededSyncingEntityEventsEvent
} from "./events";
import { getEnvVar } from "../utils/env";

const apiBase = getEnvVar("APP_API_BASE", "");

export const fetchSessionTokenThunk = (username, password) => (dispatch) => {
    dispatch(startedFetchingSessionTokenEvent());
    return fetch(
        apiBase + "/api/session-tokens/",
        {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: username, password: password })
        })
        .then((response) => response.json())
        .then((json) => {
            console.debug(JSON.stringify(json, null, 4));
            if (json.hasOwnProperty("authSuccess") && json.authSuccess === true) {
                dispatch(succeededFetchingSessionTokenEvent());
            } else {
                dispatch(failedFetchingSessionTokenEvent());
            }
        })
        .catch((error) => {
            console.error(error);
            dispatch(erroredFetchingSessionTokenEvent());
        });
};

export const fetchEntityEventsThunk = () => (dispatch) => {
    dispatch(startedFetchingEntityEventsEvent());
    return fetch(apiBase + "/api/entity-events/")
        .then((response) => response.json())
        .then((json) => {
            dispatch(succeededFetchingEntityEventsEvent(json));
            console.debug("Done fetching entity events.");
        })
        .catch((e) => console.error(e));
};

export const pushEntityEventsThunk = (entityName) => (dispatch, getState) => {
    const unsyncedEvents = getState().entities[entityName].unsyncedEvents;

    console.debug(`About to sync unsynced ${entityName} events: ${JSON.stringify(unsyncedEvents, null, 4)}`);

    dispatch(startedSyncingEntityEventsEvent());

    return fetch(
        apiBase + "/api/entity-events/",
        {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(unsyncedEvents)
        })
        .then((response) => response.json())
        .then((json) => {
            dispatch(succeededSyncingEntityEventsEvent(entityName));
            console.debug(JSON.stringify(json, null, 4));
        })
        .catch((e) => console.error(e));
};
