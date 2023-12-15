import { useEffect } from "react"
import { useNavigate } from "react-router"

const RedirectArticles = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate("/articles")
  }, [])

  return <h1>redirecting...</h1>
}

export default RedirectArticles
