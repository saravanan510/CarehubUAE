import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FeatureIcon from "../assets/features.svg";
import PysiotheraphyService from "../assets/Physiotherapy_Services.webp";
import BookAppointment from "./BookAppointment";
import OtherServices from "./OtherServices";
const PysiotheraphyServices_details = () => {
  return (
    <section>
      <Container>
        <Row className="g-4">
          <Col lg={8}>
            <div className="service_img">
              <img src={PysiotheraphyService} />
            </div>

            <div className="text-start pe-5" lg={8}>
              <h2 className="fs-3 fw-bold" style={{ color: "#012a4a" }}>
                Best Home Physiotherapists at Your Doorstep
              </h2>
              <p>
                Physical therapy has made remarkable strides over the years,
                from its earliest documented history with Hippocrates to
                modern-day electronic and scientific treatments. Today,
                Physiotherapy at Home include a diverse range of practices such
                as cardiovascular and pulmonary physiotherapy, community
                physiotherapy, sports physiotherapy, physical therapy for skin,
                and orthopaedic physical therapy.
              </p>
              <p>
                At Carehub, we understand the importance of physical therapy in
                rehabilitating patients with various illnesses and disabilities.
                This form of therapy utilizes specific movements and mechanical
                forces on the affected areas of the body to increase mobility,
                reduce impairments, and improve the overall quality of life in
                patients. From neonatal to geriatric patients, our team of
                expert physiotherapists provides personalized care to meet the
                individual needs of each patient.
              </p>
              <p>
                Physical therapy has been a part of Indian medicine for
                centuries, with techniques like proper breathing and physical
                exercises described in Sushruta Samhita, a comprehensive medical
                treatise written around 600 BC. Yoga, a practice with strong
                links to physiotherapy, also originated in India over 5000 years
                ago. Combining the benefits of yoga and physiotherapy,
                Physioyoga is a popular rehabilitation therapy that promotes
                overall wellness of the body and mind.
              </p>

              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                Physiotherapy at home
              </h4>
              <p>
                Physiotherapy at home is gaining acceptance as a mainstream form
                of treatment in India. It is a holistic, effective, and
                long-lasting alternative to conventional forms of treatment for
                many conditions, including arthritis, frozen shoulder, dizziness
                and vertigo, backache, headache, sciatica, and athletic
                injuries.
              </p>
              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                Physiotherapy services near me
              </h4>
              <p>
                With state-of-the-art equipment and skilled techniques, our team
                of physiotherapists at Carehub can provide better care to
                patients with each passing day. As UAE faces a growing need for
                physiotherapy treatment for conditions like diabetes, arthritis,
                cancer, and cardiovascular diseases, our preventive and curative
                approach can save patients money and provide better long-term
                outcomes.
              </p>
              <p>
                If you or a loved one could benefit from physiotherapy, don't
                hesitate to consult Carehub BEST PHYSIOTHEPY AT HOMEtoday. Our
                personalized approach to care ensures that every patient
                receives the treatment they need to achieve optimal physical
                health.
              </p>
            </div>
          </Col>
          <Col lg={4}>
            <OtherServices className="mb-4" />
            <BookAppointment currentService={"Physiotherapy Services"} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PysiotheraphyServices_details;
