import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FeatureIcon from "../assets/features.svg";
import DoctorHomeVisit from "../assets/Doctor_Home_Visit.webp";
import BookAppointment from "./BookAppointment";
import OtherServices from "./OtherServices";

const DoctorHomeVisit_details = () => {
  return (
    <section>
      <Container>
        <Row className="g-4">
          <Col lg={8}>
            <div className="service_img">
              <img src={DoctorHomeVisit} />
            </div>

            <div className="text-start pe-5" lg={8}>
              <h2 className="fs-3 fw-bold" style={{ color: "#012a4a" }}>
                Doctor Home Visits
              </h2>
              <p>
                Having access to a doctor at the comfort of your home was a
                privilege few could enjoy until now. Carehub Doctor Home Visit
                service eliminates the disruptions to normal life due to
                frequent trips for tests and reviews. With our Doctor Home
                visits, you can now have doctors and physicians conduct a
                detailed assessment and provide expert guidance in treating
                individual needs at your residence.
              </p>
              <p>
                Based on the patient’s condition, our doctors create a detail
                care plan for recovery. Senior citizens who may be immobile,
                patients recovering from chronic diseases or major surgeries
                especially benefit from our Doctor consultations at home. Some
                of the services provided during our visits are:
              </p>

              <ul className="service_page_features_list">
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    Physical examination and vitals monitoring
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    Coordination of skilled nurses and treatment protocols
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    Referral for physical therapy and any other specialized
                    rehabilitation services
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    Follow up care for chronic conditions including but not
                    limited to Heart diseases, Stroke, Parkinson’s disease,
                    Arthritis, Diabetes, COPD and kidney and Liver disorders
                  </p>
                </li>
              </ul>
            </div>
          </Col>
          <Col lg={4}>
            <OtherServices className="mb-4" />
            <BookAppointment currentService={"Doctor Home Visits"} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default DoctorHomeVisit_details;
