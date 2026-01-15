import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { TbNurse } from "react-icons/tb";
import { AnimatedOnScroll } from "react-animated-css-onscroll";
const cardItems = [
  {
    title: "Private Nursing",
    para: "Skilled Home Nursing Professional bedside care, including injection services, blood tests at home, and medication management. ",
  },
  {
    title: "Home Nursing",
    para: "Critical & Post-Operative Care Specialized Ventilator care, Post-Stroke recovery, and Paralytic care to ensure a safe transition from hospital to home. ",
  },
  {
    title: "Post-Hospitalization",
    para: "Elderly & Chronic Care Compassionate Elderly care and specialized Parkinson’s care designed to maintain independence and dignity.",
  },
  {
    title: "Palliative Care",
    para: "Specialized Therapy & Wellness Expert Physiotherapy services, Palliative care, and premium Hydrafacial services for holistic wellbeing. ",
  },
];

const ComperhensiveService = () => {
  return (
    <section className="comp">
      <Container>
        <Row>
          <AnimatedOnScroll animationIn="animate__slideInUp">
            <Col className="header animate__animated animate__fadeInDown">
              <h2 className="fs-2 fw-bold">
                Our Comprehensive Clinical & Home Care Services
              </h2>
              <h5 className="fs-6 fw-bold" style={{ color: "#012a4a" }}>
                A Full Spectrum of Licensed Medical & Home Nursing Solutions in
                Dubai
              </h5>
              <p>
                At Carehub Healthcare, we understand that medical needs are
                rarely singular; they require a multi-disciplinary approach that
                evolves with the patient. We have meticulously designed a
                "Healthcare Hub" that integrates acute clinical nursing,
                specialized chronic care, and preventative wellness services
                under one roof. Every service we provide is delivered by
                DHA-licensed professionals who adhere to international safety
                protocols, ensuring that whether you require a simple blood test
                or complex ventilator support, you receive hospital-grade
                excellence in the privacy of your home.
              </p>
            </Col>
          </AnimatedOnScroll>
        </Row>
        <Row className="g-4">
          {cardItems.map((item) => {
            return (
              <Col xs={12} md={6} lg={3} className="d-flex flex-column">
                <Card className="comperhensive_card flex-grow-1">
                  <Card.Body>
                    <TbNurse className="comperhensive_icon" />
                    <Card.Title className="comp_service-title">
                      <h6>{item.title}</h6>
                    </Card.Title>
                    <Card.Text className="comp_service-para">
                      {item.para}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default ComperhensiveService;
