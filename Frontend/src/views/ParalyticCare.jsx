import React from "react";
import ParalyticCare_details from "../components/ParalyticCare_details";
import Container from "react-bootstrap/Container";
import Link from "next/link";

const ParalyticCare = () => {
  return (
    <>
      <div className="servicepage_banner">
        <Container>
          <h2 className="fs-2 fw-bold text-white">Paralytic Care</h2>
          <ul className="breadcrumb">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>Paralytic Care</li>
          </ul>
        </Container>
      </div>
      <ParalyticCare_details />
    </>
  );
};

export default ParalyticCare;