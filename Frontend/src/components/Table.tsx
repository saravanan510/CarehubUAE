import React from "react";

const Table = ({ data }: { data: Array<{ title: string; value1: string; value2: string }> }) => {
  return (
    <div style={{ overflowX: "auto", marginTop: "20px" }}>
      <table>
        <tbody>
          {data.map((d, index) => {
            return (
              <tr key={index} style={{ border: "1px solid #f1f1f1ff" }}>
                <th
                  style={{
                    backgroundColor: "#f9f9f9",
                    padding: "12px",
                    minWidth: "160px",
                  }}
                >
                  {d.title}
                </th>
                <td style={{ padding: "12px", minWidth: "300px" }}>
                  {d.value1}
                </td>
                <td style={{ padding: "12px", minWidth: "300px" }}>
                  {d.value2}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
