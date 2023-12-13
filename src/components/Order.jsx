const Order = ({ filters, setFilters, searchParams, setSearchParams }) => {
  function handleChange(e) {
    setFilters({ ...filters, order: e.target.value })
    setSearchParams(filters)
  }

  return (
    <form className="filterForm">
      <select id="orderSelector" onChange={handleChange}>
        <option value={"desc"}>Descending</option>
        <option value={"asc"}>Ascending</option>
      </select>
    </form>
  )
}

export default Order
