import React from "react";
import PediatricPalliative_details from "../components/PediatricPalliative_details";
import Container from "react-bootstrap/Container";
import Link from "next/link";

const PediatricPalliative = () => {
  return (
    <>
      <div className="servicepage_banner">
        <Container>
          <h2 className="fs-2 fw-bold text-white">Pediatric Palliative</h2>
          <ul className="breadcrumb">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>Pediatric Palliative</li>
          </ul>
        </Container>
      </div>
      <PediatricPalliative_details />
    </>
  );
};

export default PediatricPalliative;