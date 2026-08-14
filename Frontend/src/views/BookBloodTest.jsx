"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BloodTestBanner from "../assets/bloodtestbanner.jpg";
import Link from "next/link";
import { RiContrastDrop2Line } from "react-icons/ri";
import { FaRegFile } from "react-icons/fa";
import { FiTruck } from "react-icons/fi";
import { FaRegCircleCheck } from "react-icons/fa6";
import SelectTest from "../components/SelectTest";
import Cart from "../components/Cart";
import testData from "../utils/testData";
import packageTests from "../utils/packageData";
import { useBookingDetails } from "../context/Context";
import { useRouter } from "next/navigation";
import FeatureIcon from "../assets/features.svg";
import Accordion from "react-bootstrap/Accordion";
import { AnimatedOnScroll } from "react-animated-css-onscroll";

const BookBloodTest = () => {
  const [selectedTest, setSelectedTest] = useState([]);
  const { bookingDetails, handleDetails } = useBookingDetails();
  const router = useRouter();

  useEffect(() => {
    let selectedTestData = [];
    selectedTest.forEach((testID) => {
      selectedTestData.push(
        testData.find((test) => {
          return test.id === testID;
        }),
      );
    });
    handleDetails({ ...bookingDetails, tests: selectedTestData });
  }, [selectedTest]);

  const handleAddTest = (id) => {
    setSelectedTest((prevSelectedTest) => [...prevSelectedTest, id]);
  };

  const handleAddPackageTest = (testPackage) => {
    let newBookingDetails = { ...bookingDetails };
    newBookingDetails.tests.push(testPackage);
    handleDetails(newBookingDetails);
    router.push("/select-date&time");
  };
  const handleRemoveTest = (id) => {
    const updatedId = selectedTest.filter((testid) => testid !== id);
    setSelectedTest(updatedId);
  };

  return (
    <>
      <section className="bookbloodtest_banner">
        <Container>
          <Row className="">
            <Col lg={5}>
              <div className="bookbloodtest_img">
                <Image
                  src={BloodTestBanner}
                  alt="Blood Test Banner"
                  className="img-fluid"
                />
              </div>
            </Col>
            <Col lg={1}></Col>
            <Col className="align-self-center">
              <div>
                <h1 className="fs-3 fw-bold" style={{ color: "#012a4a" }}>
                  Blood Test at Home in Dubai - Fast, Certified & Convenient.
                </h1>
                <p>
                  Getting a blood test at home in Dubai no longer means taking
                  time off work or sitting in a crowded lab waiting room.
                  Carehub sends a trained phlebotomist to your home, office, or
                  hotel anywhere in Dubai, collects your sample safely and
                  hygienically, and has it processed at a DHA-certified
                  laboratory. Whether you need a single test or a full health
                  package, you can book online in minutes and get your reports
                  within 24 hours — without leaving your couch.
                </p>
              </div>
              <div className="bookbloodtest_tag p-3">
                <div className="d-md-flex justify-content-md-around">
                  <div>
                    <div className="d-md-flex">
                      <div className="me-3">
                        <FaRegFile />
                      </div>
                      <div className="p-0">
                        <p
                          className="fw-semibold m-0"
                          style={{ color: "white" }}
                        >
                          100+ Tests
                        </p>
                        <p className="m-0" style={{ color: "white" }}>
                          with certified labs
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="border-end border-white mx-3 mx-lg-4"></div>
                  <div>
                    <div className="d-md-flex">
                      <div className="me-3">
                        <FiTruck />
                      </div>
                      <div className="p-0">
                        <p
                          className="fw-semibold m-0"
                          style={{ color: "white" }}
                        >
                          Free at-home sample collection
                        </p>
                        <p className="m-0" style={{ color: "white" }}>
                          Above AED 250
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col className="header">
              <h2 className="fs-2 fw-bold">
                Select our flexible lab at home services price plan that saves
                your money
              </h2>
              <p>
                Discover a wide range of advanced features designed to make your
                blood testing process easier, faster, and more accurate. Our
                innovative home testing solutions ensure reliable results while
                saving you time and effort. With user-friendly kits and
                professional accuracy, you can monitor your health from the
                comfort of home. We focus on delivering convenience and
                dependable outcomes you can trust. Best of all, our blood
                testing services are offered at a price that fits your budget
                without compromising on quality.
              </p>
            </Col>
          </Row>

          <Row className="g-2 d-flex align-items-stretch">
            {packageTests.map((testPackage, i) => {
              return (
                <Col xs={12} md={6} lg={3} className="d-flex" key={i}>
                  <div className={"price_card"}>
                    <div>
                      <div className="border-bottom mb-3">
                        <h6 className="">{testPackage.name}</h6>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "baseline",
                            gap: "6px",
                          }}
                        >
                          <h5 className="fw-semibold mb-1">
                            {testPackage.price} AED
                          </h5>
                          <p className=" text-decoration-line-through">
                            {testPackage.excisting_price} AED
                          </p>
                        </div>
                      </div>
                      <div>
                        {testPackage.benefits.map((benefit, i) => {
                          return (
                            <div
                              className="d-flex align-items-center my-2"
                              key={i}
                            >
                              <RiContrastDrop2Line className="me-2" />
                              <p className="m-0">{benefit}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <button
                      className={"price_card_button"}
                      onClick={() => handleAddPackageTest(testPackage)}
                    >
                      Book a Test
                    </button>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>
      <SelectTest
        tests={testData}
        handleAddTest={handleAddTest}
        handleRemoveTest={handleRemoveTest}
      />
      <section>
        <Container>
          <Row>
            <Col className="header">
              <h2 className="fs-2 fw-bold">
                Why Choose a Home Blood Test in Dubai
              </h2>
              <p>
                Dubai's pace of life doesn't leave much room for a two-hour trip
                to a lab, especially when it involves parking, queuing, and
                waiting for a token number. A home blood test in Dubai solves
                that problem directly — a certified nurse comes to you at a time
                that suits your schedule, whether that's early morning before
                work, during your lunch break, or late evening after the kids
                are asleep. This service isn't just about convenience, either.
                For elderly patients, people with mobility issues, new parents,
                or anyone who simply feels anxious in a clinical setting, having
                the test done at home makes the entire experience calmer and
                easier. The sample is still handled with the same clinical
                standards as an in-lab draw — sterile equipment, proper storage,
                and same-day transport to the laboratory for processing.
              </p>
            </Col>
          </Row>
          <Row>
            <Col className="header">
              <h2 className="fs-2 fw-bold">How It Works</h2>
              <p>
                Booking a blood test at home in Dubai with Carehub is a simple
                four-step process:
              </p>
              <ul className="service_page_features_list">
                <li>
                  <Image
                    src={FeatureIcon}
                    alt="Feature icon"
                    className="me-2"
                    width={16}
                    height={16}
                  />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">
                      Choose your test or package{" "}
                    </span>
                    pick individual tests like a Complete Blood Count or Vitamin
                    D check, or select a bundled package such as the PCOD
                    Profile, Diabetes Screen, or Wellness Package.
                  </p>
                </li>
                <li>
                  <Image
                    src={FeatureIcon}
                    alt="Feature icon"
                    className="me-2"
                    width={16}
                    height={16}
                  />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">
                      Book your slot online or by phone{" "}
                    </span>{" "}
                    select a convenient time; same-day appointments are usually
                    available.
                  </p>
                </li>
                <li>
                  <Image
                    src={FeatureIcon}
                    alt="Feature icon"
                    className="me-2"
                    width={16}
                    height={16}
                  />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">
                      Sample collection at your doorstep{" "}
                    </span>{" "}
                    A certified phlebotomist arrives with all the equipment
                    needed, collects the sample, and takes standard hygiene
                    precautions.
                  </p>
                </li>
                <li>
                  <Image
                    src={FeatureIcon}
                    alt="Feature icon"
                    className="me-2"
                    width={16}
                    height={16}
                  />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">Receive your report </span> A
                    Results are shared digitally, typically within 24 hours, and
                    can be reviewed with a doctor if needed.
                  </p>
                </li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col className="header">
              <h2 className="fs-2 fw-bold">Areas We Cover</h2>
              <p>
                Carehub's home blood test service covers Dubai and the wider
                UAE, including areas such as Al Karama, Deira, Bur Dubai,
                Jumeirah, Business Bay, Downtown Dubai, and Dubai Marina. If
                you're unsure whether your area is covered, a quick call or
                WhatsApp message confirms availability before you book.
              </p>
            </Col>
          </Row>
          <Row>
            <Col className="header">
              <h2 className="fs-2 fw-bold">What Makes Carehub Different</h2>

              <ul className="service_page_features_list">
                <li>
                  <Image
                    src={FeatureIcon}
                    alt="Feature icon"
                    className="me-2"
                    width={16}
                    height={16}
                  />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">Certified labs </span>
                    Every sample is processed through accredited laboratories,
                    so results are accurate and accepted by clinics and
                    hospitals across the UAE.
                  </p>
                </li>
                <li>
                  <Image
                    src={FeatureIcon}
                    alt="Feature icon"
                    className="me-2"
                    width={16}
                    height={16}
                  />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">Transparent pricing </span>{" "}
                    Packages start from AED 250 with no hidden collection fees.
                  </p>
                </li>
                <li>
                  <Image
                    src={FeatureIcon}
                    alt="Feature icon"
                    className="me-2"
                    width={16}
                    height={16}
                  />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">Fast turnaround </span> Most
                    reports are ready within 24 hours.
                  </p>
                </li>
                <li>
                  <Image
                    src={FeatureIcon}
                    alt="Feature icon"
                    className="me-2"
                    width={16}
                    height={16}
                  />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">
                      Trained, background-checked staff{" "}
                    </span>{" "}
                    A Every phlebotomist follows strict hygiene and safety
                    protocols during home visits.
                  </p>
                </li>
                <li>
                  <Image
                    src={FeatureIcon}
                    alt="Feature icon"
                    className="me-2"
                    width={16}
                    height={16}
                  />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">Wide test menu </span> From
                    routine checks like Thyroid Function and Lipid Profile to
                    specialised panels like Infertility, PCOD, and Infection
                    screening.
                  </p>
                </li>
              </ul>

              <p>
                Whether you need a one-off test before a medical appointment or
                want to build a regular health monitoring routine, booking a
                blood test at home in Dubai with Carehub means fewer disruptions
                to your day and one less thing to worry about.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <AnimatedOnScroll animationIn="animate__slideInUp">
              <Col className="header animate__animated animate__fadeInDown">
                <h2 className="fs-3 fw-bold">Frequently Asked Questions</h2>
                <p>
                  At Carehub Healthcare, we offer a wide range of comprehensive
                  services designed to cater to the unique needs of our clients.
                </p>
              </Col>
            </AnimatedOnScroll>
          </Row>
          <Row className="justify-content-md-center">
            <Col lg={8}>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    How much does a home blood test cost in Dubai?
                  </Accordion.Header>
                  <Accordion.Body>
                    Individual tests and packages with Carehub start from AED
                    250, covering free at-home sample collection. Pricing varies
                    depending on the specific test or package selected.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    How long does it take to get results?
                  </Accordion.Header>
                  <Accordion.Body>
                    Most reports are delivered within 24 hours of sample
                    collection, though some specialised tests may take longer.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    Is home blood sample collection safe and hygienic?
                  </Accordion.Header>
                  <Accordion.Body>
                    Yes. All samples are collected by trained phlebotomists
                    using sterile, single-use equipment and are transported to
                    certified labs under proper storage conditions.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>
                    Which areas in Dubai do you cover for home blood tests?
                  </Accordion.Header>
                  <Accordion.Body>
                    Carehub covers Dubai and surrounding areas across the UAE,
                    including Al Karama, Deira, Bur Dubai, Business Bay,
                    Downtown Dubai, and Dubai Marina.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header>
                    Do I need to fast before a home blood test?
                  </Accordion.Header>
                  <Accordion.Body>
                    It depends on the test. Fasting tests such as glucose or
                    lipid profile typically require 8–12 hours of fasting — this
                    will be confirmed when you book.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
        </Container>
      </section>
      {selectedTest.length > 0 && <Cart selectedTest={selectedTest} />}
    </>
  );
};
export default BookBloodTest;
