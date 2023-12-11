import "../styles/Article.css"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getSingleArticle } from "../utils/fetches"

const Article = () => {
  const { article_id } = useParams()
  const [article, setArticle] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getSingleArticle(article_id).then(({ article }) => {
      setArticle(article)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) return <>loading...</>

  return (
    <section>
      <h3>{article.topic}</h3>
      <h1>{article.title}</h1>
      <h2>by {article.author}</h2>
      <h3>{Date(article.created_at)}</h3>
      <img
        id="articleCover"
        src={article.article_img_url}
        alt={`cover image for the article ${article.title}`}
      />
      <p>{article.body}</p>
      <h3>{article.votes} votes</h3>
    </section>
  )
}

export default Article
