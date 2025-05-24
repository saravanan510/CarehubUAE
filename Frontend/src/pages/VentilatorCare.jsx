import React from "react";
import VentilatorCare_details from "../components/VentilatorCare_details";
import ScrollToTop from "../components/ScrollTop";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const VentilatorCare = () => {
  return (
    <>
      <ScrollToTop />
      <Helmet>
        <title>
          Ventilator Care at Home in Dubai, Home Care Services for Ventilated
          Patients
        </title>
        <meta
          name="description"
          content="Reliable ventilator care at home in Dubai. Carehub Healthcare offers specialized nursing for ventilated patients."
        />
        <meta
          name="keywords"
          content="Ventilator Care at Home in Dubai, Home Care Services for Ventilated Patients"
        />
        <link
          rel="canonical"
          href="https://www.carehubuae.com/ventilator-care"
        />
      </Helmet>
      <div className="servicepage_banner">
        <Container>
          <h2 className="fs-2 fw-bold text-white">Ventilator Care</h2>
          <ul class="breadcrumb">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>Ventilator Care</li>
          </ul>
        </Container>
      </div>
      <VentilatorCare_details />
    </>
  );
};

export default VentilatorCare;
