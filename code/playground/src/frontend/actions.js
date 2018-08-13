export const ARTICLE_ADD = "ARTICLE_ADD";
export const ARTICLES_FETCH_STARTED = "ARTICLES_FETCH_STARTED";
export const ARTICLES_FETCH_SUCCEEDED = "ARTICLES_FETCH_SUCCEEDED";
export const ARTICLES_FETCH_ERRORED = "ARTICLES_FETCH_ERRORED";

export const addArticle = (article) => ({ type: actionTypes.ARTICLE_ADD, payload: article });

export const startedFetchArticles = () => ({ type: actionTypes.ARTICLES_FETCH_STARTED })

export const succeededFetchArticles = () => ({ type: actionTypes.ARTICLES_FETCH_SUCCEEDED })



export const fetchArticles = () => {
    return (dispatch) => {
        dispatch(startedFetchArticles);
        return fetch(`https://www.reddit.com/r/react.json`)
            .then(response => response.json())
            .then(json => dispatch(succeededFetchArticles(json)));
    }
};
