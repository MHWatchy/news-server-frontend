import "../styles/CommentCard.css"

const CommentCard = ({ comment }) => {
  return (
    <li className="commentCard">
      <h3>{comment.author}</h3>
      <p>{Date(comment.created_at)}</p>
      <p>{comment.body}</p>
      <p>{comment.votes} votes</p>
    </li>
  )
}

export default CommentCard
