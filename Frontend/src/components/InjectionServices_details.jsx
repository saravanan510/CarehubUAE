import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FeatureIcon from "../assets/features.svg";
import Injection_Service from "../assets/Injection_service.webp";
import BookAppointment from "./BookAppointment";
import OtherServices from "./OtherServices";
const InjectionServices_details = () => {
  return (
    <section>
      <Container>
        <Row className="g-4">
          <Col lg={8}>
            <div className="service_img">
              <img src={Injection_Service} />
            </div>

            <div className="text-start pe-5" lg={8}>
              {/* <h2 className="fs-3 fw-bold" style={{ color: "#012a4a" }}>
                Medical Injection Services in Dubai
              </h2> */}
              <h2 className="fs-3 fw-bold" style={{ color: "#012a4a" }}>
                Injection at Home Service in Dubai
              </h2>
              <p>
                Enjoy professional Medical Injection Services Dubai without
                leaving your home. Our Injection at Home Service in Dubai allows
                you to receive treatments safely and comfortably in your own
                space. No more stressful trips to clinics or hospitals—save
                time, energy, and travel costs while prioritizing your health.
              </p>
              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                Key Benefits
              </h4>
              <ul className="service_page_features_list">
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">Convenience:</span> Skip long
                    hospital waits and avoid crowded spaces.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">Cost-Effective:</span> Save
                    money on transportation and parking fees.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">Safety & Comfort:</span> Stay
                    protected at home, especially if mobility or time is a
                    concern.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">Quality Care:</span>{" "}
                    Experienced medical professionals ensure safe, hygienic, and
                    expert care.
                  </p>
                </li>
              </ul>
              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                Why Choose Injection Services in Dubai?
              </h4>
              <p>
                Ideal for busy professionals, seniors, or anyone seeking
                hassle-free healthcare, our Injection at Home Service in Dubai
                offers affordable pricing and flexible scheduling. Whether
                routine treatments or specialized medical needs, we deliver
                reliable care tailored to your requirements.
              </p>
              <p>
                Book today and experience stress-free, high-quality Medical
                Injection Services Dubai from the comfort of your home!
              </p>
            </div>
          </Col>
          <Col lg={4}>
            <OtherServices className="mb-4" />
            <BookAppointment currentService={"Injection Services"} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default InjectionServices_details;
