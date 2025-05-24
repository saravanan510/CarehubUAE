import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import ScrollToTop from "../components/ScrollTop";

const RefundPolicy = () => {
  return (
    <>
      <ScrollToTop />
      <div className="servicepage_banner">
        <Container>
          <h2 className="fs-1 fw-semibold text-white">Refund Policy</h2>
          <ul class="breadcrumb">
            <li>
              <Link to={"/"}>Home </Link>
            </li>
            <li>Refund Policy</li>
          </ul>
        </Container>
      </div>
      <div>
        <Container>
          <Row>
            <div className="py-5">
              <p>
                With Carehub healthcare you can pay it through many types of
                online payment mode and other methods. Having said this, we do
                not entertain an appeal for a refund on a payment as our care
                provisions are services. Our services are mostly impromptu and
                we offer them as ‘quick response’ to customers and so our
                offerings are mostly impromptu services. While some refund
                policies may apply in very rare cases, there are some policies
                which differ from case to case. These refunds are carried only
                on individual cases and facts.
              </p>
              <p>This is the refund policy followed by Carehub Health care. </p>
              <div>
                <ul>
                  <li>
                    After making a single request for refund, you can’t do so
                    for the same order for another request for refund.
                  </li>
                  <li>
                    To claim your refund you should forward payment details. If
                    your request meets the above mentioned criteria you would
                    only be able to initiate the process of refund and
                    scrutinize the above mentioned documents.
                  </li>
                  <li>
                    A refund has no interest amount associated with it
                    regardless of whether the refund is generated in the
                    customer’s actual payment or generated on the customer a day
                    later.
                  </li>
                  <li>
                    Customers who continually ask for a return refund (for no
                    apparent reason), will be restricted from seeing details
                    within our website. Additionally, their registration will be
                    cancelled.
                  </li>
                </ul>
              </div>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
};
export default RefundPolicy;
