import { useEffect, useState } from "react"
import "../styles/Home.css"
import "../styles/Filters.css"
import { getArticles } from "../utils/fetches"
import ArticleCard from "./ArticleCard"
import { useSearchParams } from "react-router-dom"
import Topics from "./Topics"
import Order from "./Order"
import SortBy from "./SortBy"

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    topic: "",
    order: "desc",
    sortby: "created_at",
  })
  const [filters, setFilters] = useState({
    topic: searchParams.get("topic"),
    order: searchParams.get("order"),
    sortby: searchParams.get("sortby"),
  })
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorText, setErrorText] = useState("")

  useEffect(() => {
    getArticles(filters)
      .then(({ articles }) => {
        setErrorText("")
        setArticles(articles)
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          setErrorText("No connection")
        } else if (err.code === "ERR_BAD_REQUEST") {
          setErrorText(err.response.data.msg)
        } else {
          setErrorText("Something went wrong")
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [filters])

  if (isLoading) return <h1 className="text loading">loading...</h1>

  return (
    <section id="home">
      <section id="filtersBar">
        <Topics
          filters={filters}
          setFilters={setFilters}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        <Order
          filters={filters}
          setFilters={setFilters}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        <SortBy
          filters={filters}
          setFilters={setFilters}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </section>
      {errorText ? (
        <p className="errorMessage">{errorText}</p>
      ) : (
        <ul id="articleList">
          {articles.map((article) => {
            return <ArticleCard article={article} key={article.article_id} />
          })}
        </ul>
      )}
    </section>
  )
}

export default Home
