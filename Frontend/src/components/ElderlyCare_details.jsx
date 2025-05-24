import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FeatureIcon from "../assets/features.svg";

import ElderlyCare from "../assets/Elderly_Care.webp";
import BookAppointment from "./BookAppointment";
import OtherServices from "./OtherServices";

const ElderlyCare_details = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg={8}>
            <div className="service_img">
              <img src={ElderlyCare} />
            </div>

            <div className="text-start pe-5" lg={8}>
              <h2 className="fs-3 fw-bold" style={{ color: "#012a4a" }}>
                Elderly Care Services/Caretakers
              </h2>
              <p>
                We realize that you want to be at home. However, your care
                demands may have grown to the point that you require 24-hour
                care. Carehub healthcare will help you stay in the comfort of
                your own home if you require care 24 hours a day, seven days a
                week.
              </p>
              <p>
                Carehub Services is UAEs leading provider of 24 hour home care.
                When you require around-the-clock assistance, we provide you
                with peace of mind, safety, and security. Our 24 hour disability
                assistance for Elders care services are provided on a continuous
                or intermittent basis while you recuperate from an illness or
                surgery.
              </p>
              <p>
                You will have a dedicated Client Care Coordinator working for
                you as a Carehub Services client. In order to provide your home
                care services, your Coordinator will assist you in developing a
                plan of care and assembling a small, nurse-led team of highly
                vetted caregivers.
              </p>
              <p>
                Carehub Services provides a flexible 24 hour care alternative
                with no lock-in contracts or obligations, allowing you to alter
                the level of assistance as needed.
              </p>
              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                Planning for Your Home Care
              </h4>
              <p>
                Our team of after surgery care experts knows the right questions
                to ask your discharge planner, nurse or surgical coordinator, so
                we can create a personalized care plan that meets all your
                needs. We specially train every member of our post op care team
                in the transition that occurs when patients are discharged from
                the hospital to their homes, and we are here for you through
                every step of that process. We strive to provide first-rate care
                during your recovery.
              </p>
              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                Why Choose Carehub healthcare Services caretakers?
              </h4>
              <p>
                We are ready to help your recover comfortably in your home with
                our personalized services designed just for your needs. We’re
                here to meet a number of post-surgery care needs, so you can
                focus on your post op care and recovery. We want to ensure our
                caregivers are accessible to you when you need them, which is
                why we are here to answer your call 24/7.
              </p>
              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                Our caregivers can assist with things such as
              </h4>
              <ul className="service_page_features_list">
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    Following discharge orders.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    Transportation to your home and your appointments.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    Prescription pickup, grocery shopping and other ends.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    Medication reminders.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    Meal preparation.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    Communication with healthcare providers and loved ones
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    Reduced chances of secondary infections
                  </p>
                </li>
              </ul>
            </div>
          </Col>
          <Col lg={4}>
            <OtherServices className="mb-4" />
            <BookAppointment currentService={"Elderly Care"} />
          </Col>
          <Col className="text-start pe-5" lg={9}>
            <Row>
              <Col></Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ElderlyCare_details;
