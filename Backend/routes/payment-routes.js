const express = require("express");
const router = express.Router();
const paymentCtrl = require("../app/controllers/paymentCtrl");

router.post("/initiate", paymentCtrl.initiatePayment);
router.all("/success", paymentCtrl.paymentResponse);
router.all("/cancel", paymentCtrl.paymentResponse);

module.exports = router;
