import { combineReducers } from "redux";
import { COMMAND_ARTICLE_ADD } from "./actions/commands";

const initialState = {
    articles: []
};

// We get and handle one part of the state, the "articles" array
const articles = (state = initialState.articles, action) => {
    switch (action.type) {
        case COMMAND_ARTICLE_ADD:
            return state.concat(action.article);
        default:
            return state;
      }
}

const rootReducer = combineReducers({
    articles
});
  
export default rootReducer;
