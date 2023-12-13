const SortBy = ({ filters, setFilters, setSearchParams }) => {
  function handleChange(e) {
    setFilters({ ...filters, sortby : e.target.value })
    setSearchParams(filters)
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
