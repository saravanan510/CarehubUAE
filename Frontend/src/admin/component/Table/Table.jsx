import "./table.css";
import { useState, useEffect } from "react";
const Table = ({ data, filterData }) => {
  const [filterTableData, setFilterTableData] = useState([]);

  useEffect(() => {
    const newTableData = data.filter((item) => {
      const matchesSearch =
        !filterData.search ||
        item.fullName.toLowerCase().includes(filterData.search.toLowerCase());

      const matchesDate =
        !filterData.date || new Date(item.date) >= new Date(filterData.date);

      const matchesStatus =
        filterData.status === "All" ||
        !filterData.status ||
        item.status === filterData.status;

      return matchesSearch && matchesDate && matchesStatus;
    });

    setFilterTableData(newTableData);
  }, [filterData, data]);

  const header = [
    { name: "Full Name", width: "10%" },
    { name: "Email", width: "10%" },
    { name: "Phone Number", width: "10%" },
    { name: "Date", width: "10%" },
    { name: "Services", width: "10%" },
    { name: "Status", width: "10%" },
    { name: "Action", width: "10%" },
  ];

  return (
    <table className="tableContainer">
      <thead>
        <tr className="tableHeader">
          {header.map((item, index) => (
            <th key={index} style={{ width: item.width, fontWeight: "600" }}>
              {item.name}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {Array.isArray(filterTableData) && filterTableData.length > 0 ? (
          filterTableData.map((item, index) => (
            <tr key={index} style={{ fontSize: "14px" }}>
              <td>{item.fullName}</td>
              <td>{item.email}</td>
              <td>{item.phoneNumber}</td>
              <td>{item.date}</td>
              <td>{item.service}</td>
              <td>{item.status}</td>
              <td>
                <button style={{ background: "none", color: "blue" }}>
                  View
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={7}
              className="no-data"
              style={{ textAlign: "center", padding: "1rem" }}
            >
              No data found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
export default Table;
