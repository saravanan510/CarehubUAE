import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaCircleCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <>
      <section>
        <Container>
          <Row>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <FaCircleCheck style={{ fontSize: "20px", color: "#009b45" }} />
              <h5 style={{ margin: "0px", color: "#009b45" }}>
                Payment successful !
              </h5>
            </div>
            <p style={{ fontWeight: 600, marginTop: "8px" }}>
              Thank you! Your payment of AED 123 has been received
            </p>
          </Row>
          <button className="custom-button me-2">
            <Link to={"/"}>Home</Link>
          </button>
        </Container>
      </section>
    </>
  );
};

export default PaymentSuccess;
