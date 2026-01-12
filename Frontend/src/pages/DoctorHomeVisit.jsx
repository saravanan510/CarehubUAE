import React from "react";
import DoctorHomeVisit_details from "../components/DoctorHomeVisit_details";
import ScrollToTop from "../components/ScrollTop";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const DoctorHomeVisit = () => {
  return (
    <>
      <ScrollToTop />
      <Helmet>
        <title>
          Professional Doctor Home Visit Dubai | 24/7 Licensed Carehub
          Physicians
        </title>
        <meta
          name="description"
          content="Skip the clinic wait. Get a DHA-licensed doctor at home in Dubai within 60 minutes. Expert consultations, prescriptions, and lab tests at your doorstep."
        />
        <meta
          name="keywords"
          content="Doctor home visit Dubai, DHA licensed doctor at home, On-call doctor Dubai, 24/7 home physician UAE, Pediatric doctor home visit, Emergency doctor at home."
        />
        <link
          rel="canonical"
          href="https://www.carehubuae.com/doctor-home-visits"
        />
      </Helmet>
      <div className="servicepage_banner">
        <Container>
          <h2 className="fs-2 fw-bold text-white">Doctor Home Visit</h2>
          <ul class="breadcrumb">
            <li>
              <Link to={"/"}>Home</Link>
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
