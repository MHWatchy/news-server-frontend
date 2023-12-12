import { UserContext } from "../contexts/UserContext"
import "../styles/PostCommentForm.css"
import { useContext, useState } from "react"
import { postComment } from "../utils/fetches"
import { useParams } from "react-router"
import CommentCard from "./CommentCard"

const PostCommentForm = ({ addingComment, setAddingComment }) => {
  const [commentValue, setCommentValue] = useState("")
  const [fakeComment, setFakeComment] = useState({})
  const { user, setUser } = useContext(UserContext)
  const { article_id } = useParams()

  function handleChange(e) {
    setCommentValue(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    //NEED TO CHECK IF USER LOGGED IN, OTHERWISE REDIRECT TO LOGIN
    postComment(article_id, commentValue, user.username).then((data) => {
      setFakeComment({
        author: user.username,
        created_at: Date.now(),
        body: commentValue,
        votes: 0,
      })
      setAddingComment(true)
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
        {!addingComment ? null : (
          <CommentCard comment={fakeComment} key={commentValue} />
        )}
      </section>
    </>
  )
}

export default PostCommentForm
