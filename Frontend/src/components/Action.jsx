import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { IoIosCall } from "react-icons/io";
import { IoIosContact } from "react-icons/io";
import { IoLogoWhatsapp } from "react-icons/io";
import { Link } from "react-router-dom";

const Action = () => {
  return (
    <div className="fixed-actionbg ">
      <Container>
        <Row>
          <Col className="text-center">
            <div className="action-item">
              <a href="tel:+971 55 933 9234">
                <IoIosCall style={{ color: "white" }} className="fs-2" />
                <p>Call US</p>
              </a>
            </div>
          </Col>
          <Col className="text-center">
            <div className="action-item">
              <Link to={"/contact"}>
                <IoIosContact style={{ color: "white" }} className="fs-2" />
                <p>Call Back</p>
              </Link>
            </div>
          </Col>
          <Col className="text-center">
            <div className="action-item">
              <a href="https://wa.me/+971 55 933 9234">
                <IoLogoWhatsapp style={{ color: "white" }} className="fs-2" />
                <p>Whatsapp</p>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Action;
