import React, { useEffect, useState } from "react";
import ScrollToTop from "../components/ScrollTop";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Assistance from "../assets/faq.png";
import { Link } from "react-router-dom";
import { FaRegFile } from "react-icons/fa";
import { FiTruck } from "react-icons/fi";
import { FaRegCircleCheck } from "react-icons/fa6";
import SelectTest from "../components/SelectTest";
import Cart from "../components/Cart";
import testData from "../utils/testData";
import { useBookingDetails } from "../context/Context";

const BookBloodTest = () => {
  const [selectedTest, setSelectedTest] = useState([]);
  const { bookingDetails, handleDetails } = useBookingDetails();

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

  const handleRemoveTest = (id) => {
    const updatedId = selectedTest.filter((testid) => testid !== id);
    setSelectedTest(updatedId);
  };

  const pricesObj = [
    {
      current_price: 140,
      excisting_price: 140,
      benefits: [
        "Complete Blood Count(CBC)",
        "Complete Blood Count(CBC)",
        "Complete Blood Count(CBC)",
        "Complete Blood Count(CBC)",
        "Complete Blood Count(CBC)",
      ],
    },
    {
      current_price: 140,
      excisting_price: 140,
      benefits: [
        "Complete Blood Count(CBC)",
        "Complete Blood Count(CBC)",
        "Complete Blood Count(CBC)",
        "Complete Blood Count(CBC)",
        "Complete Blood Count(CBC)",
      ],
    },
    {
      current_price: 140,
      excisting_price: 140,
      benefits: [
        "Complete Blood Count(CBC)",
        "Complete Blood Count(CBC)",
        "Complete Blood Count(CBC)",
        "Complete Blood Count(CBC)",
        "Complete Blood Count(CBC)",
      ],
    },
    {
      current_price: 140,
      excisting_price: 140,
      benefits: [
        "Complete Blood Count(CBC)",
        "Complete Blood Count(CBC)",
        "Complete Blood Count(CBC)",
        "Complete Blood Count(CBC)",
        "Complete Blood Count(CBC)",
      ],
    },
  ];

  return (
    <>
      <ScrollToTop />
      <section className="bookbloodtest_banner">
        <Container>
          <Row className="">
            <Col lg={5}>
              <div className="bookbloodtest_img">
                <img src={Assistance} className="img-fluid" />
              </div>
            </Col>
            <Col lg={1}></Col>
            <Col className="align-self-center">
              <div>
                <h2 className="fs-2 fw-bold" style={{ color: "#012a4a" }}>
                  Create your own test
                </h2>
                <p>
                  Customize your own blood test package based on your own health
                  needs and benefit from flexible pricing.
                </p>
              </div>
              <div className="bookbloodtest_tag p-3">
                <div className="d-md-flex justify-content-md-around">
                  <div className="">
                    <div className="d-md-flex">
                      <div className="me-3">
                        <FaRegFile />
                      </div>
                      <div className="p-0">
                        <p className="fw-semibold m-0">100+ Tests</p>
                        <p className="m-0">with certified labs</p>
                      </div>
                    </div>
                  </div>
                  <div className="border-end border-dark mx-3 mx-lg-4"></div>
                  <div>
                    <div className="d-md-flex">
                      <div className="me-3">
                        <FiTruck />
                      </div>
                      <div className="p-0">
                        <p className="fw-semibold m-0">
                          Free at-home sample collection
                        </p>
                        <p className="m-0">Above AED 350</p>
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
                Select our flexible price plan that save your money
              </h2>
              <p>
                Experience a variety of features aimed at improving your blood
                testing process, all at a cost that suits your budget.
              </p>
            </Col>
          </Row>

          <Row className="g-2 d-flex align-items-end">
            {pricesObj.map((price, i) => {
              return (
                <Col xs={12} md={6} lg={3}>
                  <div className={i == 2 ? "popular price_card" : "price_card"}>
                    {i == 2 && (
                      <div className="text-end">
                        <h6>Popular</h6>
                      </div>
                    )}
                    <div className="border-bottom mb-4">
                      <h5 className="fw-semibold mb-1">140 AED</h5>
                      <p className="fw-semibold text-decoration-line-through">
                        140 AED
                      </p>
                    </div>
                    <div>
                      {price.benefits.map((benefit) => {
                        return (
                          <div className="d-flex align-items-center my-2">
                            <FaRegCircleCheck className="me-2" />
                            <p className="m-0">{benefit}</p>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-5">
                      <button
                        className={
                          i == 2
                            ? "popular_button w-100"
                            : "custom-button w-100"
                        }
                      >
                        Book a Test
                      </button>
                    </div>
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
