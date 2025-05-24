import React from "react";
import ElderlyCare_details from "../components/ElderlyCare_details";
import ScrollToTop from "../components/ScrollTop";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const ElderlyCare = () => {
  return (
    <>
      <ScrollToTop />
      <Helmet>
        <title>Elderly Home Care Nursing Services in Dubai at Home</title>
        <meta
          name="description"
          content="Choose Carehub Healthcare for comprehensive elderly care in Dubai. Our services include nursing care, personal assistance, and companionship, promoting independence and well-being."
        />
        <meta
          name="keywords"
          content="Home Care for Elderly in Dubai, Elderly Care in Dubai, Elderly Care Nursing in Dubai at Home, Elderly Care Services in Dubai"
        />
        <link
          rel="canonical"
          href="https://www.carehubuae.com/ventilator-care"
        />
      </Helmet>
      <div className="servicepage_banner">
        <Container>
          <h2 className="fs-2 fw-bold text-white">Elderly Care</h2>
          <ul class="breadcrumb">
            <li>
              <Link to={"/"}>Home</Link>
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
