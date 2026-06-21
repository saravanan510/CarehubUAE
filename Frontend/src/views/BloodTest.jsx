import React from "react";
import BloodTest_details from "../components/BloodTest_details";
import Container from "react-bootstrap/Container";
import Link from "next/link";

const BloodTest = () => {
  return (
    <>
      <div className="servicepage_banner">
        <Container>
          <h2 className="fs-2 fw-bold text-white">Blood Test</h2>
          <ul className="breadcrumb">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>Blood Test</li>
          </ul>
        </Container>
      </div>
      <BloodTest_details />
    </>
  );
};

export default BloodTest;