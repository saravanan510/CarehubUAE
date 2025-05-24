import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AnimatedOnScroll } from "react-animated-css-onscroll";
function Question2() {
  return (
    <section>
      <Container>
        <Row>
          <AnimatedOnScroll animationIn="animate__slideInUp">
            <Col className="header animate__animated animate__fadeInDown">
              <h2 className="fs-3 fw-bold">Frequently Asked Questions</h2>
              <p>
                At Carehub Healthcare, we offer a wide range of comprehensive
                services designed to cater to the unique needs of our clients.
              </p>
            </Col>
          </AnimatedOnScroll>
        </Row>
        <Row className="justify-content-md-center">
          <Col lg={8}>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  How do I book an appointment with CareHub Health Care
                  services?
                </Accordion.Header>
                <Accordion.Body>
                  Booking an appointment with CareHub Health Care is easy!
                  Simply click on the "Book Appointment" button on our website
                  to schedule a convenient time slot. You can also fill out the
                  appointment request form on our site, and our team will get in
                  touch with you promptly to confirm the appointment.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  What types of healthcare services does CareHub offer?
                </Accordion.Header>
                <Accordion.Body>
                  CareHub Health Care provides a wide range of healthcare
                  services tailored to meet the unique needs of our clients in
                  Dubai. Our services include but are not limited to home
                  nursing care, elderly care, post-operative care,
                  physiotherapy, and palliative care.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  How can I contact CareHub for more information?
                </Accordion.Header>
                <Accordion.Body>
                  For any inquiries or additional information about our
                  healthcare services, you can reach out to us via phone, email,
                  or through the contact form on our website. Our friendly team
                  is always ready to assist you and address any questions or
                  concerns you may have.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>
                  Are there any special discounts or packages available for
                  long-term care plans with CareHub?
                </Accordion.Header>
                <Accordion.Body>
                  Yes, CareHub Health Care offers special discounts and packages
                  for clients opting for long-term care plans. These packages
                  are designed to provide cost-effective solutions for
                  individuals and families requiring extended care services.
                  Contact us to learn more about our long-term care packages and
                  how they can benefit you or your loved ones.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Question2;
