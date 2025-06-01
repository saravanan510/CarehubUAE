const express = require("express");
const router = express.Router();
const serviceCtrl = require("../app/controllers/serviceCtrl");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/files");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get("/", serviceCtrl.show);
router.post("/uploadFile", upload.single("file"), serviceCtrl.uploadFile);
router.get("/:id", serviceCtrl.find);
router.post("/:id", serviceCtrl.update);

module.exports = router;
