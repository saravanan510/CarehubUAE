import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FeatureIcon from "../assets/features.svg";
import NursingServices from "../assets/Nursing_Services.jpg";
import BookAppointment from "./BookAppointment";
import OtherServices from "./OtherServices";

const PrivateNursing_details = () => {
  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg={8}>
              <div className="service_img">
                <img src={NursingServices} />
              </div>

              <div className="text-start pe-5" lg={8}>
                <h2 className="fs-3 fw-bold" style={{ color: "#012a4a" }}>
                  Home Nursing Services in Dubai
                </h2>
                <p>
                  Carehub Healthcare is a trusted name in Home Nursing Services
                  Dubai, offering expert at-home care for those needing support
                  with daily tasks. Our 24/7 Home Nursing in Dubai ensures
                  individuals can live comfortably and independently in their
                  own homes, surrounded by familiarity.
                </p>

                <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                  Why Choose Our Home Care Nursing in Dubai?
                </h4>

                <p>
                  With Home Nursing Services Dubai, your loved ones avoid the
                  stress of moving to a facility. Our team of professional,
                  caring nurses is available day and night to assist with:
                </p>

                <h5 className="fs-6 fw-bold" style={{ color: "#012a4a" }}>
                  Services We Provide
                </h5>

                <ul className="service_page_features_list">
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">Personal Care:</span> Help
                      with bathing, dressing, and grooming.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">Medication Support:</span>{" "}
                      Giving medicines on time and managing prescriptions.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">Daily Meals:</span>{" "}
                      Preparing nutritious food and assisting with feeding.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">Mobility & Transport:</span>{" "}
                      Safe movement at home and support for appointments.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">Home Help:</span> Light
                      cleaning, laundry, and organizing living spaces.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">Companionship:</span>{" "}
                      Friendly interaction and activities to boost happiness.
                    </p>
                  </li>
                </ul>

                <h5 className="fs-6 fw-bold" style={{ color: "#012a4a" }}>
                  Specialized Home Care Nursing in Dubai
                </h5>

                <p>
                  We offer tailored care for seniors, those recovering from
                  surgery, or patients with long-term conditions like
                  Alzheimer’s, diabetes, or dementia. Our nurses are trained to
                  handle medical needs while providing emotional comfort.
                </p>
                <h5 className="fs-6 fw-bold" style={{ color: "#012a4a" }}>
                  Personalized Care Plans
                </h5>
                <p>
                  At Carehub, we focus on dignity and choice. Our Home Nursing
                  in Dubai starts with a free consultation to design a care plan
                  that matches your family’s needs and routines. Each client
                  gets a dedicated nurse to build trust and ensure consistent
                  support.
                </p>
                <h5 className="fs-6 fw-bold" style={{ color: "#012a4a" }}>
                  Flexible Options for Every Family
                </h5>
                <p>Beyond 24-hour care, we provide:</p>
                <ul className="service_page_features_list">
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">Respite Care:</span>{" "}
                      Short-term relief for families.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">Live-In Care:</span>{" "}
                      Full-time nurses for round-the-clock attention.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">Recovery Care:</span>{" "}
                      Post-hospitalization or illness rehabilitation.
                    </p>
                  </li>
                </ul>
                <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                  Why Families Trust Us
                </h4>
                <p>
                  With Home Nursing Services Dubai, your loved ones stay safe,
                  healthy, and happy at home. We prioritize clear communication,
                  regular updates, and affordable solutions.
                </p>
                <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                  Contact Us Today
                </h4>
                <p>
                  Discover how Carehub’s Home Care Nursing in Dubai can ease
                  your family’s journey. Call or message us to book a
                  consultation and learn about our compassionate, expert
                  services.
                </p>
              </div>
            </Col>
            <Col lg={4}>
              <OtherServices className="mb-4" />
              <BookAppointment currentService={"Home Nursing services"} />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default PrivateNursing_details;
