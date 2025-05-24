import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useForm } from "react-hook-form";
import { useBookingDetails } from "../context/Context";
import { useNavigate } from "react-router-dom";
const PatientDetails = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { bookingDetails, handleDetails } = useBookingDetails();
  const navigate = useNavigate();
  console.log("bookingDetails", bookingDetails);

  const onSubmit = (data) => {
    const details = { ...bookingDetails };
    handleDetails({ ...details, userInfo: data });
    navigate("/confirm");
  };

  return (
    <>
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
                <div style={{ width: "300px" }}>
                  <label htmlFor="">First Name *</label>
                  <input
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
                  <label htmlFor="">Last Name *</label>
                  <input
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
                  <label htmlFor="">Email *</label>
                  <input
                    className="custom-input"
                    {...register("email", { required: true })}
                  />
                  {errors.lastName && (
                    <span style={{ color: "red", fontSize: "14px" }}>
                      This field is required
                    </span>
                  )}
                </div>
                <div style={{ width: "300px" }}>
                  <label htmlFor="">Phone *</label>
                  <input
                    className="custom-input"
                    type="number"
                    {...register("phone", {
                      pattern: /^[0-9]+$/,
                    })}
                  />
                  {errors.lastName && (
                    <span style={{ color: "red", fontSize: "14px" }}>
                      This field is required
                    </span>
                  )}
                </div>
                <div style={{ width: "300px" }}>
                  <label htmlFor="" style={{ display: "block" }}>
                    Comment
                  </label>
                  <textarea
                    className="custom-input"
                    style={{ width: "300px", height: "100px" }}
                    {...register("comment", { maxLength: 120 })}
                  />
                </div>

                <input
                  className="custom-button mt-2"
                  type="submit"
                  value=" Book Appointment"
                  style={{ width: "300px" }}
                />
              </form>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
};
export default PatientDetails;
