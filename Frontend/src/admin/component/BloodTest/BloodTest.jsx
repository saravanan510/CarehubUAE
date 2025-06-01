import React, { useState, useEffect } from "react";
import Metrics from "../Metrics/Metrics";
import Table from "../Table/Table";
import "./bloodTest.css";
import Filter from "../Filter/Filter";
import Header from "../Header/Header";
import axios from "../../../utils/axios";

const BloodTest = () => {
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
      const response = await axios.get("/api/bloodtests");
      setData(response.data);
    } catch (error) {
      console.log("error");
    }
  };
  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bloodTest-container">
      <Header title={"Blood Tests"} />
      <div className="bloodTest-innerContainer">
        <div className="bloodTest-metrics">
          {metrics.map((item, index) => {
            return (
              <Metrics key={index} label={item.label} count={item.count} />
            );
          })}
        </div>
        <div className="bloodTest-table">
          <div className="bloodTest-tableTop">
            <h6>Blood Tests</h6>
            <Filter
              filterData={filterData}
              handleFilterChange={handleFilterChange}
            />
          </div>
          <div
            style={{
              height: "400px",
              overflowY: "scroll",
              overflowX: "hidden",
            }}
          >
            <Table data={data} filterData={filterData} name={"bloodtests"} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default BloodTest;
