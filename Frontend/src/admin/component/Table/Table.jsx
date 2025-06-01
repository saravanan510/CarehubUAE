import "./table.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Table = ({ data, filterData, name }) => {
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

  const hName = name === "services" ? "Service" : "Tests";

  const header = [
    { name: "Full Name", width: "10%" },
    { name: "Email", width: "10%" },
    { name: "Phone Number", width: "10%" },
    { name: "Date", width: "10%" },
    { name: hName, width: "10%" },
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
              {name === "services" ? (
                <td>{item.service}</td>
              ) : (
                <td>{item?.tests?.length}</td>
              )}

              <td>{item.status}</td>
              <td>
                <Link
                  to={
                    name == "services"
                      ? `/admin/services/${item.orderId} `
                      : `/admin/bloodtests/${item.orderId}`
                  }
                >
                  View
                </Link>
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
