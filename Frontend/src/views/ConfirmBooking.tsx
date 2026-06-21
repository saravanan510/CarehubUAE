"use client";

import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useBookingDetails } from "../context/Context";
import Link from "next/link";
import api from "@/lib/axios";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ConfirmBooking = () => {
  const { bookingDetails, handleRest } = useBookingDetails();
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!bookingDetails || bookingDetails.date === "") {
      router.push("/book-blood-test");
    }
  }, [bookingDetails, router]);

  const orderId = `ORD-${Date.now()}`;

  const notifyError = (msg: string) => toast.error(msg || "Error in booking");

  const date = bookingDetails?.date
    ? new Date(bookingDetails.date).toLocaleDateString()
    : "";

  const totalPrice = (tests: any[]) => {
    if (!tests) return "0.00";
    return tests.reduce((total, test) => total + (test.price || 0), 0).toFixed(2);
  };

  const handleBloodTestBooking = async () => {
    if (!bookingDetails || !bookingDetails.tests) return;

    const amount = totalPrice(bookingDetails.tests);
    const reqBody = {
      order_id: orderId,
      currency: "AED",
      amount: amount,
      redirect_url: `https://api.carehubuae.com/api/payment/response`,
      cancel_url: `https://api.carehubuae.com/api/payment/response`,
      language: "EN",
      billing_name: "Carehub healthcare LLC",
      billing_address: "M4 Gold Building",
      billing_city: "Al Karama",
      billing_state: "Dubai",
      billing_country: "United Arab Emirates",
      billing_tel: "971559339234",
      billing_email: "insurance@carehubuae.com",
      username: `${bookingDetails.userInfo?.firstName || ""} ${bookingDetails.userInfo?.lastName || ""}`,
      email: bookingDetails.userInfo?.email || "",
      phoneNumber: bookingDetails.userInfo?.phone || "",
      doorNo: bookingDetails.userInfo?.doorNo || "",
      building: bookingDetails.userInfo?.buildingName || "",
      landmark: bookingDetails.userInfo?.landMark || "",
      city: bookingDetails.userInfo?.city || "",
      date: bookingDetails.date ? new Date(bookingDetails.date).toISOString().split("T")[0] : "",
      time: bookingDetails.time || "",
      tests: bookingDetails.tests,
    };

    if (parseFloat(amount) >= 300) {
      setError("");
      setLoader(true);
      try {
        const paymentInitiateResponse = await api.post(
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
              input.value = params[key as keyof typeof params];
              form.appendChild(input);
            }
          }

          document.body.appendChild(form);
          form.submit();
          handleRest();
        }
      } catch (error) {
        setLoader(false);
        notifyError("Payment service unavailable. Please try again later.");
      }
    } else {
      setError(
        "Minimum booking amount is 300. Please add more items to proceed."
      );
      setLoader(false);
    }
  };

  return (
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
              {`${bookingDetails?.userInfo?.firstName || ""} ${bookingDetails?.userInfo?.lastName || ""}`}
            </span>
          </Col>
          <Col>
            <p style={{ fontSize: "14px", fontWeight: 500 }}>Mobile Number</p>
            <span style={{ fontSize: "16px", fontWeight: 600 }}>
              {bookingDetails?.userInfo?.phone || ""}
            </span>
          </Col>
          <Col>
            <p style={{ fontSize: "14px", fontWeight: 500 }}>City</p>
            <span style={{ fontSize: "16px", fontWeight: 600 }}>
              {bookingDetails?.userInfo?.city || "N/A"}
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
              {bookingDetails?.tests?.map((test: any, idx: number) => (
                <li key={idx} style={{ fontSize: "16px", fontWeight: 600 }}>
                  {test.name}
                </li>
              ))}
            </ul>
          </Col>
          <Col>
            <p style={{ fontSize: "14px", fontWeight: 500 }}>Date & Time</p>
            <span style={{ fontSize: "16px", fontWeight: 600 }}>
              {`${date} ${bookingDetails?.time || ""}`}
            </span>
          </Col>
          <Col>
            <p style={{ fontSize: "14px", fontWeight: 500 }}>Price</p>
            <span style={{ fontSize: "16px", fontWeight: 600 }}>
              {totalPrice(bookingDetails?.tests || [])} AED
            </span>
          </Col>
        </Row>
        {error && (
          <div
            style={{
              padding: "8px",
              background: "#f8d7da",
              marginTop: "16px",
              borderRadius: "4px",
            }}
          >
            <p style={{ margin: "0px", fontWeight: "500", color: "#721c24" }}>{error}</p>
          </div>
        )}

        <div style={{ marginTop: "16px" }}>
          {error ? (
            <button className="custom-button-secondary">
              <Link href="/book-blood-test">Back</Link>
            </button>
          ) : (
            <div>
              <button
                className="custom-button me-2"
                onClick={handleBloodTestBooking}
                disabled={loader}
              >
                {loader ? "Processing..." : "Confirm Booking"}
              </button>
              <button className="custom-button-secondary">
                <Link href="/book-blood-test">Back</Link>
              </button>
            </div>
          )}
        </div>

        <ToastContainer position="bottom-left" />
      </Container>
    </section>
  );
};

export default ConfirmBooking;
