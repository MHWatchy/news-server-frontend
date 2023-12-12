import "../styles/Article.css"
import { useEffect, useState } from "react"
import { useParams } from "react-router"

import { getSingleArticle, patchArticleVotes } from "../utils/fetches"

import Comments from "./Comments"

const Article = () => {
  const { article_id } = useParams()
  const [article, setArticle] = useState({})
  const [votes, setVotes] = useState(0)
  const [voteSuccessful, setVoteSuccessful] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getSingleArticle(article_id).then(({ article }) => {
      const date = new Date(article.created_at)
      article = { ...article, created_at: date.toUTCString() }
      setArticle(article)
      setVotes(article.votes)
      setIsLoading(false)
    })
  }, [])

  const sendVote = (num) => {
    setVotes((a) => a + num)
    patchArticleVotes(article_id, num)
      .then(({ article }) => {
        setArticle(article)
        setVotes(article.votes)
        setVoteSuccessful(true)
      })
      .catch(() => {
        setVotes((a) => a - num)
        setVoteSuccessful(false)
      })
  }

  if (isLoading) return <h1>loading...</h1>

  return (
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
        <p id="voteUnsuccessful" hidden={voteSuccessful}>
          Something went wrong...
        </p>
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
