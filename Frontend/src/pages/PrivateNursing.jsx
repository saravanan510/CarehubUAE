import React from "react";
import PrivateNursing_details from "../components/PrivateNursing_details";
import ScrollToTop from "../components/ScrollTop";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const PrivateNursing = () => {
  return (
    <>
      <ScrollToTop />
      <Helmet>
        <title>Home Nursing Services, Home Care Dubai</title>
        <meta
          name="description"
          content="Choose Carehub Healthcare for premium home care nursing services in Dubai. Our dedicated team offers tailored care, ensuring comfort and recovery at home."
        />
        <meta
          name="keywords"
          content="Home Nursing Services in Dubai, Home Care Nursing Dubai"
        />
        <link
          rel="canonical"
          href="https://www.carehubuae.com/home-nursing-services"
        />
      </Helmet>
      <div className="servicepage_banner">
        <Container>
          <h2 className="fs-2 fw-bold text-white">HOME NURSING SERVICES</h2>
          <ul class="breadcrumb">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>Home Nursing Services</li>
          </ul>
        </Container>
      </div>
      <PrivateNursing_details />
    </>
  );
};

export default PrivateNursing;
