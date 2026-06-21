import React from "react";
import PysiotheraphyServices_details from "../components/PysiotheraphyServices_details";
import Container from "react-bootstrap/Container";
import Link from "next/link";

const PysiotheraphyServices = () => {
  return (
    <>
      <div className="servicepage_banner">
        <Container>
          <h2 className="fs-2 fw-bold text-white">Pysiotheraphy Services</h2>
          <ul className="breadcrumb">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>Pysiotheraphy Services</li>
          </ul>
        </Container>
      </div>
      <PysiotheraphyServices_details />
    </>
  );
};

export default PysiotheraphyServices;