import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as thunks from "../../../src/universal/redux-actions/thunks";
import * as events from "../../../src/universal/redux-actions/events";
import fetchMock from "fetch-mock";

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

describe("thunks", () => {
    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    });

    describe("fetchEntityEventsThunk", () => {
        it ("creates EVENT_ENTITY_EVENTS_FETCHING_SUCCEEDED when fetching entity events has been done", () => {
            fetchMock
                .getOnce(
                    "/api/entity-events/",
                    {
                        body: "[]",
                        headers: { "content-type": "application/json" }
                    }
                );

            const expectedActions = [
                { type: events.EVENT_ENTITY_EVENTS_FETCHING_STARTED },
                { type: events.EVENT_ENTITY_EVENTS_FETCHING_SUCCEEDED, json: [] }
            ];
            const store = mockStore({ notes: [] });

            return store.dispatch(thunks.fetchEntityEventsThunk()).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            });
        });
    });

});
