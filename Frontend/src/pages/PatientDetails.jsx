import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useForm } from "react-hook-form";
import { useBookingDetails } from "../context/Context";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "../components/ScrollTop";
const PatientDetails = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { bookingDetails, handleDetails } = useBookingDetails();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const details = { ...bookingDetails };
    handleDetails({ ...details, userInfo: data });
    navigate("/confirm");
  };

  return (
    <>
      <ScrollToTop />
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
                      {errors.email && (
                        <span style={{ color: "red", fontSize: "14px" }}>
                          This field is required
                        </span>
                      )}
                    </div>
                    <div style={{ width: "300px" }}>
                      <label htmlFor="phone">Phone *</label>
                      <input
                        className="custom-input"
                        type="text" // Use text instead of number to control input better
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
                            message: "Phone number cannot less than 10 digits",
                          },
                        })}
                      />
                      {errors.phone && (
                        <span style={{ color: "red", fontSize: "14px" }}>
                          {errors.phone.message || "This field is required"}
                        </span>
                      )}
                    </div>

                    {/* <div style={{ width: "300px" }}>
                      <label htmlFor="" style={{ display: "block" }}>
                        Comment
                      </label>
                      <textarea
                        className="custom-input"
                        style={{ width: "300px", height: "100px" }}
                        {...register("comment", { maxLength: 120 })}
                      />
                    </div> */}
                  </div>
                  <div>
                    <div style={{ width: "300px" }}>
                      <label htmlFor="">Door No*</label>
                      <input
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
                      <label htmlFor="">Building Name *</label>
                      <input
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
                      <label htmlFor="">Land Mark*</label>
                      <input
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
                      <label htmlFor="">City*</label>
                      <input
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
