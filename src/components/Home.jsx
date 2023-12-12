import { useEffect, useState } from "react"
import "../styles/Home.css"
import { getArticles } from "../utils/fetches"
import ArticleCard from "./ArticleCard"
import { useSearchParams } from "react-router-dom"
import Topics from "./Topics"

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams({ topic: "all" })
  const [isLoading, setIsLoading] = useState(true)
  const [articles, setArticles] = useState([])
  const filters = searchParams

  useEffect(() => {
    console.log(filters)
    getArticles(searchParams)
      .then(({ articles }) => {
        setArticles(articles)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [searchParams])

  if (isLoading) return <h1>loading...</h1>

  return (
    <section id="home">
      <section id="filtersBar">
        Filters <Topics searchParams={searchParams} setSearchParams={setSearchParams}/>
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
