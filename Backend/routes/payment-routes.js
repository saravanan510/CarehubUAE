const express = require("express");
const router = express.Router();
const paymentCtrl = require("../app/controllers/paymentCtrl");

router.post("/initiate", paymentCtrl.initiatePayment);
router.post("/success", paymentCtrl.paymentResponse);
router.post("/cancel", paymentCtrl.paymentResponse);

router.get("/success", (req, res) => {
  res.redirect(
    `${process.env.YOUR_REACT_APP_URL}/paymentStatus?status=success`
  );
});

router.get("/cancel", (req, res) => {
  res.redirect(
    `${process.env.YOUR_REACT_APP_URL}/paymentStatus?status=cancelled`
  );
});

module.exports = router;
