const querystring = require("querystring");
const { encrypt, decrypt } = require("../../utils/ccavenue");
const BloodTests = require("../models/bloodTest-model");
const nodemailer = require("nodemailer");

// Environment variables
const MERCHANT_ID = process.env.CCA_MERCHANT_ID;
const WORKING_KEY = process.env.CCA_WORKING_KEY;
const ACCESS_CODE = process.env.CCA_ACCESS_CODE;
const FRONTEND_URL = process.env.YOUR_REACT_APP_URL;

// Configure nodemailer (ensure transporter is defined)
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "Insurance@carehubuae.com", // Sender's email
    pass: "beec hqme sgwy wzvf", // Sender's email password
  },
});

const paymentCtrl = {};
let testsData = {}; // Avoid using global mutable state like this if possible

// Initiate Payment
paymentCtrl.initiatePayment = async (req, res) => {
  testsData = req.body;

  try {
    const protocol = req.protocol || "https";
    const host = req.get("host");

    const redirectUrl = `${protocol}://${host}/api/payment/success`;
    const cancelUrl = `${protocol}://${host}/api/payment/cancel`;

    const paymentPayload = {
      ...req.body,
      merchant_id: MERCHANT_ID,
      redirect_url: redirectUrl,
      cancel_url: cancelUrl,
    };

    const plainText = querystring.stringify(paymentPayload);
    const encRequest = encrypt(plainText, WORKING_KEY);

    res.json({
      success: true,
      ccaUrl:
        "https://secure.ccavenue.ae/transaction/transaction.do?command=initiateTransaction",
      merchantId: MERCHANT_ID,
      accessCode: ACCESS_CODE,
      encRequest,
    });
  } catch (error) {
    console.error("Error initiating payment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to initiate payment.",
      error: error.message,
    });
  }
};

// Handle CCAvenue Response
paymentCtrl.paymentResponse = async (req, res) => {
  const encResponse = req.body.encResp;

  if (!encResponse) {
    console.error("Missing encResp in payment response.");
    return res.redirect(
      `${FRONTEND_URL}/paymentStatus?status=error&message=NoResponse`
    );
  }

  const decryptedResponse = decrypt(encResponse, WORKING_KEY);
  if (!decryptedResponse) {
    console.error("Failed to decrypt CCAvenue response.");
    return res.redirect(
      `${FRONTEND_URL}/paymentStatus?status=error&message=DecryptionFailed`
    );
  }

  const responseParams = querystring.parse(decryptedResponse);
  const {
    order_id,
    tracking_id,
    bank_ref_no,
    order_status,
    failure_message,
    amount,
    currency,
  } = responseParams;

  // Prepare email content
  const formattedTests = (testsData.tests || [])
    .map((test) => `- ${test.name} (ID: ${test.id}): AED ${test.price}`)
    .join("\n");

  const adminMailOptions = {
    from: testsData.email,
    to: "Insurance@carehubuae.com",
    subject: `New BloodTest Booking: ${testsData.username} - ${new Date(
      testsData.date
    ).toLocaleDateString()}`,
    text:
      `A new booking has been made by ${testsData.username} (${testsData.email}, ${testsData.phoneNumber}).\n\n` +
      `Booking Details:\n${formattedTests}\n\n` +
      `Date: ${new Date(testsData.date).toLocaleString()}\n` +
      `Total Amount Paid: AED ${amount}\n\nPlease review the booking and take the necessary action.\n\n` +
      `Best regards,\nYour Booking System`,
  };

  const customerMailOptions = {
    from: "Insurance@carehubuae.com",
    to: testsData.email,
    subject: "Appointment Confirmation",
    text:
      `Hello ${testsData.username},\n\nThank you for booking an appointment with us. Here are the details:\n\n` +
      `Appointment Date: ${testsData.date}\n\nWe look forward to seeing you soon!\n\nRegards,\nCarehub`,
  };

  try {
    const bookingData = {
      orderId: order_id,
      fullName: testsData.username,
      email: testsData.email,
      phoneNumber: testsData.phoneNumber,
      date: testsData.date,
      time: testsData.time,
      status: "Pending",
      tests: testsData.tests,
      amount: amount,
    };

    const newBooking = await BloodTests.create(bookingData);
    if (newBooking) {
      await transporter.sendMail(adminMailOptions);
      await transporter.sendMail(customerMailOptions);
    }
  } catch (err) {
    console.error("Database error:", err);
    return res.redirect(
      `${FRONTEND_URL}/paymentStatus?status=db_error&orderId=${
        order_id || "N/A"
      }`
    );
  }

  // Determine frontend status and message
  let frontendStatus = "unknown";
  let frontendMessage = `Payment status: ${order_status}. Contact support if needed.`;

  switch (order_status) {
    case "Success":
      frontendStatus = "success";
      frontendMessage = "Payment successful!";
      break;
    case "Aborted":
      frontendStatus = "cancelled";
      frontendMessage = "Payment cancelled by user.";
      break;
    case "Failure":
      frontendStatus = "failed";
      frontendMessage = `Payment failed. Reason: ${
        failure_message || "Unknown"
      }.`;
      break;
    case "Invalid Request":
      frontendStatus = "invalid";
      frontendMessage = "Invalid payment request. Please try again.";
      break;
  }

  const query = new URLSearchParams({
    status: frontendStatus,
    orderId: order_id || "N/A",
    trackingId: tracking_id || "",
    message: encodeURIComponent(frontendMessage),
  });

  res.redirect(`${FRONTEND_URL}/paymentStatus?${query.toString()}`);
};

module.exports = paymentCtrl;
