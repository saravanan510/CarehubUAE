import React from "react";
import ParkinsonCare_details from "../components/ParkinsonCare_details";
import ScrollToTop from "../components/ScrollTop";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const ParkinsonCare = () => {
  return (
    <>
      <ScrollToTop />
      <Helmet>
        <title>Parkinson disease care services at home in dubai, UAE</title>
        <meta
          name="description"
          content="Discover specialized Parkinson's care services in Dubai with CareHub Healthcare. Expert support for Parkinson's patients, ensuring comfort and compassionate care tailored to individual needs."
        />
        <meta
          name="keywords"
          content="parkinson care services dubai, parkinson disease care services dubai"
        />
        <link
          rel="canonical"
          href="https://www.carehubuae.com/parkinson-care"
        />
      </Helmet>
      <div className="servicepage_banner">
        <Container>
          <h2 className="fs-2 fw-bold text-white">Parkinson Care</h2>
          <ul class="breadcrumb">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>Parkinson Care</li>
          </ul>
        </Container>
      </div>
      <ParkinsonCare_details />
    </>
  );
};

export default ParkinsonCare;
