import React from "react";
import BloodTest_details from "../components/BloodTest_details";
import ScrollToTop from "../components/ScrollTop";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const BloodTest = () => {
  return (
    <>
      <ScrollToTop />
      <Helmet>
        <title>
          24x7 Diagnostic Blood Test at Home in Dubai, Lab Test at Home Service
          UAE
        </title>
        <meta
          name="description"
          content="Carehub offers reliable Blood Test at Home in Dubai and UAE. Experience our Lab Test at Home Service in Dubai, including comprehensive diagnostic blood tests, ensuring convenience and accuracy from the comfort of your home."
        />
        <meta
          name="keywords"
          content="Blood Test at Home in Dubai, Lab Test at Home Service in Dubai, Diagnostic Blood Test at Home in Dubai, UAE"
        />
        <link rel="canonical" href="https://www.carehubuae.com/blood-test" />
      </Helmet>
      <div className="servicepage_banner">
        <Container>
          <h2 className="fs-2 fw-bold text-white">Blood Test</h2>
          <ul class="breadcrumb">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>Blood Test</li>
          </ul>
        </Container>
      </div>
      <BloodTest_details />
    </>
  );
};

export default BloodTest;
