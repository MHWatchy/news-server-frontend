const SortBy = ({ filters, setFilters, setSearchParams }) => {
  function handleChange(e) {
    setFilters({ ...filters, sortby: e.target.value })
    setSearchParams(filters)
  }

  return (
    <form className="filterForm">
      <select
        id="sortBySelector"
        className="selector"
        onChange={handleChange}
        defaultValue={filters.sortby}
      >
        <option value={"created_at"} className="text">
          Date
        </option>
        <option value={"votes"} className="text">
          Votes
        </option>
        <option value={"author"} className="text">
          Author
        </option>
        <option value={"title"} className="text">
          Title
        </option>
        <option value={"topic"} className="text">
          Topic
        </option>
      </select>
    </form>
  )
}

export default SortBy
