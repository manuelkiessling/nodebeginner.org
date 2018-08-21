import { COMMAND_ARTICLE_ADD } from "./actions";

const initialState = {
    articles: []
};
  
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case COMMAND_ARTICLE_ADD:
            return { ...state, articles: state.articles.concat(action.article) };
        default:
            return state;
      }
  };
  
  export default rootReducer;
