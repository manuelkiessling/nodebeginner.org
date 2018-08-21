export const COMMAND_ARTICLE_ADD = "COMMAND_ARTICLE_ADD";
export const EVENT_ARTICLES_FETCHING_STARTED = "EVENT_ARTICLES_FETCHING_STARTED";
export const EVENT_ARTICLES_FETCHING_SUCCEEDED = "EVENT_ARTICLES_FETCHING_SUCCEEDED";
export const EVENT_ARTICLES_FETCHING_ERRORED = "EVENT_ARTICLES_FETCHING_ERRORED";

export const addArticleCommand = (article) => ({ type: COMMAND_ARTICLE_ADD, article: article });

export const startedFetchingArticlesEvent = () => ({ type: EVENT_ARTICLES_FETCHING_STARTED })

export const succeededFetchingArticlesEvent = () => ({ type: EVENT_ARTICLES_FETCHING_SUCCEEDED })
