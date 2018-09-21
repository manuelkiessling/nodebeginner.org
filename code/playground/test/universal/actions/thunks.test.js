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

    it ("creates EVENT_ENTITY_EVENTS_FETCHING_SUCCEEDED when fetching entity events has been done", () => {

        const responseBody = {
                "entity-events": [
                    {"id": "74d01c2b-7fb0-4b50-a1ed-5302a1026785", "entityName": "task", "taskId": "94244957-f782-45fc-988e-d9954720667d", "taskTitle": "Learn React", "type": "create", "timestamp": "1537523057377"},
                    {"id": "bf02c74c-bf5f-4b67-a9bc-820abb506824", "entityName": "task", "taskId": "94244957-f782-45fc-988e-d9954720667d", "taskUpdates": { "taskTitle": "Updated: Learn React" }, "type": "update", "timestamp": "1537523057387"},
                    {"id": "5302a102-4b67-4b50-a1ed-bb50a1026785", "entityName": "task", "taskId": "d9954720-f782-45fc-066f-988e4720667d", "taskTitle": "Learn React", "type": "create", "timestamp": "1537523057377"},
                ]
            }
        ;

        fetchMock
            .getOnce(
                "/api/entity-events/",
                {
                    body: responseBody,
                    headers: { "content-type": "application/json" }
                }
            );

        const expectedActions = [
            { type: events.EVENT_ENTITY_EVENTS_FETCHING_STARTED },
            { type: events.EVENT_ENTITY_EVENTS_FETCHING_SUCCEEDED, json: responseBody }
        ];
        const store = mockStore({ tasks: [] });

        return store.dispatch(thunks.fetchEntityEventsThunk()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        });
    });
});
