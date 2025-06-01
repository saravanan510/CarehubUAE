const express = require("express");
const router = express.Router();
const bloodTestCtrl = require("../app/controllers/bloodTestCtrl");
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

router.get("/", bloodTestCtrl.show);
router.post("/uploadFile", upload.single("file"), bloodTestCtrl.uploadFile);
router.get("/:id", bloodTestCtrl.find);
router.post("/:id", bloodTestCtrl.update);

module.exports = router;
