// client/src/pages/PaymentStatus.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useBookingDetails } from "../context/Context";

const PaymentStatus = () => {
  const location = useLocation(); // Hook to access URL query parameters
  const [status, setStatus] = useState("");
  const [orderId, setOrderId] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [reason, setReason] = useState("");
  const { handleRest } = useBookingDetails;

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setStatus(queryParams.get("status")); // 'success', 'failed', or 'error'
    setOrderId(queryParams.get("orderId"));
    setTransactionId(queryParams.get("trackingId"));
    setReason(queryParams.get("message")); // Reason for failure or error message
    handleRest();
  }, [location.search]); // Re-run effect if URL query parameters change

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      {status === "success" ? (
        <div style={{ color: "green" }}>
          <h1>Payment Successful! 🎉</h1>
          <p>Thank you for your purchase.</p>
          <p>
            <strong>Order ID:</strong> {orderId}
          </p>
          <p>
            <strong>Transaction ID:</strong> {transactionId}
          </p>
        </div>
      ) : status === "failed" ? (
        <div style={{ color: "red" }}>
          <h1>Payment Failed! 😔</h1>
          <p>There was an issue processing your payment.</p>
          <p>
            <strong>Order ID:</strong> {orderId}
          </p>
          <p>
            <strong>Reason:</strong>{" "}
            {reason || "Please try again or contact support."}
          </p>
        </div>
      ) : status === "error" ? (
        <div style={{ color: "orange" }}>
          <h1>Payment Processing Error! ⚠️</h1>
          <p>An unexpected error occurred while processing your payment.</p>
          <p>
            <strong>Message:</strong> {reason || "Please try again later."}
          </p>
        </div>
      ) : (
        <div>
          <h1>Processing Payment...</h1>
          <p>Please wait while we confirm your transaction.</p>
        </div>
      )}
      <br />
      <button
        className="custom-button"
        onClick={() => (window.location.href = "/")}
      >
        Go to Home
      </button>
    </div>
  );
};

export default PaymentStatus;
