import "../styles/Comments.css"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getArticleComments } from "../utils/fetches"
import CommentCard from "./CommentCard"

const Comments = () => {
  const { article_id } = useParams()
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getArticleComments(article_id).then(({ comments }) => {
      setComments(comments)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) return <h1>loading...</h1>

  return (
    <ul id="commentList">
      {!comments.length
        ? "No Comments"
        : comments.map((comment) => {
            return <CommentCard comment={comment} key={comment.comment_id} />
          })}
    </ul>
  )
}

export default Comments
