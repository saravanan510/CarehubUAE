import { useEffect, useState } from "react";
import "./services.css";
import Metrics from "../Metrics/Metrics";
import Table from "../Table/Table";
import axios from "../../../utils/axios";
import Filter from "../Filter/Filter";
import ServiceDeatils from "./ServiceDeatils";

const Services = () => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState({
    search: "",
    date: null,
    status: "",
  });

  const handleFilterChange = (name, value) => {
    setFilterData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const metrics = [
    {
      label: "Total Appointments",
      count: data.length,
    },
    {
      label: "Pending Appointments",
      count: data.filter((item) => item.status === "Pending").length,
    },
    {
      label: "Completed Appointments",
      count: data.filter((item) => item.status === "Completed").length,
    },
    {
      label: "Canceled Appointments",
      count: data.filter((item) => item.status === "Canceled").length,
    },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get("api/services");
      setData(response.data);
    } catch (error) {
      console.log("error");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="service-container">
      {/* <div className="service-metrics">
        {metrics.map((item, index) => {
          return <Metrics key={index} label={item.label} count={item.count} />;
        })}
      </div>
      <div className="service-table">
        <div className="service-tableTop">
          <h6>Services</h6>
          <Filter
            filterData={filterData}
            handleFilterChange={handleFilterChange}
          />
        </div>
        <div>
          <Table data={data} filterData={filterData} />
        </div>
      </div> */}
      <ServiceDeatils />
    </div>
  );
};
export default Services;
