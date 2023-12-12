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
        <p id="topic">{article.topic}</p>
        <p id="title">{article.title}</p>
        <p id="author">by {article.author}</p>
        <p id="dateCreated">{article.created_at}</p>
        <img
          id="articleCover"
          src={article.article_img_url}
          alt={`cover image for the article ${article.title}`}
        />
        <p>{article.body}</p>
        <p id="votes">{article.votes} votes</p>
      </section>
      <Comments />
    </>
  )
}

export default Article
