import React, { useState } from "react";
import "./appBar.css";
import carehub_logo from "../../../assets/carehub_logo.png";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineMedicalServices } from "react-icons/md";
import { MdOutlineBloodtype } from "react-icons/md";

import { Link } from "react-router-dom";

const AppBar = () => {
  const [selected, setSelected] = useState("services");
  const handleClick = (value) => {
    setSelected(value);
  };
  return (
    <>
      <div className="Appbar-container">
        <img src={carehub_logo} height="40px" />
        <ul>
          <li>
            <Link
              to={"services"}
              onClick={() => {
                handleClick("services");
              }}
              className={selected == "services" ? "selected" : ""}
            >
              <MdOutlineMedicalServices style={{ fontSize: "18px" }} />
              <span>Services</span>
            </Link>
          </li>
          <li>
            <Link
              to={"bloodtests"}
              onClick={() => {
                handleClick("bloodtests");
              }}
              className={selected == "bloodtests" ? "selected" : ""}
            >
              <MdOutlineBloodtype style={{ fontSize: "18px" }} />
              <span>Blood Tests</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
export default AppBar;
