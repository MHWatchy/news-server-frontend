import "../styles/Article.css"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getSingleArticle } from "../utils/fetches"
import Comments from "./Comments"

const Article = () => {
  const { article_id } = useParams()
  const [article, setArticle] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getSingleArticle(article_id).then(({ article }) => {
      const date = new Date(article.created_at)
      article = { ...article, created_at: date.toUTCString() }
      setArticle(article)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) return <h1>loading...</h1>

  return (
    <>
      <section>
        <h3>{article.topic}</h3>
        <h1>{article.title}</h1>
        <h2>by {article.author}</h2>
        <h3>{article.created_at}</h3>
        <img
          id="articleCover"
          src={article.article_img_url}
          alt={`cover image for the article ${article.title}`}
        />
        <p>{article.body}</p>
        <h3>{article.votes} votes</h3>
      </section>
      <Comments />
    </>
  )
}

export default Article
