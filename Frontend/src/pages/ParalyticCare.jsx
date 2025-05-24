import React from "react";
import ParalyticCare_details from "../components/ParalyticCare_details";
import ScrollToTop from "../components/ScrollTop";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const ParalyticCare = () => {
  return (
    <>
      <ScrollToTop />
      <Helmet>
        <title>Paralytic care services at home in dubai,UAE</title>
        <meta
          name="description"
          content="Carehub Healthcare provides specialized paralytic care services in Dubai, offering compassionate, expert support to enhance comfort and quality of life for individuals with paralysis in Dubai, UAE."
        />
        <meta name="keywords" content="Paralytic care services Dubai" />
        <link
          rel="canonical"
          href="https://www.carehubuae.com/paralytic-care"
        />
      </Helmet>
      <div className="servicepage_banner">
        <Container>
          <h2 className="fs-2 fw-bold text-white">Paralytic Care</h2>
          <ul class="breadcrumb">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>Paralytic Care</li>
          </ul>
        </Container>
      </div>
      <ParalyticCare_details />
    </>
  );
};

export default ParalyticCare;
