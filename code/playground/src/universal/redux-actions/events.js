export const EVENT_SESSION_TOKEN_FETCHING_STARTED = "EVENT_SESSION_TOKEN_FETCHING_STARTED";
export const EVENT_SESSION_TOKEN_FETCHING_SUCCEEDED = "EVENT_SESSION_TOKEN_FETCHING_SUCCEEDED";
export const EVENT_SESSION_TOKEN_FETCHING_FAILED = "EVENT_SESSION_TOKEN_FETCHING_FAILED";
export const EVENT_SESSION_TOKEN_FETCHING_ERRORED = "EVENT_SESSION_TOKEN_FETCHING_ERRORED";

export const EVENT_ENTITY_EVENTS_FETCHING_STARTED = "EVENT_ENTITY_EVENTS_FETCHING_STARTED";
export const EVENT_ENTITY_EVENTS_FETCHING_SUCCEEDED = "EVENT_ENTITY_EVENTS_FETCHING_SUCCEEDED";
export const EVENT_ENTITY_EVENTS_FETCHING_FAILED = "EVENT_ENTITY_EVENTS_FETCHING_FAILED";
export const EVENT_ENTITY_EVENTS_FETCHING_ERRORED = "EVENT_ENTITY_EVENTS_FETCHING_ERRORED";

export const EVENT_ENTITY_EVENTS_PUSHING_STARTED = "EVENT_ENTITY_EVENTS_PUSHING_STARTED";
export const EVENT_ENTITY_EVENTS_PUSHING_SUCCEEDED = "EVENT_ENTITY_EVENTS_PUSHING_SUCCEEDED";
export const EVENT_ENTITY_EVENTS_PUSHING_FAILED = "EVENT_ENTITY_EVENTS_PUSHING_FAILED";
export const EVENT_ENTITY_EVENTS_PUSHING_ERRORED = "EVENT_ENTITY_EVENTS_PUSHING_ERRORED";


export const startedFetchingSessionTokenEvent = () => ({ type: EVENT_SESSION_TOKEN_FETCHING_STARTED });
export const succeededFetchingSessionTokenEvent = (userId) => ({ type: EVENT_SESSION_TOKEN_FETCHING_SUCCEEDED, userId });
export const failedFetchingSessionTokenEvent = () => ({ type: EVENT_SESSION_TOKEN_FETCHING_FAILED });
export const erroredFetchingSessionTokenEvent = (error) => ({ type: EVENT_SESSION_TOKEN_FETCHING_ERRORED, error: error });

export const startedFetchingEntityEventsEvent = (userId) => ({ type: EVENT_ENTITY_EVENTS_FETCHING_STARTED, userId });
export const succeededFetchingEntityEventsEvent = (userId, json) => ({ type: EVENT_ENTITY_EVENTS_FETCHING_SUCCEEDED, userId, json });
export const failedFetchingEntityEventsEvent = (userId) => ({ type: EVENT_ENTITY_EVENTS_FETCHING_FAILED, userId });

export const startedPushingEntityEventsEvent = (userId) => ({ type: EVENT_ENTITY_EVENTS_PUSHING_STARTED, userId });
export const succeededPushingEntityEventsEvent = (userId, entityName) => ({ type: EVENT_ENTITY_EVENTS_PUSHING_SUCCEEDED, userId, entityName });
export const failedPushingEntityEventsEvent = (userId, entityName, failureMessage) => ({ type: EVENT_ENTITY_EVENTS_PUSHING_FAILED, userId, entityName, failureMessage });
