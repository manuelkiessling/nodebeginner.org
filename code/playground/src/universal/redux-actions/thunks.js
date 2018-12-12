import "cross-fetch/polyfill";
import {
    erroredFetchingSessionTokenEvent, failedFetchingEntityEventsEvent,
    failedFetchingSessionTokenEvent, failedPushingEntityEventsEvent,
    startedFetchingEntityEventsEvent, startedFetchingSessionTokenEvent,
    startedPushingEntityEventsEvent,
    succeededFetchingEntityEventsEvent, succeededFetchingSessionTokenEvent, succeededPushingEntityEventsEvent
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
            if (json.hasOwnProperty("authSuccess") && json.authSuccess === true && json.hasOwnProperty("userId") && json.userId != null) {
                dispatch(succeededFetchingSessionTokenEvent(json.userId));
            } else {
                dispatch(failedFetchingSessionTokenEvent());
            }
        })
        .catch((error) => {
            console.error(error);
            dispatch(erroredFetchingSessionTokenEvent());
        });
};

export const fetchEntityEventsThunk = (userId) => (dispatch) => {
    if (userId == null) {
        console.error("userId is null.");
        return;
    }
    dispatch(startedFetchingEntityEventsEvent(userId));
    return fetch(apiBase + "/api/entity-events/")
        .then((response) => response.json())
        .then((json) => {
            if (json.hasOwnProperty("error")) {
                dispatch(failedFetchingEntityEventsEvent(userId));
            } else {
                dispatch(succeededFetchingEntityEventsEvent(userId, json));
            }
            console.debug("Done fetching entity events.");
        })
        .catch((e) => console.error(e));
};

export const pushEntityEventsThunk = (userId, entityName) => (dispatch, getState) => {
    const unsyncedEvents = getState().entities[userId][entityName].unsyncedEvents;

    console.debug(`About to sync unsynced ${entityName} events for userId ${userId}: ${JSON.stringify(unsyncedEvents, null, 4)}`);

    dispatch(startedPushingEntityEventsEvent(userId));

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
            if (json.hasOwnProperty("error")) {
                dispatch(failedPushingEntityEventsEvent(userId, entityName, json.error))
            } else {
                dispatch(succeededPushingEntityEventsEvent(userId, entityName));
            }
            console.debug(JSON.stringify(json, null, 4));
        })
        .catch((e) => console.error(e));
};
