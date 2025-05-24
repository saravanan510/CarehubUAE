import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useBookingDetails } from "../context/Context";
import { Link, redirect } from "react-router-dom";
import axios from "../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CCPaymentPage from "./CCPaymentPage";
import PaymentSuccess from "./PaymentSuccess";
import PaymentCancel from "./PaymentCancel";

const ConfirmBooking = () => {
  const { bookingDetails } = useBookingDetails();
  const [loader, setLoader] = useState(false);
  const [response, setResponse] = useState();

  const navigate = useNavigate();

  console.log("bookingDetails", bookingDetails);

  const notifySuccess = () =>
    toast.success("Appointment booked and confirmation sent!");
  const notifyError = () => toast.error("Error in Booking");

  const date = new Date(bookingDetails.date).toLocaleDateString();
  const totalPrice = (tests) => {
    let total = 0;
    tests.forEach((test) => {
      total = total + test.price;
    });
    return total;
  };

  const handleBloodTestBooking = async () => {
    setLoader(true);
    try {
      let reqBdy = {
        fullName:
          bookingDetails.userInfo.firstName + bookingDetails.userInfo.lastName,
        email: bookingDetails.userInfo.email,
        phoneNumber: bookingDetails.userInfo.phone,
        date: new Date(bookingDetails.date).toISOString().split("T")[0],
        time: bookingDetails.time,
        tests: bookingDetails.tests,
        redirect: "http://localhost:5173/PaymentSuccess",
        cancel: "http://localhost:5173/PaymentCancel",
        billing_email: "Insurance@carehubuae.com",
      };
      const bloodTestResponse = await axios.post(
        "api/payment/initiate-payment", // Ensure this URL is correct
        reqBdy,
        {
          headers: {
            "Content-Type": "application/json", // Ensure the content type is application/json
          },
        }
      );
      if (bloodTestResponse) {
        setResponse(bloodTestResponse.data);
        // notifySuccess();
        setLoader(false);
        // navigate("/bookbloodtest");
      }
    } catch (error) {
      setLoader(false);
      notifyError();
    }
  };

  return (
    <>
      <section>
        <Container>
          <h5 style={{ marginBottom: "20px" }}>Booking Confirmation</h5>
          <Row
            style={{
              border: "1px solid rgb(238, 238, 238)",
              padding: "16px 12px",
            }}
          >
            <h6
              style={{
                fontSize: "15px",
                fontWeight: 600,
                marginBottom: "12px",
              }}
            >
              Patient Info
            </h6>
            <Col>
              <div>
                <p style={{ fontSize: "14px", fontWeight: 500, margin: "0px" }}>
                  Name
                </p>
                <span style={{ fontSize: "16px", fontWeight: 600 }}>
                  {bookingDetails?.userInfo?.firstName}{" "}
                  {bookingDetails?.userInfo?.lastName}
                </span>
              </div>
            </Col>
            <Col>
              <div>
                <p style={{ fontSize: "14px", fontWeight: 500, margin: "0px" }}>
                  Mobile Number
                </p>
                <span style={{ fontSize: "16px", fontWeight: 600 }}>
                  {bookingDetails?.userInfo?.phone}{" "}
                </span>
              </div>
            </Col>
            <Col>
              <div>
                <p style={{ fontSize: "14px", fontWeight: 500, margin: "0px" }}>
                  Comments
                </p>
                <span style={{ fontSize: "16px", fontWeight: 600 }}>
                  {bookingDetails?.userInfo?.comment}
                </span>
              </div>
            </Col>
          </Row>
          <Row
            style={{
              border: "1px solid rgb(238, 238, 238)",
              padding: "16px 12px",
              marginTop: "12px",
            }}
          >
            <h6
              style={{
                fontSize: "15px",
                fontWeight: 600,
                marginBottom: "12px",
              }}
            >
              Booking Info
            </h6>
            <Col>
              <div>
                <p style={{ fontSize: "14px", fontWeight: 500, margin: "0px" }}>
                  services
                </p>

                <ul style={{ margin: "0px" }}>
                  {bookingDetails?.tests?.map((test, index) => {
                    return (
                      <li
                        key={index}
                        style={{ fontSize: "16px", fontWeight: 600 }}
                      >
                        {test.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Col>
            <Col>
              <div>
                <p style={{ fontSize: "14px", fontWeight: 500, margin: "0px" }}>
                  Date & Time
                </p>
                <span style={{ fontSize: "16px", fontWeight: 600 }}>
                  {date} {bookingDetails?.time}
                </span>
              </div>
            </Col>
            <Col>
              <div>
                <p style={{ fontSize: "14px", fontWeight: 500, margin: "0px" }}>
                  Price
                </p>
                <span style={{ fontSize: "16px", fontWeight: 600 }}>
                  {totalPrice(bookingDetails.tests)}
                </span>
              </div>
            </Col>
          </Row>
          <div style={{ marginTop: "16px" }}>
            {/* <button className="custom-button me-2">
              <Link to={"/payment"}>Confirm Booking</Link>
            </button> */}
            <button
              className="custom-button me-2"
              onClick={handleBloodTestBooking}
            >
              {loader ? "Confirm Booking..." : "Confirm Booking"}
            </button>
            <button className="custom-button-secondary">
              <Link to={"/bookbloodtest"}>Cancel</Link>
            </button>
          </div>
          <div>
            <ToastContainer position="bottom-left" />
          </div>
          {response && <CCPaymentPage response={response} />}
        </Container>
      </section>
    </>
  );
};
export default ConfirmBooking;
