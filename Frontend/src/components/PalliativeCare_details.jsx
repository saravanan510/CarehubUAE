import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FeatureIcon from "../assets/features.svg";
import PalliativeCare from "../assets/Palliative_Care.webp";
import BookAppointment from "./BookAppointment";
import OtherServices from "./OtherServices";

const PalliativeCare_details = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg={8}>
            <div className="service_img">
              <img src={PalliativeCare} />
            </div>

            <div className="text-start pe-5" lg={8}>
              <h2 className="fs-3 fw-bold" style={{ color: "#012a4a" }}>
                Palliative Care
              </h2>
              <p>
                Palliative care is an essential service that provides comfort
                and support to individuals who are living with a serious
                illness. At Carehub in Dubai, we understand the importance of
                providing top-quality palliative care services in the comfort of
                one's own home. Our team of highly trained and compassionate
                nurses and healthcare professionals is dedicated to helping
                individuals and their families navigate the challenges of a
                serious illness with dignity and grace.
              </p>

              <p>
                One of the key benefits of getting palliative care services at
                home is the ability to receive care in a familiar and
                comfortable environment. Our team of nurses and healthcare
                professionals will work closely with you and your family to
                create a personalized care plan that meets your unique needs and
                preferences. This may include managing symptoms such as pain,
                fatigue, and nausea, as well as providing emotional support and
                assistance with daily activities.
              </p>
              <p>
                In addition to providing care at home, our team at Carehub
                Services also offers a range of support services, including
                bereavement counseling and assistance with end-of-life planning.
                We understand that a serious illness can be a difficult and
                emotional time for both the individual and their family, and our
                goal is to provide compassionate and understanding care every
                step of the way.
              </p>
              <p>
                At Carehub Services, we pride ourselves on being a trusted and
                reliable source of palliative care services in Dubai and across
                UAE. Our team of highly trained and experienced nurses and
                healthcare professionals is committed to providing the highest
                quality care, and we strive to make a positive difference in the
                lives of those we serve.
              </p>
              <p>
                If you or a loved one is living with a serious illness and in
                need of palliative care services, we invite you to contact us to
                learn more about how we can help. Our team is available 24/7 to
                answer any questions you may have and to help you get the care
                and support you need.
              </p>
            </div>
          </Col>

          <Col lg={4}>
            <OtherServices className="mb-4" />
            <BookAppointment currentService={"Palliative Care"} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PalliativeCare_details;
