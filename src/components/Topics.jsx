import { useEffect, useState } from "react"
import { getTopics } from "../utils/fetches"
import { Link } from "react-router-dom"

const Topics = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [topics, setTopics] = useState([])
  useEffect(() => {
    getTopics().then(({ topics }) => {
      setTopics(topics)
      setIsLoading(false)
    })
  }, [])
  if (isLoading) return <>loading...</>

  return topics.map((topic) => {
    return <Link> {topic.slug} </Link>
  })
}

export default Topics
