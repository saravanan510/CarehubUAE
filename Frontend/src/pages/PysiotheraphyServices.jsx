import React from "react";
import PysiotheraphyServices_details from "../components/PysiotheraphyServices_details";
import ScrollToTop from "../components/ScrollTop";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const PysiotheraphyServices = () => {
  return (
    <>
      <ScrollToTop />
      <Helmet>
        <title>
          Physiotheraphy at home in dubai, UAE, Physiotherapist at home services{" "}
        </title>
        <meta
          name="description"
          content="CareHub Healthcare offers professional physiotherapy at home in Dubai and across the UAE. Experience expert home physiotherapy services tailored to your needs, ensuring comfort and convenience."
        />
        <meta
          name="keywords"
          content="Physiotherapist at home in dubai, Home physiotherapy in dubai, physiotherapy at home services in UAE"
        />
        <link
          rel="canonical"
          href="https://www.carehubuae.com/physiotherapy-services"
        />
      </Helmet>
      <div className="servicepage_banner">
        <Container>
          <h2 className="fs-2 fw-bold text-white">Pysiotheraphy Services</h2>
          <ul class="breadcrumb">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>Pysiotheraphy Services</li>
          </ul>
        </Container>
      </div>
      <PysiotheraphyServices_details />
    </>
  );
};

export default PysiotheraphyServices;
