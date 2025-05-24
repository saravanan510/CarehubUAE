import React from "react";
import MedicalTourism_details from "../components/MedicalTourism_details";
import ScrollToTop from "../components/ScrollTop";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const MedicalTourism = () => {
  return (
    <>
      <ScrollToTop />
      <Helmet>
        <title>Medical Tourism Company in Dubai, UAE</title>
        <meta
          name="description"
          content="Discover the best medical tourism company in UAE and Dubai. Our expert services connect you with top healthcare providers for world-class treatment, ensuring a seamless and trusted medical travel experience."
        />
        <meta
          name="keywords"
          content="medical tourism company in uae, medical tourism company in dubai"
        />
        <link
          rel="canonical"
          href="https://www.carehubuae.com/medical-tourism"
        />
      </Helmet>
      <div className="servicepage_banner">
        <Container>
          <h2 className="fs-2 fw-bold text-white">Medical Tourism</h2>
          <ul class="breadcrumb">
            <li>
              <Link to={"/"}>Home</Link>
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
