"use client";

import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Link from "next/link";
import emailjs from "@emailjs/browser";

const servicesList = [
  "Home Nursing",
  "24 Hours In-Home Care",
  "Ventilator Care",
  "Post Hospitalization",
  "Nurses Visit",
  "Palliative care",
  "Elderly Care Services",
  "Post Operative Care",
  "Pediatric Palliative care",
  "Paralytic Care",
];

const ContactUs = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    date: "",
    service: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_yzucl05",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_dnyf6kf",
        form,
        {
          publicKey:
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "p2r2WDDUQTKXgYPZD",
        },
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("Message sent successfully!");
        },
        (err) => {
          console.log("FAILED...", err);
          alert("Failed to send message. Please try again.");
        },
      );
  };

  return (
    <>
      <div className="servicepage_banner">
        <Container>
          <h2 className="fs-1 fw-semibold text-white">Contact Us</h2>
          <ul className="breadcrumb">
            <li>
              <Link href="/">Home </Link>
            </li>
            <li>contact us</li>
          </ul>
        </Container>
      </div>

      <section>
        <Container>
          <div className="contact_form">
            <h1>Contact us</h1>
            <form onSubmit={handleSubmit}>
              <label>Full Name</label>
              <br />
              <input
                type="text"
                name="fullName"
                placeholder="Enter your name"
                value={form.fullName}
                onChange={handleChange}
                className="border mb-2"
                required
              />
              <br />
              <label>Email</label>
              <br />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className="border mb-2"
                required
              />
              <br />
              <label>Phone Number</label>
              <br />
              <input
                type="text"
                name="phoneNumber"
                placeholder="Enter your phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                className="border mb-2"
                required
              />
              <br />
              <label>Appointment Date</label>
              <br />
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="border mb-2"
                required
              />
              <br />
              <label>Choose Service</label>
              <br />
              <select
                value={form.service}
                name="service"
                onChange={handleChange}
                className="servicedrop border mb-3"
                required
              >
                <option value="">Select category</option>
                {servicesList.map((ele, i) => {
                  return (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  );
                })}
              </select>
              <br />
              <input type="submit" className="formbtn" />
            </form>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ContactUs;
