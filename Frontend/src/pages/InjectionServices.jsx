import React from "react";
import InjectionServices_details from "../components/InjectionServices_details";
import ScrollToTop from "../components/ScrollTop";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const InjectionServices = () => {
  return (
    <>
      <ScrollToTop />
      <Helmet>
        <title>
          Injection Service at Home | Medical Injection services Dubai, UAE
        </title>
        <meta
          name="description"
          content="Get reliable home injection services in Dubai with our expert team. We provide safe and professional medical injection services at home in Dubai, ensuring convenience and care."
        />
        <meta
          name="keywords"
          content="home injection services in dubai, medical injection service at home dubai"
        />
        <link
          rel="canonical"
          href="https://www.carehubuae.com/injection-services"
        />
      </Helmet>
      <div className="servicepage_banner">
        <Container>
          <h2 className="fs-2 fw-bold text-white">Injection Services</h2>
          <ul class="breadcrumb">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>Injection Services</li>
          </ul>
        </Container>
      </div>
      <InjectionServices_details />
    </>
  );
};

export default InjectionServices;
