import "../styles/ArticleCard.css"

const ArticleCard = ({ article }) => {
  return (
    <li
      className="articleCard"
      style={{ backgroundImage: `url(${article.article_img_url})` }}
    >
      <h3>{article.title}</h3>
    </li>
  )
}

export default ArticleCard
