import { useState } from "react"
import "../styles/CommentCard.css"
import { deleteComment } from "../utils/fetches"

const CommentCard = ({
  comment,
  username,
  refreshComments,
  setRefreshComments,
}) => {
  const [errorText, setErrorText] = useState("")
  const date = new Date(comment.created_at)
  comment = { ...comment, created_at: date.toUTCString() }

  function handleDelete(e) {
    e.target.hidden = true
    deleteComment(comment.comment_id)
      .then((data) => {
        setRefreshComments(!refreshComments)
        setErrorText("")
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          setErrorText("No connection")
        } else {
          setErrorText("Something went wrong")
        }
      })
  }

  return (
    <li className="commentCard">
      <h3 className="text">{comment.author}</h3>
      <p className="text">{comment.created_at}</p>
      <p className="text">{comment.body}</p>
      <p className="text">{comment.votes} votes</p>
      {username === comment.author ? (
        <button onClick={handleDelete} className="text">Delete</button>
      ) : null}
      {!errorText ? null : <p className="errorMessage">{errorText}</p>}
    </li>
  )
}

export default CommentCard
