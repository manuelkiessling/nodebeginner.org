import { combineReducers } from 'redux'
import { COMMAND_ARTICLE_ADD } from "./actions";

const initialState = {
    articles: []
};

// We get a part of the state, the "articles" array
const articles = (state = [], action) => {
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
