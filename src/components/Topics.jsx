import { useEffect, useState } from "react"
import { getTopics } from "../utils/fetches"
import { Link } from "react-router-dom"

const Topics = ({ filters, setFilters, searchParams, setSearchParams }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [topics, setTopics] = useState([])

  function handleChange(e, key) {
    setFilters({ ...filters, [key]: e.target.value })
    setSearchParams({ ...searchParams, [key]: e.target.value })
  }

  useEffect(() => {
    getTopics().then(({ topics }) => {
      setTopics(topics)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) return <>loading...</>

  return (
    <form>
      <select
        id="topicSelector"
        onChange={(e) => {
          handleChange(e, "topic")
        }}
      >
        <option value={""}>All Topics</option>
        {topics.map((topic) => {
          return (
            <option value={topic.slug} key={topic.slug}>
              {" "}
              {topic.slug}{" "}
            </option>
          )
        })}
      </select>
    </form>
  )
}

export default Topics
