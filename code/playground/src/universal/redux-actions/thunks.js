import "cross-fetch/polyfill";
import { startedFetchingEntityEventsEvent, succeededFetchingEntityEventsEvent } from "./events";
import { getEnvVar } from "../utils/env";

const apiBase = getEnvVar("APP_API_BASE", "");

export const fetchEntityEventsThunk = () => (dispatch) => {
    dispatch(startedFetchingEntityEventsEvent());
    return fetch(apiBase + "/api/entity-events/")
        .then((response) => response.json())
        .then((json) => {
            dispatch(succeededFetchingEntityEventsEvent(json));
            console.debug("Done fetching tasks.");
        })
        .catch((e) => console.error(e));
};
