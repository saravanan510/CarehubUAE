// routes/payment.js
const express = require("express");
const router = express.Router();
const paymentCtrl = require("../app/controllers/paymentCtrl");

router.post("/initiate", paymentCtrl.initiatePayment);
router.post("/success", paymentCtrl.paymentResponse);
router.post("/cancel", paymentCtrl.paymentResponse);

module.exports = router;
