import "../styles/Comments.css"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import { getArticleComments } from "../utils/fetches"
import CommentCard from "./CommentCard"
import PostCommentForm from "./PostCommentForm"
import { UserContext } from "../contexts/UserContext"

const Comments = () => {
  const { article_id } = useParams()
  const { user } = useContext(UserContext)
  const [username, setUsername] = useState("")
  const [comments, setComments] = useState([])
  const [refreshComments, setRefreshComments] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!!user) {
      setUsername(user.username)
    }
    getArticleComments(article_id).then(({ comments }) => {
      setComments(comments)
      setIsLoading(false)
    })
  }, [refreshComments])

  if (isLoading) return <h1>loading...</h1>

  return (
    <>
      <PostCommentForm
        refreshComments={refreshComments}
        setRefreshComments={setRefreshComments}
      />
      <ul className="commentList">
        {!comments.length
          ? "No Comments"
          : comments.map((comment) => {
              return (
                <CommentCard
                  comment={comment}
                  username={username}
                  refreshComments={refreshComments}
                  setRefreshComments={setRefreshComments}
                  key={comment.comment_id}
                />
              )
            })}
      </ul>
    </>
  )
}

export default Comments
