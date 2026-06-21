import Image from "next/image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Logo from "../assets/logo.png";
import { LiaUserNurseSolid } from "react-icons/lia";
import Care from "../assets/Care.svg";

const Footer_top = () => {
  return (
    <div className="py-3" style={{ background: "#F9F9F9" }}>
      <Container>
        <Row>
          <Col className="ft_item" md={6} sm={12}>
            <Image src={Logo} alt="Logo" className="me-3" width={64} />
            <div>
              <h5 className="fs-5 fw-bold">Carehub Healthcare</h5>
              <p className="m-0">At Carehub Healthcare</p>
            </div>
          </Col>
          <Col className="ft_item" md={6} sm={12}>
            <Image src={Care} alt="Care" className="me-3" width={48} />
            <div>
              <h5 className="fs-5 fw-bold">+971 55 933 9234</h5>
              <p className="m-0">At Carehub Healthcare</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer_top;
