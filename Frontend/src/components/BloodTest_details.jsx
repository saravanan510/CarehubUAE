import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FeatureIcon from "../assets/features.svg";
import BloodTest from "../assets/Blood_Test.webp";
import BookAppointment from "./BookAppointment";
import OtherServices from "./OtherServices";
const BloodTest_details = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg={8}>
            <div className="service_img">
              <img src={BloodTest} />
            </div>

            <div className="text-start pe-5" lg={8}>
              <h2 className="fs-3 fw-bold" style={{ color: "#012a4a" }}>
                Diagnostic Blood Test At Home in Dubai
              </h2>
              <p>
                If you need an urgent diagnostic blood test at home in Dubai,
                Carehub offers 24x7 diagnostic test at home services with expert
                support. We collaborate with leading certified medical labs
                across Dubai to bring you safe, reliable testing without the
                hassle of clinic visits. Avoid the time-consuming and stressful
                process of visiting a diagnostic center—Carehub simplifies
                everything by sending a qualified nurse to your doorstep for
                blood or urine sample collection. Booking a Blood Test at Home
                in Dubai is fast and stress-free with our user-friendly system.
              </p>
              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                How It Works
              </h4>

              <ul className="service_page_features_list">
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">Book Your Test:</span>{" "}
                    Schedule online or via call, and our nurse arrives at your
                    chosen time.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">Sample Collection:</span> A
                    trained professional collects blood/urine samples at home.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">Lab Analysis:</span> Samples
                    are safely sent to our partnered labs for testing.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">Receive Results:</span> Get
                    digital reports within 24-48 hours, delivered directly to
                    your email or app.
                  </p>
                </li>
              </ul>
              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                Customized Care for Everyone
              </h4>
              <p>
                We offer tailored health checkup packages for all ages,
                including basic tests, specialized screenings, and comprehensive
                full-body checkups. Whether for routine monitoring or specific
                health needs, our flexible options ensure affordable, convenient
                care.
              </p>
              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                Why Choose Carehub?
              </h4>

              <ul className="service_page_features_list">
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    24x7 Diagnostic Test at Home in Dubai
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    Trusted, certified labs for accurate results
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    Quick, painless sample collection
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    Transparent pricing and timely reports
                  </p>
                </li>
              </ul>
              <p>
                Book hassle-free healthcare with Carehub—your trusted partner
                for home diagnostic services in Dubai!
              </p>
            </div>
          </Col>
          <Col lg={4}>
            <OtherServices className="mb-4" />
            <BookAppointment currentService={"Blood Test"} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BloodTest_details;
