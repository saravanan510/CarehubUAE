const Table = ({ data }) => {
  return (
    <div style={{ overflowX: "auto", marginTop: "20px" }}>
      <table>
        <tbody>
          {data.map((d) => {
            return (
              <tr style={{ border: "1px solid #f1f1f1ff" }}>
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
