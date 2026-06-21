import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { IoIosCall } from "react-icons/io";
import { IoIosGlobe } from "react-icons/io";
const TopBar = () => {
  return (
    <div className="d-none d-lg-block topBar">
      <Container>
        <Row>
          <Col className="fw-semibold">
            <a
              style={{
                textDecoration: "none",
                display: "flex",
                gap: "8px",
              }}
              href="tel:+971 55 933 9234"
            >
              <IoIosCall style={{ color: "white", fontSize: "24px" }} />
              <p style={{ color: "white", margin: "0px" }}>+971 55 933 9234</p>
            </a>
          </Col>

          <Col className="fw-semibold ">
            <a
              style={{
                textDecoration: "none",
                display: "flex",
                justifyContent: "flex-end",
                gap: "8px",
              }}
              href="mailto:info@carehubuae.com"
            >
              <IoIosGlobe style={{ color: "white", fontSize: "24px" }} />
              <p style={{ color: "white", margin: "0px" }}>
                info@carehubuae.com
              </p>
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TopBar;
