import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Assistance from "../assets/faq.png";
import list_icon from "../assets/list-icon.svg";
import React from "react";
import { AnimatedOnScroll } from "react-animated-css-onscroll";
import ScrollToTop from "../components/ScrollTop";

const AboutUs = () => {
  return (
    <>
      <ScrollToTop />
      <section className="assistance">
        <Container>
          <Row className="assistance_row">
            <Col lg={4} className="about_img">
              <img src={Assistance} className=" rounded" />
            </Col>

            <Col>
              <Row className="mb-4">
                <Col>
                  <AnimatedOnScroll animationIn="animate__slideInUp ">
                    <h2 className="about_heading fs-2 fw-bold animate__animated animate__fadeInDown">
                      Why choose a Carehub Healthcare Private Nurse?
                    </h2>
                  </AnimatedOnScroll>
                  <p className="about_para">
                    Choosing 1-2-1 private nursing care with Carehub Healthcare
                    ensures you have a smooth recovery, peace of mind and have
                    continued involvement of family and friends as you wish.  As
                    one of the leading providers of private home nursing care in
                    UAE, we take great pride in delivering superior levels of
                    care and support to clients living with a range of medical
                    conditions. Renowned for our clinical expertise and
                    compassionate approach, our nurses are specialists in their
                    field and work with you to improve your health, manage
                    medical conditions, promote independence and enhance your
                    wellbeing.
                  </p>
                  <div className="about_sub">
                    <div className="about_list">
                      <div className="about_icon">
                        <img src={list_icon} />
                      </div>
                      <p>
                        Individualised care from a dedicated nurse or team of
                        nurses, catering to your care requirements, whether for
                        a short visit, live in care, overnight cover or 24 hour
                        support.
                      </p>
                    </div>
                    <div className="about_list">
                      <div className="about_icon">
                        <img src={list_icon} />
                      </div>
                      <p>
                        Nursing visits (subject to location) for assessments,
                        dressing changes, IVF injections , IV infusions and
                        wound care.
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AboutUs;
