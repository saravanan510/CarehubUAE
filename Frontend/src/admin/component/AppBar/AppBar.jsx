import React, { useState } from "react";
import "./appBar.css";
import carehub_logo from "../../../assets/carehub_logo.png";
import { AiOutlineHome } from "react-icons/ai";

const AppBar = ({ selectedMenu, handleSelect }) => {
  return (
    <>
      <div className="Appbar-container">
        <img src={carehub_logo} height="40px" />
        <ul>
          <li
            className={selectedMenu === "Dashboard" && "selected"}
            onClick={() => {
              handleSelect("Dashboard");
            }}
          >
            <AiOutlineHome style={{ fontSize: "18px" }} />
            <span>Dashboard</span>
          </li>
          <li
            className={selectedMenu === "Services" && "selected"}
            onClick={() => {
              handleSelect("Services");
            }}
          >
            <AiOutlineHome style={{ fontSize: "18px" }} />
            <span>Services</span>
          </li>
          <li
            className={selectedMenu === "Blood Panel" && "selected"}
            onClick={() => {
              handleSelect("Blood Panel");
            }}
          >
            <AiOutlineHome style={{ fontSize: "18px" }} />
            <span>Blood Panel</span>
          </li>
        </ul>
      </div>
    </>
  );
};
export default AppBar;
