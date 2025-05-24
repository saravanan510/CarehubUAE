import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import service_1 from "../assets/Service_1.jpg";
import { TbNurse } from "react-icons/tb";
export default function service2() {
  return (
    <Container>
      <Row>
        <Col lg={3}>
          <div className="service2_card">
            <img src={service_1} className="service_img" width="100%" />
            <div className="service2_card-body">
              <TbNurse className="comperhensive_icon" />
              <h5>Private Home Nursing Care</h5>
              <p>
                At Carehub Healthcare, we offer a wide range of comprehensive
                services.
              </p>
              <button className="service2_btn">Learn More</button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
