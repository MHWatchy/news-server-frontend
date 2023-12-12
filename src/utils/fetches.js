import axios from "axios"

const newsApi = axios.create({
  baseURL: "https://news-server-k1ka.onrender.com/api",
})

export const getSingleArticle = (id) => {
  return newsApi.get(`/articles/${id}`).then(({ data }) => {
    return data
  })
}

export const getArticles = () => {
  return newsApi.get("/articles").then(({ data }) => {
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
