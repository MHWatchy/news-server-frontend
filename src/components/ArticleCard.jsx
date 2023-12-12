import { Link } from "react-router-dom"
import "../styles/ArticleCard.css"

const ArticleCard = ({ article }) => {
  return (
    <Link
      to={`/articles/${article.article_id}`}
      className="articleCard"
      style={{ backgroundImage: `url(${article.article_img_url})` }}
    >
      <h3>{article.title}</h3>
    </Link>
  )
}

export default ArticleCard
