import React from "react";
import PrivateNursing_details from "../components/PrivateNursing_details";
import Container from "react-bootstrap/Container";
import Link from "next/link";

const PrivateNursing = () => {
  return (
    <>
      <div
        className="servicepage_banner"
        style={{ minHeight: "100px", height: "auto", padding: "30px 0" }}
      >
        <Container>
          <ul className="breadcrumb m-0 p-0">
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