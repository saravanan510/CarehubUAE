import React from "react";
import HydrafacialServices_details from "../components/HydrafacialServices_details";
import ScrollToTop from "../components/ScrollTop";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const HydrafacialServices = () => {
  return (
    <>
      <ScrollToTop />
      <Helmet>
        <title>
          Hydrafacial Treatment Services in Dubai, Get Glowing Skin with
          Hydrafacial UAE
        </title>
        <meta
          name="description"
          content="Carehub provides premium Hydrafacial services in Dubai and UAE. Experience rejuvenating Hydrafacial treatment in Dubai with expert care for glowing, healthy skin."
        />
        <meta
          name="keywords"
          content="hydrafacial services in dubai, hydrafacial treatment in dubai uae"
        />
        <link
          rel="canonical"
          href="https://www.carehubuae.com/hydrafacial-services"
        />
      </Helmet>
      <div className="servicepage_banner">
        <Container>
          <h2 className="fs-2 fw-bold text-white">Hydrafacial Services</h2>
          <ul class="breadcrumb">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>Hydrafacial Services</li>
          </ul>
        </Container>
      </div>
      <HydrafacialServices_details />
    </>
  );
};

export default HydrafacialServices;
