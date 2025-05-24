import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useBookingDetails } from "../context/Context";
import { MdDateRange } from "react-icons/md";
const SelectDateTime = () => {
  const [date, setDate] = useState(new Date());
  const currentDate = new Date().toISOString().split("T")[0];
  const [time, setTime] = useState("");
  const { bookingDetails, handleDetails } = useBookingDetails();

  const timings = {
    morning: ["10:00 Am", "10:30 Am", "11:00 Am", "11:30 Am"],
    afternoon: ["01:00 Pm", "01:30 Pm", "02:00 Pm", "02:30 Pm"],
    evening: ["06:00 Pm", "06:30 Pm", "07:00 Pm", "07:30 Pm"],
  };

  const handleBookAppointment = () => {
    const update = { ...bookingDetails };
    (update.time = time), (update.date = date);
    handleDetails(update);
  };

  return (
    <>
      <section>
        <Container>
          <Row>
            <h5 className="fs-5 fw-semibold">Select Date and Time</h5>
            <div className="">
              <div className="mb-3">
                <p className="mb-2 fw-semibold">Choose Date</p>
                <DatePicker
                  // showIcon
                  // className="date_picker"
                  minDate={currentDate}
                  selected={date}
                  onChange={(e) => {
                    setDate(e);
                  }}
                  // icon={<MdDateRange className="fs-5 custom-icon-spacing" />}
                  customInput={
                    <div className="custom-datepicker">
                      <MdDateRange className="fs-4" />
                      <input type="text" value={date.toLocaleDateString()} />
                    </div>
                  }
                />
              </div>
              <div>
                <p className="mb-2 fw-semibold">Choose Time</p>
                <div className="mb-2">
                  <p className="mb-2 me-4">Morning</p>
                  {timings.morning.map((el, index) => {
                    return (
                      <button
                        className={`${
                          time === el
                            ? "custom-timepicker-selected"
                            : "custom-timepicker"
                        }`}
                        onClick={() => setTime(el)}
                      >
                        {el}
                      </button>
                    );
                  })}
                </div>
                <div className="mb-2">
                  <p className="mb-2 me-4">Afternoon</p>
                  {timings.afternoon.map((el, index) => {
                    return (
                      <button
                        className={`${
                          time === el
                            ? "custom-timepicker-selected"
                            : "custom-timepicker"
                        }`}
                        onClick={() => setTime(el)}
                      >
                        {el}
                      </button>
                    );
                  })}
                </div>
                <div className="mb-2">
                  <p className="mb-2 me-4">Evening</p>
                  {timings.evening.map((el, index) => {
                    return (
                      <button
                        className={`${
                          time === el
                            ? "custom-timepicker-selected"
                            : "custom-timepicker"
                        }`}
                        onClick={() => setTime(el)}
                      >
                        {el}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div style={{ marginTop: "20px" }}>
              <button
                className="custom-button me-2"
                onClick={handleBookAppointment}
              >
                <Link to={"/patientdetails"}>Book Appointment</Link>
              </button>
              <button className="custom-button-secondary">
                <Link to={"/bookbloodtest"}>Cancel</Link>
              </button>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
};
export default SelectDateTime;
