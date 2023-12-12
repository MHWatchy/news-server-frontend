import { UserContext } from "../contexts/UserContext"
import "../styles/PostCommentForm.css"
import { useContext, useState } from "react"
import { postComment } from "../utils/fetches"
import { useParams } from "react-router"
import CommentCard from "./CommentCard"

const PostCommentForm = ({ refreshComments, setRefreshComments }) => {
  const { user, setUser } = useContext(UserContext)
  const [commentValue, setCommentValue] = useState("")
  const [commentSuccessful, setCommentSuccessful] = useState(true)
  const { article_id } = useParams()

  function handleChange(e) {
    setCommentValue(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!commentValue) {
      setCommentSuccessful(false)
    } else {
      postComment(article_id, commentValue, user.username)
        .then((data) => {
          setCommentValue("")
          setCommentSuccessful(true)
          setRefreshComments(!refreshComments)
        })
        .catch((err) => {
          setCommentSuccessful(false)
        })
    }
  }

  return (
    <>
      <form id="commentForm" onSubmit={handleSubmit}>
        <label>
          Comment:{" "}
          <input
            placeholder="new comment..."
            value={commentValue}
            onChange={handleChange}
          />
        </label>
        <button id="postCommentButton">Post Comment</button>
      </form>
      {!commentSuccessful ? (
        <p className="errorMessage">Something went wrong... </p>
      ) : null}
    </>
  )
}

export default PostCommentForm
