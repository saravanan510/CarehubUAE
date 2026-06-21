import React from "react";
import ParkinsonCare_details from "../components/ParkinsonCare_details";
import Container from "react-bootstrap/Container";
import Link from "next/link";

const ParkinsonCare = () => {
  return (
    <>
      <div className="servicepage_banner">
        <Container>
          <h2 className="fs-2 fw-bold text-white">Parkinson Care</h2>
          <ul className="breadcrumb">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>Parkinson Care</li>
          </ul>
        </Container>
      </div>
      <ParkinsonCare_details />
    </>
  );
};

export default ParkinsonCare;