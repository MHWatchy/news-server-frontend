const Order = ({ filters, setFilters, setSearchParams }) => {
  function handleChange(e) {
    setFilters({ ...filters, order: e.target.value })
    setSearchParams(filters)
  }

  return (
    <form className="filterForm">
      <select id="orderSelector" onChange={handleChange} defaultValue={filters.order}>
        <option value={"desc"}>Descending</option>
        <option value={"asc"}>Ascending</option>
      </select>
    </form>
  )
}

export default Order
