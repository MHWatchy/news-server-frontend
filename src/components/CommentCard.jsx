import { useState } from "react"
import { deleteComment } from "../utils/fetches"
import "../styles/CommentCard.css"

const CommentCard = ({
  comment,
  username,
  refreshComments,
  setRefreshComments,
}) => {
  const date = new Date(comment.created_at)
  comment = { ...comment, created_at: date.toUTCString() }
  const [errorText, setErrorText] = useState("")

  function handleDelete(e) {
    e.target.hidden = true
    deleteComment(comment.comment_id)
      .then((data) => {
        setRefreshComments(!refreshComments)
        setErrorText("")
      })
      .catch((err) => {
        e.target.hidden = false
        if (err.code === "ERR_NETWORK") {
          setErrorText("No connection")
        } else {
          setErrorText("Something went wrong")
        }
      })
  }

  return (
    <li className="commentCard">
      <p className="text commenter">{comment.author}</p>
      <p className="text">{comment.created_at}</p>
      <p className="text mainComment">{comment.body}</p>
      <p className="text">{comment.votes} votes</p>
      {username === comment.author ? (
        <button onClick={handleDelete} className="text">
          Delete
        </button>
      ) : null}
      {!errorText ? null : <p className="errorMessage">{errorText}</p>}
    </li>
  )
}

export default CommentCard
