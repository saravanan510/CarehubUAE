import React, { useState } from "react";
import AppBar from "../component/AppBar/AppBar";
import View from "../component/View/View";
const Dashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const handleSelect = (value) => {
    setSelectedMenu(value);
  };
  return (
    <div style={{ display: "flex" }}>
      <AppBar selectedMenu={selectedMenu} handleSelect={handleSelect} />
      <View selectedMenu={selectedMenu} />
    </div>
  );
};
export default Dashboard;
