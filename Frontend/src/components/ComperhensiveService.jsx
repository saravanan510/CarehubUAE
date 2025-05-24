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
    para: "At Carehub Nursing Services, we understand the importance of maintaining a sense of independence and autonomy for our clients. ",
  },
  {
    title: "Home Nursing",
    para: "Carehub healthcare  is a leading provider of in-home care services for individuals in need of assistance with daily living activities. ",
  },
  {
    title: "Post-Hospitalization",
    para: "Anybody's life can be completely upended by a serious sickness, accident, or other health incident.",
  },
  {
    title: "Palliative Care",
    para: "Palliative care is an essential service that provides comfort and support to individuals who are living with a serious illness. ",
  },
];

const ComperhensiveService = () => {
  return (
    <section className="comp">
      <Container>
        <Row>
          <AnimatedOnScroll animationIn="animate__slideInUp">
            <Col className="header animate__animated animate__fadeInDown">
              <h2 className="fs-2 fw-bold">Our Comprehensive Services</h2>
              <p>
                At Carehub Healthcare, we offer a wide range of comprehensive
                services designed to cater to the unique needs of our clients.
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
