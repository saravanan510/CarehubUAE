import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PediatricPalliative from "../assets/Peadiatric_Palliative_Care.webp";
import BookAppointment from "./BookAppointment";
import OtherServices from "./OtherServices";
const PediatricPalliative_details = () => {
  return (
    <section>
      <Container>
        <Row className="g-4">
          <Col className="text-start pe-5" lg={9}></Col>
          <Col lg={8}>
            <div className="service_img">
              <img src={PediatricPalliative} />
            </div>

            <div className="text-start pe-5" lg={8}>
              <h2 className="fs-3 fw-bold" style={{ color: "#012a4a" }}>
                Pediatric Palliative care Services at Home
              </h2>
              <p>
                Pediatric Palliative care is specialized medical care for people
                living with a serious illness. Palliative care focuses on
                providing relief from the symptoms and stress of the illness.
                The goal is to improve quality of life for both the child and
                the family.
              </p>
              <p>
                A specially-trained team of doctors, nurses, social workers and
                others provide palliative care. The team works together with the
                child’s other doctors as an extra layer of support. Palliative
                care is appropriate at any age and at any stage of an illness,
                and it can be provided along with treatment meant to cure.
              </p>
              <p>
                Palliative care is based on need, not prognosis, so it is best
                to bring the team in early.
              </p>
              <p>
                Pediatric palliative care addresses serious medical conditions,
                including genetic disorders, cancer, prematurity, neurologic
                disorders, heart and lung conditions and others. It relieves the
                symptoms of these diseases, such as pain, shortness of breath,
                fatigue, constipation, nausea, loss of appetite and difficulty
                sleeping, anxiety and depression. In short, it helps the child
                and the family improves their quality of life.
              </p>

              <p>
                Pediatric palliative care is family-centered. It helps with
                communication and coordination of care. With the close
                communication that palliative care provides, families are better
                able to choose options that are in line with their values,
                traditions and culture. This improves the well-being of the
                entire family.
              </p>

              <p>
                Palliative care is based on need, not prognosis. It is best to
                start palliative care as early as possible. This benefits both
                the child and the family.
              </p>
            </div>
          </Col>
          <Col lg={4}>
            <OtherServices className="mb-4" />
            <BookAppointment currentService={"Pediatric Palliative"} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PediatricPalliative_details;
