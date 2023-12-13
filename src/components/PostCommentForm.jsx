import { UserContext } from "../contexts/UserContext"
import "../styles/PostCommentForm.css"
import { useContext, useState } from "react"
import { postComment } from "../utils/fetches"
import { useParams } from "react-router"

const PostCommentForm = ({ refreshComments, setRefreshComments }) => {
  const { user } = useContext(UserContext)
  const [commentValue, setCommentValue] = useState("")
  const [errorText, setErrorText] = useState("")
  const { article_id } = useParams()

  function handleChange(e) {
    setCommentValue(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!commentValue) {
      setErrorText("No comment to post")
    } else {
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
    }
  }

  return (
    <>
      <form id="commentForm" onSubmit={handleSubmit}>
        <label>
          Comment*:{" "}
          <textarea
            placeholder="new comment..."
            value={commentValue}
            onChange={handleChange}
          />
        </label>
        <button id="postCommentButton">Post Comment</button>
      </form>
      {!errorText ? null : <p className="errorMessage">{errorText}</p>}
    </>
  )
}

export default PostCommentForm
