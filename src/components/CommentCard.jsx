import { useState } from "react"
import "../styles/CommentCard.css"
import { deleteComment } from "../utils/fetches"

const CommentCard = ({
  comment,
  username,
  refreshComments,
  setRefreshComments,
}) => {
  const [deleteSuccessful, setDeleteSuccessful] = useState(true)
  const date = new Date(comment.created_at)
  comment = { ...comment, created_at: date.toUTCString() }

  function handleDelete(e) {
    e.target.hidden = true
    deleteComment(comment.comment_id)
      .then((data) => {
        setRefreshComments(!refreshComments)
        setDeleteSuccessful(true)
      })
      .catch(() => {
        setDeleteSuccessful(false)
      })
  }

  return (
    <li className="commentCard">
      <h3>{comment.author}</h3>
      <p>{comment.created_at}</p>
      <p>{comment.body}</p>
      <p>{comment.votes} votes</p>
      {username === comment.author ? (
        <button onClick={handleDelete}>Delete</button>
      ) : null}
      <p className="errorMessage" hidden={deleteSuccessful}>
        Something went wrong...
      </p>
    </li>
  )
}

export default CommentCard
