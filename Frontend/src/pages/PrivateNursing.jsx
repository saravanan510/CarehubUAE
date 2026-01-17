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
        <title>
          Home Nursing Services Dubai | Licensed Private Nurses | Carehub
        </title>
        <meta
          name="description"
          content="Experience elite home nursing in Dubai. DHA-licensed nurses for post-op care, IV therapy, and 24/7 medical support. Personalized care for faster recovery. Book your free consult!"
        />
        <meta
          name="keywords"
          content="Home nursing services Dubai, DHA licensed nurses Dubai, private nursing care UAE, 24 hour home nursing, post-surgical care at home, IV drip at home Dubai, wound care nursing services."
        />
        <link
          rel="canonical"
          href="https://www.carehubuae.com/home-nursing-services-dubai"
        />
      </Helmet>
      <div className="servicepage_banner">
        <Container>
          <h1 className="fs-2 fw-bold text-white">HOME NURSING SERVICES</h1>
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
