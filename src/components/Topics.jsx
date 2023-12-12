import { useEffect, useState } from "react"
import { getTopics } from "../utils/fetches"
import { Link } from "react-router-dom"

const Topics = ({searchParams, setSearchParams }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [topics, setTopics] = useState([])

  function handleChange(e) {
    console.log(e.target.value)
    setSearchParams({...searchParams, topic:e.target.value})
  }

  useEffect(() => {
    getTopics().then(({ topics }) => {
      setTopics(topics)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) return <>loading...</>

  return (
    <form onChange={handleChange}>
      <select>
        <option value={"*"}>All Topics</option>
        {topics.map((topic) => {
          return <option key={topic.slug}> {topic.slug} </option>
        })}
      </select>
    </form>
  )
}

export default Topics
