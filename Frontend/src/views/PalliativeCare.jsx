import React from "react";
import PalliativeCare_details from "../components/PalliativeCare_details";
import Container from "react-bootstrap/Container";
import Link from "next/link";

const PalliativeCare = () => {
  return (
    <>
      <div className="servicepage_banner">
        <Container>
          <h2 className="fs-2 fw-bold text-white">Palliative Care</h2>
          <ul className="breadcrumb">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>Palliative Care</li>
          </ul>
        </Container>
      </div>
      <PalliativeCare_details />
    </>
  );
};

export default PalliativeCare;