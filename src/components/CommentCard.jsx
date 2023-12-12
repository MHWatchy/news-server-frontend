import "../styles/CommentCard.css"

const CommentCard = ({ comment }) => {
  const date = new Date(comment.created_at)
  comment={...comment, created_at: date.toUTCString()}
  return (
    <li className="commentCard">
      <h3>{comment.author}</h3>
      <p>{comment.created_at}</p>
      <p>{comment.body}</p>
      <p>{comment.votes} votes</p>
    </li>
  )
}

export default CommentCard
