"use client";

import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useForm } from "react-hook-form";
import { useBookingDetails } from "../context/Context";
import { useRouter } from "next/navigation";

const PatientDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { bookingDetails, handleDetails } = useBookingDetails();
  const router = useRouter();

  const onSubmit = (data: any) => {
    const details = { ...bookingDetails };
    handleDetails({ ...details, userInfo: data });
    router.push("/confirm");
  };

  return (
    <section>
      <Container>
        <Row>
          <div>
            <h4>Patient Detail Form</h4>
            <form
              onSubmit={handleSubmit(onSubmit, (errors) =>
                console.log("errors", errors)
              )}
            >
              <div style={{ display: "flex", flexWrap: "wrap", gap: "48px" }}>
                <div>
                  <div style={{ width: "300px" }}>
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      id="firstName"
                      className="custom-input"
                      {...register("firstName", {
                        required: true,
                      })}
                    />
                    {errors.firstName && (
                      <span style={{ color: "red", fontSize: "14px" }}>
                        This field is required
                      </span>
                    )}
                  </div>
                  <div style={{ width: "300px" }}>
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      id="lastName"
                      className="custom-input"
                      {...register("lastName", { required: true })}
                    />
                    {errors.lastName && (
                      <span style={{ color: "red", fontSize: "14px" }}>
                        This field is required
                      </span>
                    )}
                  </div>
                  <div style={{ width: "300px" }}>
                    <label htmlFor="email">Email *</label>
                    <input
                      id="email"
                      className="custom-input"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <span style={{ color: "red", fontSize: "14px" }}>
                        This field is required
                      </span>
                    )}
                  </div>
                  <div style={{ width: "300px" }}>
                    <label htmlFor="phone">Phone *</label>
                    <input
                      id="phone"
                      className="custom-input"
                      type="text"
                      inputMode="numeric"
                      pattern="\d*"
                      {...register("phone", {
                        required: true,
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Only numbers are allowed",
                        },
                        maxLength: {
                          value: 15,
                          message: "Phone number cannot exceed 15 digits",
                        },
                        minLength: {
                          value: 10,
                          message: "Phone number cannot be less than 10 digits",
                        },
                      })}
                    />
                    {errors.phone && (
                      <span style={{ color: "red", fontSize: "14px" }}>
                        {errors.phone.message as string || "This field is required"}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <div style={{ width: "300px" }}>
                    <label htmlFor="doorNo">Door No*</label>
                    <input
                      id="doorNo"
                      className="custom-input"
                      {...register("doorNo", {
                        required: true,
                      })}
                    />
                    {errors.doorNo && (
                      <span style={{ color: "red", fontSize: "14px" }}>
                        This field is required
                      </span>
                    )}
                  </div>
                  <div style={{ width: "300px" }}>
                    <label htmlFor="buildingName">Building Name *</label>
                    <input
                      id="buildingName"
                      className="custom-input"
                      {...register("buildingName", { required: true })}
                    />
                    {errors.buildingName && (
                      <span style={{ color: "red", fontSize: "14px" }}>
                        This field is required
                      </span>
                    )}
                  </div>
                  <div style={{ width: "300px" }}>
                    <label htmlFor="landMark">Land Mark*</label>
                    <input
                      id="landMark"
                      className="custom-input"
                      {...register("landMark", { required: true })}
                    />
                    {errors.landMark && (
                      <span style={{ color: "red", fontSize: "14px" }}>
                        This field is required
                      </span>
                    )}
                  </div>
                  <div style={{ width: "300px" }}>
                    <label htmlFor="city">City*</label>
                    <input
                      id="city"
                      className="custom-input"
                      {...register("city", { required: true })}
                    />
                    {errors.city && (
                      <span style={{ color: "red", fontSize: "14px" }}>
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <input
                className="custom-button mt-2"
                type="submit"
                value="Book Appointment"
                style={{ width: "300px" }}
              />
            </form>
          </div>
        </Row>
      </Container>
    </section>
  );
};

export default PatientDetails;
