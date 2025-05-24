import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FeatureIcon from "../assets/features.svg";
import ParalyticCare from "../assets/Paralytic_Care.webp";
import BookAppointment from "./BookAppointment";
import OtherServices from "./OtherServices";
const ParalyticCare_details = () => {
  return (
    <section>
      <Container>
        <Row className="g-4">
          <Col lg={8}>
            <div className="service_img">
              <img src={ParalyticCare} />
            </div>

            <div className="text-start pe-5" lg={8}>
              <h2 className="fs-3 fw-bold" style={{ color: "#012a4a" }}>
                Paralytic Care Services at home
              </h2>
              <p>
                Looking for quality Paralytic Care Services but want to receive
                them in the comfort of your own home? We understand the
                importance of having access to quality healthcare services,
                especially when dealing with physical limitations and
                disabilities. That's why we offer affordable Paralytic Care
                Services, tailored to meet your specific needs and delivered
                right to your doorstep. With a team of experienced and
                knowledgeable healthcare professionals, you can trust us to
                provide high-quality, compassionate care that will help you live
                your best life, on your terms. Contact us today to learn more
                about how we can help.
              </p>
            </div>
          </Col>
          <Col lg={4}>
            <OtherServices className="mb-4" />
            <BookAppointment currentService={"Paralytic Care"} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ParalyticCare_details;
