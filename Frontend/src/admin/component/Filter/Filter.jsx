import { useState } from "react";
import "./filter.css";

const Filter = ({ filterData, handleFilterChange }) => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="filter-container">
      <input
        style={{
          padding: "12px",
        }}
        type="text"
        placeholder="Search by name"
        value={filterData.search}
        onChange={(e) => handleFilterChange("search", e.target.value)}
      />
      <input
        style={{
          padding: "12px",
        }}
        type="date"
        value={filterData.date}
        onChange={(e) => handleFilterChange("date", e.target.value)}
      />
      <select
        name=""
        id=""
        style={{
          border: "1px solid rgb(218, 218, 218)",
          borderRadius: "4px",
          paddingLeft: "12px",
          paddingRight: "12px",
        }}
        value={filterData.status}
        onChange={(e) => handleFilterChange("status", e.target.value)}
      >
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
        <option value="Canceled">Canceled</option>
      </select>
    </div>
  );
};
export default Filter;
