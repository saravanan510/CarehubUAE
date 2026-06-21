import React from "react";
import DoctorHomeVisit_details from "../components/DoctorHomeVisit_details";
import Container from "react-bootstrap/Container";
import Link from "next/link";

const DoctorHomeVisit = () => {
  return (
    <>
      <div className="servicepage_banner">
        <Container>
          <h2 className="fs-2 fw-bold text-white">Doctor Home Visit</h2>
          <ul className="breadcrumb">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>Doctor Home Visit</li>
          </ul>
        </Container>
      </div>
      <DoctorHomeVisit_details />
    </>
  );
};

export default DoctorHomeVisit;