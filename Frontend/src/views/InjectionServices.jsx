import React from "react";
import InjectionServices_details from "../components/InjectionServices_details";
import Container from "react-bootstrap/Container";
import Link from "next/link";

const InjectionServices = () => {
  return (
    <>
      <div className="servicepage_banner">
        <Container>
          <h2 className="fs-2 fw-bold text-white">Injection Services</h2>
          <ul className="breadcrumb">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>Injection Services</li>
          </ul>
        </Container>
      </div>
      <InjectionServices_details />
    </>
  );
};

export default InjectionServices;