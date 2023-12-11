import "../styles/ArticleCard.css"

const ArticleCard = ({ article }) => {
  console.log(article.article_img_url)
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
