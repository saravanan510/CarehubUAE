import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FeatureIcon from "../assets/features.svg";
import MedicalTourism from "../assets/Medical_Tourism.webp";
import BookAppointment from "./BookAppointment";
import OtherServices from "./OtherServices";

const MedicalTourism_details = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg={8}>
            <div className="service_img">
              <img src={MedicalTourism} />
            </div>

            <div className="text-start pe-5" lg={8}>
              <h2 className="fs-3 fw-bold" style={{ color: "#012a4a" }}>
                Medical Tourism
              </h2>
              <p>
                Carehub healthcare is a leading medical tourism company in UAE
                operating as a bridge between patients and doctors, hospitals.
                It provides you with affordable medical care for various medical
                procedures. The purpose is to offer cost-effective,
                technology-based, safe, and reliable medical services to people
                across the world. Medical Tours follows the highest degree of
                ethics, confidentiality, and international norms. Carehub
                provides complete assistance from organizing your trip to
                particular country till you return. The main goal of Carehub is
                that every patient must feel that ‘it was like being home’ for
                them. If you are seeking medical needs, surgery, or treatment
                procedures to abroad.
              </p>
              <p>
                Let us know your requirements and issues so we can provide a
                complete solution to your medical concerns. We have our offices
                in Dubai. We have successfully assisted patients from Middle
                East & African countries getting remedies for their pains.
                Carehub.Care is run by a team of seasoned entrepreneurs and we
                take pride in our ethical and compassionate care towards our
                patients.
              </p>
            </div>
          </Col>

          <Col lg={4}>
            <OtherServices className="mb-4" />
            <BookAppointment currentService={"Medical Tourism"} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MedicalTourism_details;
