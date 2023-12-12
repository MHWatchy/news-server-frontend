import { useEffect, useState } from "react"
import "../styles/Home.css"
import { getArticles } from "../utils/fetches"
import ArticleCard from "./ArticleCard"
import { useSearchParams } from "react-router-dom"
import Topics from "./Topics"

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams({ topic: "" })
  const [isLoading, setIsLoading] = useState(true)
  const [articles, setArticles] = useState([])

  useEffect(() => {
    getArticles()
      .then(({ articles }) => {
        setArticles(articles)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  if (isLoading) return <h1>loading...</h1>

  return (
    <section id="home">
      <section id="filtersBar">
        Filters <Topics />
      </section>
      <ul id="articleList">
        {articles.map((article) => {
          return <ArticleCard article={article} key={article.article_id} />
        })}
      </ul>
    </section>
  )
}

export default Home
