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
          Professional Injection Services at Home Dubai | DHA Licensed Nurses
        </title>
        <meta
          name="description"
          content="Looking for injection services at home in Dubai? Our DHA-licensed nurses provide safe, clinical, and painless injections 24/7. Expert care delivered to your door."
        />
        <meta
          name="keywords"
          content="Injection services at home Dubai, DHA home nurse, medical injections Dubai, Vitamin drip home service, antibiotic injection at home."
        />
        <link
          rel="canonical"
          href="https://www.carehubuae.com/injection-services-at-home-dubai"
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
