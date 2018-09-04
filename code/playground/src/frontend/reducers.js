import { combineReducers } from "redux";
import { COMMAND_TASK_ADD } from "./actions/commands";
import { EVENT_ARTICLES_FETCHING_SUCCEEDED } from "./actions/events";

const initialState = {
    ui: {
        indicateArticlesFetching: false
    },
    articles: [],
    debugInfo: ""
};

// We get and handle one part of the state, the "articles" array
const articles = (state = initialState.articles, action) => {
    switch (action.type) {
        case COMMAND_TASK_ADD:
            return state.concat(action.article);
        case EVENT_ARTICLES_FETCHING_SUCCEEDED:
            return state.concat(action.json);
        default:
            return state;
    }
};

const debugInfo = (state = initialState.debugInfo, action) => {
    switch (action.type) {
        case EVENT_ARTICLES_FETCHING_SUCCEEDED:
            return action.json;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    articles,
    debugInfo
});

export default rootReducer;
