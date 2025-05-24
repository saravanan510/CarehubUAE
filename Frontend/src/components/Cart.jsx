import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import testData from "../utils/testData";
import { Link } from "react-router-dom";
import { useBookingDetails } from "../context/Context";
const Cart = ({ selectedTest }) => {
  const { bookingDetails, handleDetails } = useBookingDetails();

  const cartTest = testData.filter((data) => selectedTest.includes(data.id));
  useEffect(() => {
    handleDetails({ ...bookingDetails, tests: cartTest });
  }, [selectedTest]);

  const matched = selectedTest.map((testId) => {
    const matchedTest = testData.find((test) => {
      return test.id === Number(testId);
    });
    return [matchedTest.price, matchedTest.biomakers];
  });

  const totalPrice = matched.reduce((acc, cv) => {
    return (acc = acc + cv[0]);
  }, 0);
  const totalTest = matched.reduce((acc, cv) => {
    return (acc = acc + cv[1]);
  }, 0);

  return (
    <div className="fixed-bottom">
      <div className="cart_top">
        <p style={{ fontSize: "16px" }}>
          Add <span className="fw-semibold">AED 250</span> more to get free
          collection
        </p>
      </div>
      <div className="cart_bottom" style={{ padding: "12px" }}>
        <div>
          <p>
            <span style={{ fontWeight: "bold" }}>Add AED {totalPrice}</span>({" "}
            {totalTest}
            Tests )
          </p>
          <p style={{ fontSize: "15px" }}>Get report in 3 days</p>
        </div>
        <div>
          <button type="button" className="cart_button">
            <Link to={"/selectdate&time"}>Book a Test </Link>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Cart;
