import React from "react";
import VentilatorCare_details from "../components/VentilatorCare_details";
import Container from "react-bootstrap/Container";
import Link from "next/link";

const VentilatorCare = () => {
  return (
    <>
      <div className="servicepage_banner">
        <Container>
          <h2 className="fs-2 fw-bold text-white">Ventilator Care</h2>
          <ul className="breadcrumb">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>Ventilator Care</li>
          </ul>
        </Container>
      </div>
      <VentilatorCare_details />
    </>
  );
};

export default VentilatorCare;