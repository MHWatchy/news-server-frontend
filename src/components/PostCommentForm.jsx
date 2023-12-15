import { UserContext } from "../contexts/UserContext"
import "../styles/PostCommentForm.css"
import { useContext, useEffect, useState } from "react"
import { postComment } from "../utils/fetches"
import { useParams } from "react-router"

const PostCommentForm = ({ refreshComments, setRefreshComments }) => {
  const { user } = useContext(UserContext)
  const [commentValue, setCommentValue] = useState("")
  const [errorText, setErrorText] = useState("")
  const { article_id } = useParams()
  const [isValidating, setIsValidating] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [placeholderText, setPlaceholderText] = useState("")

  function handleChange(e) {
    setCommentValue(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!user) {
      setErrorText("Please login first")
    } else if (!commentValue) {
      setErrorText("No comment to post")
    } else {
      setIsValidating(true)
      postComment(article_id, commentValue, user.username)
        .then(() => {
          setCommentValue("")
          setErrorText("")
          setRefreshComments(!refreshComments)
        })
        .catch((err) => {
          if (err.code === "ERR_NETWORK") {
            setErrorText("No connection")
          } else {
            setErrorText("Something went wrong")
          }
        })
        .finally(() => {
          setIsValidating(false)
        })
    }
  }

  useEffect(() => {
    setIsLoading(true)
    if (!user) {
      setPlaceholderText("Login to post comments")
    } else {
      setPlaceholderText("new comment...")
    }
    setIsLoading(false)
  }, [])

  if (isLoading) return <h1 className="text loading">loading...</h1>

  return (
    <>
      <form id="commentForm" onSubmit={handleSubmit}>
        <label className="text">
          Comment*:{" "}
          <textarea
            id="commentInput"
            placeholder={placeholderText}
            value={commentValue}
            onChange={handleChange}
            disabled={!user}
          />
        </label>
        <button id="postCommentButton" className="text" disabled={isValidating}>
          Post Comment
        </button>
      </form>
      {!errorText ? null : <p className="errorMessage">{errorText}</p>}
    </>
  )
}

export default PostCommentForm
