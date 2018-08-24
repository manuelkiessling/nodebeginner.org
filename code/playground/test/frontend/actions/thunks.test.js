import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as thunks from "../../../src/frontend/actions/thunks";
import * as events from "../../../src/frontend/actions/events";
import fetchMock from "fetch-mock";

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

describe("thunks", () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  })

  it("creates EVENT_ARTICLES_FETCHING_SUCCEEDED when fetching articles has been done", () => {
    
    const responseBody = { articles: [{"id": "1", "title": "Hello, World."}] };
    
    fetchMock
      .getOnce(
        "/api/articles",
        {
          body: responseBody,
          headers: { "content-type": "application/json" } 
        }
      );
      
    const expectedActions = [
      { type: events.EVENT_ARTICLES_FETCHING_STARTED },
      { type: events.EVENT_ARTICLES_FETCHING_SUCCEEDED, json: responseBody }
    ]
    const store = mockStore({ articles: [] })

    return store.dispatch(thunks.fetchArticlesThunk()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
