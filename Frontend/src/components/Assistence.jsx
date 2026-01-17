import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Benefits from "../assets/benefits.png";
import list_icon from "../assets/list-icon.svg";
import React from "react";
import { AnimatedOnScroll } from "react-animated-css-onscroll";

const AboutUs = () => {
  return (
    <section className="assistance">
      <Container>
        <Row className="assistance_row">
          <Col lg={8}>
            <Row className="mb-4">
              <Col>
                <AnimatedOnScroll animationIn="animate__slideInUp">
                  <h2 className="about_heading fs-3 fw-bold mb-4 animate__animated animate__fadeInDown">
                    Key Benefits of Choosing Carehub Healthcare
                  </h2>
                </AnimatedOnScroll>
                <div>
                  <div className="about_list mb-3">
                    <div className="about_icon">
                      <img src={list_icon} />
                    </div>
                    <p>
                      Support with clinical management: Expert administration of
                      enteral feeding, tracheostomy care, and stoma management.
                    </p>
                  </div>
                  <div className="about_list mb-3">
                    <div className="about_icon">
                      <img src={list_icon} />
                    </div>
                    <p>
                      Personalized Care Plans: Tailored to your unique medical
                      history, specific recovery goals, and personal wishes.
                    </p>
                  </div>
                  <div className="about_list mb-3">
                    <div className="about_icon">
                      <img src={list_icon} />
                    </div>
                    <p>
                      Specialized Nursing Fields: Including cancer care,
                      neurological rehabilitation, and end-of-life palliative
                      support.
                    </p>
                  </div>
                  <div className="about_list mb-3">
                    <div className="about_icon">
                      <img src={list_icon} />
                    </div>
                    <p>
                      Medical Liaison: Accompaniment to appointments and
                      constant liaison with your primary medical professionals.
                    </p>
                  </div>
                  <div className="about_list mb-3">
                    <div className="about_icon">
                      <img src={list_icon} />
                    </div>
                    <p>
                      Holistic Guidance: Expert emotional support and continual
                      reassurance for both patients and their families.
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col className="about_img">
            <img src={Benefits} className=" rounded" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;
