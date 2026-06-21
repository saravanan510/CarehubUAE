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
        })
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
                <Image src={BloodTestBanner} alt="Blood Test Banner" className="img-fluid" />
              </div>
            </Col>
            <Col lg={1}></Col>
            <Col className="align-self-center">
              <div>
                <h2 className="fs-3 fw-bold" style={{ color: "#012a4a" }}>
                  Bringing quality healthcare.
                  <br /> Blood test at home in dubai.
                </h2>
                <p>
                  Experience reliable results delivered with convenience through our trusted home testing services. With easy-to-use kits and accurate reporting, you can take control of your health from the comfort of your home. No more waiting in long queues or dealing with delays—our home testing ensures fast, secure, and dependable outcomes, giving you the peace of mind you deserve.
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
                          Above AED 300
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
               Select our flexible lab at home services price plan that saves your money
              </h2>
              <p>
                Discover a wide range of advanced features designed to make your blood testing process easier, faster, and more accurate. Our innovative home testing solutions ensure reliable results while saving you time and effort. With user-friendly kits and professional accuracy, you can monitor your health from the comfort of home. We focus on delivering convenience and dependable outcomes you can trust. Best of all, our blood testing services are offered at a price that fits your budget without compromising on quality.
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
      {selectedTest.length > 0 && <Cart selectedTest={selectedTest} />}
    </>
  );
};
export default BookBloodTest;
