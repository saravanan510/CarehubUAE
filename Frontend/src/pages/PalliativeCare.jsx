import React from "react";
import PalliativeCare_details from "../components/PalliativeCare_details";
import ScrollToTop from "../components/ScrollTop";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const PalliativeCare = () => {
  return (
    <>
      <ScrollToTop />
      <Helmet>
        <title>
          Palliative Care Nursing, Palliative Home Care Services in Dubai & UAE
        </title>
        <meta
          name="description"
          content="Experience compassionate palliative care with Carehub Healthcare. Our dedicated nurses provide specialized care and support in the comfort of your home in Dubai."
        />
        <meta
          name="keywords"
          content="Palliative Home Care Services in Dubai, Palliative Nursing in Dubai, Palliative Care at Home in Dubai"
        />
        <link
          rel="canonical"
          href="https://www.carehubuae.com/palliative-care"
        />
      </Helmet>
      <div className="servicepage_banner">
        <Container>
          <h2 className="fs-2 fw-bold text-white">Palliative Care</h2>
          <ul class="breadcrumb">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>Palliative Care</li>
          </ul>
        </Container>
      </div>
      <PalliativeCare_details />
    </>
  );
};

export default PalliativeCare;
