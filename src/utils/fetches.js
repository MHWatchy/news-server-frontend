import axios from "axios"

const newsApi = axios.create({
  baseURL: "https://news-server-k1ka.onrender.com/api",
})

export const getSingleArticle = (id) => {
  return newsApi.get(`/articles/${id}`).then(({ data }) => {
    return data
  })
}

export const getArticles = ({ topic }) => {
  let url = `/articles`
  const params = { topic }
  return newsApi.get(url, {params}).then(({ data }) => {
    return data
  })
}

export const patchArticleVotes = (id, vote) => {
  const patchData = {
    inc_votes: vote,
  }
  let url = `/articles/${id}`
  return newsApi.patch(url, patchData).then(({ data }) => {
    return data
  })
}

export const getArticleComments = (id) => {
  return newsApi.get(`/articles/${id}/comments`).then(({ data }) => {
    return data
  })
}

export const postComment = (id, commentData, username) => {
  const newComment = {
    username: username,
    body: commentData,
  }
  return newsApi
    .post(`/articles/${id}/comments`, newComment)
    .then(({ data }) => {
      return data
    })
}

export const getTopics = () => {
  return newsApi.get("/topics").then(({ data }) => {
    return data
  })
}
