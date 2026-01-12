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
        <title>
          Elderly Care Services in Dubai | Compassionate Senior Home Nursing
        </title>
        <meta
          name="description"
          content="Professional elderly care in Dubai by Carehub. We offer DHA-licensed nursing, dementia support, and 24/7 companionship. Help your loved ones age with dignity."
        />
        <meta
          name="keywords"
          content="Elderly care Dubai, Senior home nursing UAE, Dementia care at home, DHA licensed nurses for seniors, Fall prevention for elderly."
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
