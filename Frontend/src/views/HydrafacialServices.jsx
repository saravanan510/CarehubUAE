import React from "react";
import HydrafacialServices_details from "../components/HydrafacialServices_details";
import Container from "react-bootstrap/Container";
import Link from "next/link";

const HydrafacialServices = () => {
  return (
    <>
      <div className="servicepage_banner">
        <Container>
          <h2 className="fs-2 fw-bold text-white">Hydrafacial Services</h2>
          <ul className="breadcrumb">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>Hydrafacial Services</li>
          </ul>
        </Container>
      </div>
      <HydrafacialServices_details />
    </>
  );
};

export default HydrafacialServices;