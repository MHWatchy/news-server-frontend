import "../styles/Article.css"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getSingleArticle, patchArticleVotes } from "../utils/fetches"
import Comments from "./Comments"

const Article = () => {
  const { article_id } = useParams()
  const [article, setArticle] = useState({})
  const [votes, setVotes] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [errorTextMain, setErrorTextMain] = useState("")
  const [errorTextVote, setErrorTextVote] = useState("")

  const sendVote = (num) => {
    setVotes((a) => a + num)
    patchArticleVotes(article_id, num)
      .then(({ article }) => {
        setArticle(article)
        setVotes(article.votes)
        setErrorTextVote("")
      })
      .catch((err) => {
        setVotes((a) => a - num)
        if (err.code === "ERR_NETWORK") {
          setErrorTextVote("No connection")
        } else {
          setErrorTextVote("Something went wrong")
        }
      })
  }

  useEffect(() => {
    setErrorTextMain("")
    getSingleArticle(article_id)
      .then(({ article }) => {
        const date = new Date(article.created_at)
        article = { ...article, created_at: date.toUTCString() }
        setArticle(article)
        setVotes(article.votes)
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          setErrorTextMain("No connection")
        } else if (err.response.status === 404) {
          setErrorTextMain("Article not found")
        } else {
          setErrorTextMain("Something went wrong")
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  if (isLoading) return <h1>loading...</h1>

  return errorTextMain ? (
    <p className="errorMessage">{errorTextMain}</p>
  ) : (
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

      <section id="voteSection">
        <button
          id="increaseVotes"
          className="voteButton"
          onClick={() => {
            sendVote(1)
          }}
        >
          Upvote
        </button>
        <p id="votes">{votes} votes</p>
        {!errorTextVote ? null : (
          <p id="voteUnsuccessful" className="errorMessage">
            {errorTextVote}
          </p>
        )}
        <button
          id="decreaseVotes"
          className="voteButton"
          onClick={() => {
            sendVote(-1)
          }}
        >
          Downvote
        </button>
      </section>

      <Comments />
    </section>
  )
}

export default Article
