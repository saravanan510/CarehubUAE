import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { AnimatedOnScroll } from "react-animated-css-onscroll";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const services = [
  "Home Nursing services",
  "Post Operative Care",
  "Ventilator Care",
  "Palliative Care",
  "Elderly Care",
  "Pediatric Palliative",
  "Paralytic Care",
  "Parkinson Care",
  "Physiotherapy Services",
  "Doctor Home Visits",
  "Medical Tourism",
  "Injection Services",
  "Blood Test",
  "Hydrafacial Services",
  "Post Stroke Recovery",
];

const BookAppointment = ({ currentService }) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    date: "",
    service: "",
  });
  const [loader, setLoader] = useState(false);
  const currentDate = new Date().toISOString().split("T")[0];

  const notifySuccess = () => toast.success("Appointment Booked successfully!");
  const notifyError = () => toast.error("Error in Appointment Booking");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    setForm((prev) => {
      return { ...prev, service: currentService };
    });
  }, [currentService]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const formData = { ...form, orderId: `ORD-${Date.now()}` };

    try {
      const sendMailResponse = await axios.post(
        "api/send-email", // Ensure this URL is correct
        formData,
        {
          headers: {
            "Content-Type": "application/json", // Ensure the content type is application/json
          },
        }
      );
      console.log("Email sent successfully:", sendMailResponse.data);
      setLoader(false);
      notifySuccess();
      setForm({
        fullName: "",
        email: "",
        phoneNumber: "",
        date: "",
        service: "",
      });
    } catch (error) {
      setLoader(false);
      notifyError();
      if (error.response) {
        console.error("Error response from server:", error.response.data);
      } else if (error.request) {
        console.error("No response received from server:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }
  };

  return (
    <AnimatedOnScroll animationIn="animate__slideInUp ">
      <div className="booking text-start rounded-4 animate__animated ">
        <h3 className="fs-5 fw-bold mb-3" style={{ color: "#012a4a" }}>
          Book Appointment
        </h3>
        <form onSubmit={handleSubmit}>
          <label className="fw-semibold">Full Name</label>
          <br />
          <input
            type="text"
            name="fullName"
            placeholder="Enter your name"
            value={form.fullName}
            onChange={handleChange}
            className="border-0 mb-3 p-2"
            required
          />
          <br />
          <label className="fw-semibold">Email</label>
          <br />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            className="border-0 mb-3 p-2"
            required
          />
          <br />
          <label className="fw-semibold">Phone Number</label>
          <br />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Enter your phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            className="border-0 mb-3 p-2"
            required
          />
          <br />
          <label className="fw-semibold">Appointment Date</label>
          <br />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="border-0 mb-3 p-2"
            required
            min={currentDate}
          />
          <br />
          <label className="fw-semibold">Choose Service</label>
          <br />
          <select
            value={form.service}
            name="service"
            onChange={handleChange}
            className="servicedrop border mb-3 p-2"
            required
          >
            <option>Select category</option>
            {services.map((ele, i) => {
              return <option value={ele}>{ele}</option>;
            })}
          </select>
          <br />
          {form.service !== "Select category" && form.service !== "" && (
            <div
              style={{
                padding: "6px 8px",
                background: "rgb(249, 249, 249, 0.66)",
                fontSize: "14px",
                fontWeight: "500",
                borderRadius: "4px",
                // color: "#009b45",
              }}
            >
              Free Booking
            </div>
          )}

          <input
            type="submit"
            className="formbtn fw-semibold"
            value={loader ? "Booking..." : "Book Appointment"}
          />
        </form>
      </div>
      <div>
        <ToastContainer position="bottom-left" />
      </div>
    </AnimatedOnScroll>
  );
};

export default BookAppointment;
