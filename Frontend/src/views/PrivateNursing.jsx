import React from "react";
import PrivateNursing_details from "../components/PrivateNursing_details";
import Container from "react-bootstrap/Container";
import Link from "next/link";

const PrivateNursing = () => {
  return (
    <>
      <div className="servicepage_banner">
        <Container>
          <p className="fs-2 fw-bold text-white mb-2">Home Nursing Services</p>
          <ul className="breadcrumb">
            <li>
              <Link href="/">Home</Link>
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