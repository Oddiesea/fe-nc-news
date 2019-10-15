import axios from "axios"

const instance = axios.create({
  baseURL: "https://nc-news-best.herokuapp.com/api"
});

export const getAllTopics = async () => {
  const {
    data: { topics }
  } = await instance.get("/topics");
  return topics;
};

export const getArticles = async ( topic, author, sort_by, order) => {
  const { data } = await instance.get("/articles", {
    params: { author, topic, sort_by, order}
  });
  return data.articles;
};

export const getArticleById = async (article_id, sort_by, order) => {
  const { data: article } = await instance.get(`/articles/${article_id}/`, {
    params: { sort_by, order }
  });
  return article.article;
};

export const getCommentsByArticleId = async (article_id, sort_by, order) => {
  const { data } = await instance.get(`/articles/${article_id}/comments`, {
    params: { sort_by, order }
  });
  return data.comments;
};

export const sendArticleVote = async (article_id, vote_inc) => {
  const { data } = await instance.patch(`/articles/${article_id}`, {
    vote_inc
  });
  return data;
};

export const sendCommentVote = async (comment_id, vote_inc) => {
  const { data } = await instance.patch(`/comments/${comment_id}`, {
    vote_inc
  });
  return data;
};


export const postComment = async (article_id, username, body) => {
  const { data } = await instance.post(`/articles/${article_id}/comments`, 
    { username, body}
  );
  return data;
};

export const deleteComment = async (comment_id) => {
  instance.delete(`/comments/${comment_id}`
  );
};
