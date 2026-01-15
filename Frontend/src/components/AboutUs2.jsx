import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Assistance from "../assets/faq.png";
import list_icon from "../assets/list-icon.svg";
import React from "react";
import { AnimatedOnScroll } from "react-animated-css-onscroll";
import ScrollToTop from "../components/ScrollTop";
const AboutUs2 = () => {
  return (
    <>
      <ScrollToTop />
      <section className="assistance">
        <Container>
          <Row className="assistance_row">
            <Col>
              <Row className="mb-4">
                <Col>
                  <AnimatedOnScroll animationIn="animate__slideInUp ">
                    <h2 className="about_heading fs-2 fw-bold animate__animated animate__fadeInDown">
                      Why We Stand Out
                    </h2>
                  </AnimatedOnScroll>
                  <p className="about_para">
                    Selecting the right care for your loved one is a journey
                    built on trust. At Carehub Healthcare, we provide elite
                    1-to-1 private nursing care in Dubai, ensuring a seamless
                    recovery and total peace of mind for your family. As a
                    premier provider of home care services in the UAE, we take
                    immense pride in delivering superior clinical expertise
                    combined with a compassionate, human-centered approach.
                  </p>
                  <div className="about_sub">
                    <div className="about_list">
                      <div className="about_icon">
                        <img src={list_icon} />
                      </div>
                      <p>
                        Our internationally trained nurses are specialists in
                        their fields. They work tirelessly to help patients
                        manage complex medical conditions, promote physical
                        independence, and significantly enhance overall quality
                        of life within the comfort of home.
                      </p>
                    </div>
                    <div className="about_list">
                      <div className="about_icon">
                        <img src={list_icon} />
                      </div>
                      <p>
                        Tailored 24/7 Support: Receive individualized attention
                        from a dedicated nurse or a specialized care team. We
                        offer flexible scheduling, including short-term nursing
                        visits, live-in home care, overnight cover, or full
                        24-hour medical support.
                      </p>
                    </div>
                    <div className="about_list">
                      <div className="about_icon">
                        <img src={list_icon} />
                      </div>
                      <p>
                        Comprehensive Clinical Visits: Our expert nursing team
                        provides on-site assessments, professional wound care,
                        dressing changes, IVF injections, and IV infusions,
                        ensuring hospital-grade treatment at your doorstep.
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={4} className="about_img">
              <img src={Assistance} className=" rounded" />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AboutUs2;
