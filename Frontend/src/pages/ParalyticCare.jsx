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
        <title>
          Specialist Palliative Care Services in Dubai | Compassionate Home
          Support
        </title>
        <meta
          name="description"
          content="Experience dignity and expert medical comfort with our DHA-licensed palliative care in Dubai. We specialize in symptom relief and family support for serious illnesses at home."
        />
        <meta
          name="keywords"
          content="Palliative care Dubai, DHA licensed palliative care, chronic illness support UAE, home pain management Dubai, end of life care Dubai."
        />
        <link
          rel="canonical"
          href="https://www.carehubuae.com/palliative-care-dubai"
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
