import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FAQ from "../assets/faq.png";
import BroucherPDF from "../assets/Broucher.pdf";
import { AnimatedOnScroll } from "react-animated-css-onscroll";
const Broucher = () => {
  return (
    <section className="broucher">
      <Container>
        <Row>
          <Col className="broucher_header">
            <AnimatedOnScroll animationIn="animate__slideInUp">
              <div className="animate__animated animate__fadeInDown">
                <h2 className="fs-3 fw-bold">Broucher</h2>
                <p>
                  At Carehub Healthcare, we offer a wide range of comprehensive
                  services designed to cater to the unique needs of our clients.
                </p>
                <a href={BroucherPDF} download="Broucher.pdf">
                  <button type="button" class="custom-button border border-0">
                    Download
                  </button>
                </a>
              </div>
            </AnimatedOnScroll>
          </Col>
          <Col md={12} lg={6} className="broucher_img">
            <img src={FAQ} width="100%" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Broucher;
