import React from "react";
import ElderlyCare_details from "../components/ElderlyCare_details";
import Container from "react-bootstrap/Container";
import Link from "next/link";

const ElderlyCare = () => {
  return (
    <>
      <div className="servicepage_banner">
        <Container>
          <h2 className="fs-2 fw-bold text-white">Elderly Care</h2>
          <ul className="breadcrumb">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>Elderly Care</li>
          </ul>
        </Container>
      </div>
      <ElderlyCare_details />
    </>
  );
};

export default ElderlyCare;