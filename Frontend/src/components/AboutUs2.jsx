"use client";
import Image from "next/image";
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

                  <div className="about_sub2 mt-4">
                    <div className="about_list">
                      <div className="about_icon">
                        <Image src={list_icon} alt="List icon" width={20} height={20} />
                      </div>
                      <p>
                        Expert Clinical Management: Full support with medication
                        administration, enteral feeding (PEG), pain management,
                        tracheostomy care, stoma, and catheter care.
                      </p>
                    </div>
                    <div className="about_list">
                      <div className="about_icon">
                        <Image src={list_icon} alt="List icon" width={20} height={20} />
                      </div>
                      <p>
                        Personalized Care Pathways: Every patient receives a
                        bespoke care plan tailored to their unique medical
                        history, recovery goals, and personal lifestyle wishes.
                      </p>
                    </div>
                    <div className="about_list">
                      <div className="about_icon">
                        <Image src={list_icon} alt="List icon" width={20} height={20} />
                      </div>
                      <p>
                        Multidisciplinary Specialists: Our nursing team includes
                        experts in Cancer care, Cardiovascular health, Diabetes
                        management, Post-Stroke recovery, and Neurological
                        rehabilitation.
                      </p>
                    </div>
                    <div className="about_list">
                      <div className="about_icon">
                        <Image src={list_icon} alt="List icon" width={20} height={20} />
                      </div>
                      <p>
                        Full-Service Coordination: We provide accompaniment to
                        medical appointments and act as a constant liaison
                        between you and your hospital doctors for seamless
                        post-surgery support.
                      </p>
                    </div>
                    <div className="about_list">
                      <div className="about_icon">
                        <Image src={list_icon} alt="List icon" width={20} height={20} />
                      </div>
                      <p>
                        Emotional & Holistic Guidance: Beyond medical tasks, we
                        offer expert emotional support and continual reassurance
                        to help families navigate the challenges of recovery.
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={4} className="about_img">
              <Image src={Assistance} alt="Assistance" className=" rounded" />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AboutUs2;
