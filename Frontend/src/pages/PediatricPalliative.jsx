import React from "react";
import PediatricPalliative_details from "../components/PediatricPalliative_details";
import ScrollToTop from "../components/ScrollTop";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const PediatricPalliative = () => {
  return (
    <>
      <ScrollToTop />
      <Helmet>
        <title>Pediatric palliative care Nursing at home in Dubai, UAE</title>
        <meta
          name="description"
          content="Carehub Healthcare offers specialized pediatric palliative care in Dubai, providing compassionate, in-home nursing support for children in Dubai, UAE, focused on enhancing comfort and quality of life."
        />
        <meta
          name="keywords"
          content="Pediatric palliative care dubai, Pediatric palliative care Nursing  at home in dubai UAE"
        />
        <link
          rel="canonical"
          href="https://www.carehubuae.com/pediatric-palliative"
        />
      </Helmet>
      <div className="servicepage_banner">
        <Container>
          <h2 className="fs-2 fw-bold text-white">Pediatric Palliative</h2>
          <ul class="breadcrumb">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>Pediatric Palliative</li>
          </ul>
        </Container>
      </div>
      <PediatricPalliative_details />
    </>
  );
};

export default PediatricPalliative;
