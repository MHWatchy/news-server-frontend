const SortBy = ({ filters, setFilters, searchParams, setSearchParams }) => {
  function handleChange(e) {
    setFilters({ ...filters, sort_by: e.target.value })
    setSearchParams({ ...searchParams, sort_by: e.target.value })
  }

  return (
    <form className="filterForm">
      <select id="sortBySelector" onChange={handleChange}>
        <option value={"created_at"}>Date</option>
        <option value={"votes"}>Votes</option>
        <option value={"author"}>Author</option>
        <option value={"title"}>Title</option>
        <option value={"topic"}>Topic</option>
      </select>
    </form>
  )
}

export default SortBy
