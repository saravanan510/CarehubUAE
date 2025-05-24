import "./metrics.css";
const Metrics = ({ label, count }) => {
  return (
    <div className="metrics-container">
      <h5>{count ?? "0"}</h5>
      <p>{label}</p>
    </div>
  );
};
export default Metrics;
