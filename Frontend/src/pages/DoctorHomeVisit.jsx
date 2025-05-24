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
        <title>Doctor Home Visit Services in Dubai, Doctor on Call 24x7</title>
        <meta
          name="description"
          content="CareHub Healthcare provides reliable doctor home visit services in Dubai. Get access to expert doctors on call, delivering quality healthcare at your convenience."
        />
        <meta
          name="keywords"
          content="Doctor home visit dubai, Doctor on call in Dubai"
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
