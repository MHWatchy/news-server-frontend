import axios from "axios"

const newsApi = axios.create({
  baseURL: "https://news-server-k1ka.onrender.com/api",
})
