import { useEffect, useState } from "react"
import { getTopics } from "../utils/fetches"

const Topics = ({ filters, setFilters, setSearchParams }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [topics, setTopics] = useState([])

  function handleChange(e) {
    setFilters({ ...filters, topic: e.target.value })
  }

  useEffect(() => {
    setSearchParams(filters)
  }, [filters])

  useEffect(() => {
    getTopics()
      .then(({ topics }) => {
        setTopics(topics)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log("The impossible error from topics.jsx:", err)
      })
  }, [])

  if (isLoading) return <>loading...</>

  return (
    <form className="filterForm">
      <select id="topicSelector" onChange={handleChange}>
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
