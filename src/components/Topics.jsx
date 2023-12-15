import { useEffect, useState } from "react"
import { getTopics } from "../utils/fetches"

const Topics = ({ filters, setFilters, setSearchParams }) => {
  const [topics, setTopics] = useState([])
  const [isLoading, setIsLoading] = useState(true)

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

  if (isLoading) return <h1 className="text loading">loading...</h1>

  return (
    <form className="filterForm">
      <select
        id="topicSelector"
        className="selector"
        onChange={handleChange}
        defaultValue={filters.topic}
      >
        <option value={""} className="text">
          All Topics
        </option>
        {topics.map((topic) => {
          return (
            <option value={topic.slug} key={topic.slug} className="text">
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
