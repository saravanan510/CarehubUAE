const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const paymentRoutes = require("./routes/payment-routes");
const mailRoutes = require("./routes/mail-routes");
const servicesRoutes = require("./routes/services-routes");
const bloodTestRoutes = require("./routes/bloodTest-routes");
const userRoutes = require("./routes/user-routes");

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/send-email", mailRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/book-bloodTest", bloodTestRoutes);

app.use(express.static(path.join(__dirname, "carehub/build")));

// Start server
app.listen(port, () => {
  console.log(`✅ Server running successfully on port ${port}`);
});
