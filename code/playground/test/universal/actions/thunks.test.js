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

    it("creates EVENT_TASKS_FETCHING_SUCCEEDED when fetching tasks has been done", () => {

        const responseBody = { tasks: [{"id": "1", "title": "Hello, World."}] };

        fetchMock
            .getOnce(
                "http://127.0.0.1:8000/api/tasks",
                {
                    body: responseBody,
                    headers: { "content-type": "application/json" }
                }
            );

        const expectedActions = [
            { type: events.EVENT_TASKS_FETCHING_STARTED },
            { type: events.EVENT_TASKS_FETCHING_SUCCEEDED, json: responseBody }
        ];
        const store = mockStore({ tasks: [] });

        return store.dispatch(thunks.fetchTasksThunk()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
});
