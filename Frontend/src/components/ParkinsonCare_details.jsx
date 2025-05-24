import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FeatureIcon from "../assets/features.svg";
import ParkinsonCare from "../assets/Parakinson_Care.webp";
import BookAppointment from "./BookAppointment";
import OtherServices from "./OtherServices";

const ParkinsonCare_details = () => {
  return (
    <section>
      <Container>
        <Row className="g-4">
          <Col lg={8}>
            <div className="service_img">
              <img src={ParkinsonCare} />
            </div>

            <div className="text-start pe-5" lg={8}>
              <h2 className="fs-3 fw-bold" style={{ color: "#012a4a" }}>
                Parkinson Care
              </h2>
              <p>
                Parkinson's disease is diagnosed, and this results in a mixture
                of shock, anxiety, and confusion. Nobody is fully sure what
                causes neurodegenerative brain disorders, which have an impact
                on how well muscles move and are controlled.
              </p>
              <p>
                Carehub Services is aware of the challenges that you and your
                family carers may have in managing your Parkinson's illness.
                Since handling the unpredictable and frequent symptoms of
                Parkinson's disease can be painful and stressful, we have
                competent and kind in-home carers that can help.
              </p>

              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                Our Parkinson Care services include
              </h4>
              <ul className="service_page_features_list">
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    Medication Management: Our nurses help manage the patient's
                    medications and ensure they are taken at the right time and
                    in the right dose.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    Mobility Assistance: Our nurses assist patients with
                    mobility, providing support with walking, transferring, and
                    other activities of daily living.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    Personal Care: Our nurses provide personal care services,
                    including bathing, dressing, and grooming, to ensure the
                    patient's comfort and well-being.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    Meal Preparation: Our nurses help prepare meals, ensuring
                    that the patient's dietary needs are met.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    Monitoring and Observation: Our nurses monitor the patient's
                    symptoms and report any changes to the doctor. They also
                    observe and report any adverse reactions to medications or
                    treatments.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    Companion Care: Our nurses provide emotional support and
                    companionship, helping to reduce feelings of loneliness and
                    isolation.
                  </p>
                </li>
              </ul>
              <p>
                We understand the unique needs of individuals living with
                Parkinson's disease, and we are dedicated to providing the best
                possible care and support. Contact us today to learn more about
                our Parkinson Care services.
              </p>
            </div>
          </Col>
          <Col lg={4}>
            <OtherServices className="mb-4" />
            <BookAppointment currentService={"Parkinson Care"} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ParkinsonCare_details;
