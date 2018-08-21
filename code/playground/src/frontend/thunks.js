import { startedFetchingArticlesEvent, succeededFetchingArticlesEvent } from "./actions"

export const fetchArticlesCommand = () => {
    return (dispatch) => {
        dispatch(startedFetchingArticlesEvent());
        return fetch(`https://www.reddit.com/r/react.json`)
            .then(response => response.json())
            .then(json => dispatch(succeededFetchingArticlesEvent(json)));
    }
};
