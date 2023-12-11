import { useEffect, useState } from "react"
import "../styles/Home.css"
import { getArticles } from "../utils/fetches"
import ArticleCard from "./ArticleCard"

const Home = () => {
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

  if (isLoading) return <>loading...</>

  return (
    <section id="home">
      <section id="filtersBar">Filters</section>
      <ul id="articleList">
        {articles.map((article) => {
          return <ArticleCard article={article} key={article.article_id}/>
        })}
      </ul>
    </section>
  )
}

export default Home
