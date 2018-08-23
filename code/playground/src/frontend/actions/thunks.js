import { startedFetchingArticlesEvent, succeededFetchingArticlesEvent } from "../actions/events";

export const fetchArticlesThunk = () => {
    return (dispatch) => {
        dispatch(startedFetchingArticlesEvent());
        return fetch("/api/articles")
            .then(response => response.json())
            .then(json => dispatch(succeededFetchingArticlesEvent(json)));
    }
};
