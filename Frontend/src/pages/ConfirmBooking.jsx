import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useBookingDetails } from "../context/Context";
import { Link } from "react-router-dom";
import axios from "../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ConfirmBooking = () => {
  const { bookingDetails } = useBookingDetails();
  console.log("bookingDetails", bookingDetails);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const orderId = `ORD-${Date.now()}`;

  const notifySuccess = () =>
    toast.success("Redirecting to payment gateway...");
  const notifyError = (msg) => toast.error(msg || "Error in booking");

  const date = new Date(bookingDetails.date).toLocaleDateString();

  const totalPrice = (tests) =>
    tests.reduce((total, test) => total + test.price, 0).toFixed(2);

  const handleBloodTestBooking = async () => {
    setLoader(true);

    const reqBody = {
      order_id: orderId,
      currency: "AED",
      amount: totalPrice(bookingDetails.tests),
      redirect_url: `http://localhost:5000/api/payment/response`,
      cancel_url: `http://localhost:5000/api/payment/response`,
      language: "EN",
      billing_name: "Carehub healthcare LLC",
      billing_address: "M4 Gold Building",
      billing_city: "'Al Karama",
      billing_state: "Dubai",
      billing_country: "United Arab Emirates",
      billing_tel: "971559339234",
      billing_email: "insurance@carehubuae.com",
      username: `${bookingDetails.userInfo.firstName} ${bookingDetails.userInfo.lastName}`,
      email: bookingDetails.userInfo.email,
      phoneNumber: bookingDetails.userInfo.phone,
      date: new Date(bookingDetails.date).toISOString().split("T")[0],
      time: bookingDetails.time,
      tests: bookingDetails.tests,
    };

    try {
      const paymentInitiateResponse = await axios.post(
        "/api/payment/initiate",
        reqBody,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (paymentInitiateResponse?.data?.success) {
        const { ccaUrl, merchantId, accessCode, encRequest } =
          paymentInitiateResponse?.data;

        if (!ccaUrl || !merchantId || !accessCode || !encRequest) {
          throw new Error(
            "Backend did not provide all required CCAvenue parameters."
          );
        }

        const form = document.createElement("form");
        form.method = "POST";
        form.action = ccaUrl;

        const params = {
          merchant_id: merchantId,
          access_code: accessCode,
          encRequest: encRequest,
        };

        for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = params[key];
            form.appendChild(input);
          }
        }

        document.body.appendChild(form);
        form.submit();
      }
    } catch (error) {
      setLoader(false);
      notifyError("Payment service unavailable. Please try again later.");
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
              <p style={{ fontSize: "14px", fontWeight: 500 }}>Name</p>
              <span style={{ fontSize: "16px", fontWeight: 600 }}>
                {`${bookingDetails?.userInfo?.firstName} ${bookingDetails?.userInfo?.lastName}`}
              </span>
            </Col>
            <Col>
              <p style={{ fontSize: "14px", fontWeight: 500 }}>Mobile Number</p>
              <span style={{ fontSize: "16px", fontWeight: 600 }}>
                {bookingDetails?.userInfo?.phone}
              </span>
            </Col>
            <Col>
              <p style={{ fontSize: "14px", fontWeight: 500 }}>Comments</p>
              <span style={{ fontSize: "16px", fontWeight: 600 }}>
                {bookingDetails?.userInfo?.comment || "N/A"}
              </span>
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
              <p style={{ fontSize: "14px", fontWeight: 500 }}>Services</p>
              <ul style={{ margin: 0 }}>
                {bookingDetails?.tests?.map((test, idx) => (
                  <li key={idx} style={{ fontSize: "16px", fontWeight: 600 }}>
                    {test.name}
                  </li>
                ))}
              </ul>
            </Col>
            <Col>
              <p style={{ fontSize: "14px", fontWeight: 500 }}>Date & Time</p>
              <span style={{ fontSize: "16px", fontWeight: 600 }}>
                {`${date} ${bookingDetails?.time}`}
              </span>
            </Col>
            <Col>
              <p style={{ fontSize: "14px", fontWeight: 500 }}>Price</p>
              <span style={{ fontSize: "16px", fontWeight: 600 }}>
                {totalPrice(bookingDetails.tests)} AED
              </span>
            </Col>
          </Row>

          <div style={{ marginTop: "16px" }}>
            <button
              className="custom-button me-2"
              onClick={handleBloodTestBooking}
              disabled={loader}
            >
              {loader ? "Processing..." : "Confirm Booking"}
            </button>
            <button className="custom-button-secondary">
              <Link to="/bookbloodtest">Cancel</Link>
            </button>
          </div>

          <ToastContainer position="bottom-left" />
        </Container>
      </section>
    </>
  );
};

export default ConfirmBooking;
