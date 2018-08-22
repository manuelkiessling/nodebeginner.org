export const COMMAND_ARTICLE_ADD = "COMMAND_ARTICLE_ADD";

export const addArticleCommand = (article) => ({ type: COMMAND_ARTICLE_ADD, article: article });
