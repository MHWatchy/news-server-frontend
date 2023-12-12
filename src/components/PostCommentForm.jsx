import { useState } from "react"

const PostCommentForm = () => {
  const [commentValue, setCommentValue] = useState("")

  function handleChange(e) {
    setCommentValue(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Comment:{" "}
        <input
          placeholder="new comment..."
          value={commentValue}
          onChange={handleChange}
        />
      </label>
      <button>Post Comment</button>
    </form>
  )
}

export default PostCommentForm
