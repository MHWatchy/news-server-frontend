const Order = ({ filters, setFilters, setSearchParams }) => {
  function handleChange(e) {
    setFilters({ ...filters, order: e.target.value })
    setSearchParams(filters)
  }

  return (
    <form className="filterForm">
      <select id="orderSelector" className="selector" onChange={handleChange} defaultValue={filters.order}>
        <option value={"desc"} className="text">Descending</option>
        <option value={"asc"} className="text">Ascending</option>
      </select>
    </form>
  )
}

export default Order
