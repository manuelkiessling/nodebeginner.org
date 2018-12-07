import "cross-fetch/polyfill";
import {
    startedFetchingEntityEventsEvent,
    startedSyncingEntityEventsEvent,
    succeededFetchingEntityEventsEvent, succeededSyncingEntityEventsEvent
} from "./events";
import { getEnvVar } from "../utils/env";
import { entityNamesToClasses } from "../entities/EntityEventFactory";

const apiBase = getEnvVar("APP_API_BASE", "");

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

export const syncEntityEventsThunk = (entityName) => (dispatch, getState) => {
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
