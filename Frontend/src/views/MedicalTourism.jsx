import React from "react";
import MedicalTourism_details from "../components/MedicalTourism_details";
import Container from "react-bootstrap/Container";
import Link from "next/link";

const MedicalTourism = () => {
  return (
    <>
      <div className="servicepage_banner">
        <Container>
          <h2 className="fs-2 fw-bold text-white">Medical Tourism</h2>
          <ul className="breadcrumb">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>Medical Tourism</li>
          </ul>
        </Container>
      </div>
      <MedicalTourism_details />
    </>
  );
};

export default MedicalTourism;