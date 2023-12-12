import { UserContext } from "../contexts/UserContext"
import "../styles/PostCommentForm.css"
import { useContext, useState } from "react"
import { postComment } from "../utils/fetches"
import { useParams } from "react-router"
import CommentCard from "./CommentCard"

const PostCommentForm = ({ addingComment, setAddingComment }) => {
  const { user, setUser } = useContext(UserContext)
  const [commentValue, setCommentValue] = useState("")
  const [fakeComment, setFakeComment] = useState({})
  const [commentSuccessful, setCommentSuccessful] = useState(true)
  const { article_id } = useParams()

  function handleChange(e) {
    setCommentValue(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    postComment(article_id, commentValue, user.username)
      .then((data) => {
        setFakeComment({
          author: user.username,
          created_at: Date.now(),
          body: commentValue,
          votes: 0,
        })
        setCommentValue("")
        setAddingComment(true)
        setCommentSuccessful(true)
      })
      .catch((err) => {
        setCommentSuccessful(false)
      })
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
      <section id="optimisticComment" className="commentList">
        {!commentSuccessful ? (
          <p>Something went wrong... </p>
        ) : !addingComment ? null : (
          <CommentCard comment={fakeComment} key={commentValue} />
        )}
      </section>
    </>
  )
}

export default PostCommentForm
