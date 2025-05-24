import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PostStrokeRecovery from "../assets/Post_Stroke_Recovery.webp";
import BookAppointment from "./BookAppointment";
import OtherServices from "./OtherServices";

const PostStrokeRecovery_details = () => {
  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg={8}>
              <div className="service_img">
                <img src={PostStrokeRecovery} />
              </div>

              <div className="text-start pe-5" lg={8}>
                <h2 className="fs-3 fw-bold" style={{ color: "#012a4a" }}>
                  Post Stroke Recovery
                </h2>
                <p>
                  At CareHub rehabilitation experts create specialized treatment
                  plans to meet each patient’s individual needs. Advanced
                  rehabilitation helps them regain their physical, sensory,
                  intellectual and psychological functions, reduce activity
                  limitations, maximize quality of life and prevent recurrence.
                </p>
                <p>
                  At CareHub rehabilitation experts create specialized treatment
                  plans to meet each patient’s individual needs. Advanced
                  rehabilitation helps them regain their physical, sensory,
                  intellectual and psychological functions, reduce activity
                  limitations, maximize quality of life and prevent recurrence.
                </p>
                <p>
                  The first three months after a stroke are the most important
                  for recovery and when patients will see the most improvement.
                  During this time, most patients will enter and complete an
                  inpatient rehabilitation program, or make progress in their
                  outpatient therapy sessions.
                </p>
                <p>
                  The goal of rehabilitation is to restore function as close as
                  possible to prestroke levels or develop compensation
                  strategies to work around a functional impairment. An example
                  of a compensation strategy is learning to hold a toothpaste
                  tube so the strong hand can unscrew the cap.
                </p>
                <p>
                  At CareHub rehabilitation experts create specialized treatment
                  plans to meet each patient’s individual needs, specially post
                  stroke care. Advanced rehabilitation helps stroke patients
                  regain their physical, sensory, intellectual and psychological
                  functions, reduce activity limitations, maximize quality of
                  life and prevent recurrence. During this time, most patients
                  will enter and complete an inpatient rehabilitation program,
                  or make progress in their outpatient therapy sessions. In
                  addition, our specialized technology-assisted rehabilitation
                  can extend rehabilitation by targeting specific actions or
                  processes in an engaging way.
                </p>
              </div>
            </Col>
            <Col lg={4}>
              <OtherServices className="mb-4" />
              <BookAppointment currentService={"Post Stroke Recovery"} />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default PostStrokeRecovery_details;
