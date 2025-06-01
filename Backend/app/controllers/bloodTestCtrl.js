const BloodTests = require("../models/bloodTest-model");
const bloodTestCtrl = {};

bloodTestCtrl.show = async (req, res) => {
  try {
    const bloodtests = await BloodTests.find();
    res.json(bloodtests);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

bloodTestCtrl.find = async (req, res) => {
  const orderId = req.params.id;
  try {
    const test = await BloodTests.findOne({ orderId: orderId });
    res.json(test);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

bloodTestCtrl.create = async (req, res) => {
  const data = req.body;
  data.status = "Pending";

  try {
    const bloodtest = BloodTests.create(data);
    if (bloodtest) {
      res
        .status(200)
        .json({ message: "Appointment booked and confirmation sent!" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error booking appointment. Please try again later." });
  }
};

bloodTestCtrl.update = async (req, res) => {
  const orderId = req.params.id;
  const body = req.body;
  try {
    const test = await BloodTests.findOneAndUpdate({ orderId: orderId }, body, {
      new: true,
    });
    res.json(test);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

bloodTestCtrl.uploadFile = async (req, res) => {
  try {
    const test = JSON.parse(req.body.test);
    const file = req.file;

    if (!test.orderId) {
      return res.status(400).json({ message: "Missing orderId in test data" });
    }
    const update = {
      $push: {
        files: file.filename, // or store as an object with metadata if needed
      },
    };
    const updateTest = await BloodTests.findOneAndUpdate(
      { orderId: test.orderId },
      update,
      { new: true }
    );

    res.status(200).json(updateTest);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = bloodTestCtrl;
