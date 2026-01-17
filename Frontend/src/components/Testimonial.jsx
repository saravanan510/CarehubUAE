import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Client_img from "../assets/carehub-logo.jpg";
function Testimonial() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className="testimonial">
      <Container>
        <Row className="justify-content-md-center">
          <Col>
            <Slider {...settings}>
              <div className="testimonial_review">
                <img src={Client_img} alt="" className="testimonial_profile" />
                <h2
                  style={{ color: "white", fontWeight: 600 }}
                  className="mb-3"
                >
                  Trusted by Families Across Dubai!
                </h2>
                <p style={{ color: "white" }}>
                  "Carehub Healthcare provided exceptional elderly care services
                  for my mother in Dubai. Their caregivers were not only highly
                  skilled but also showed true compassion. I felt confident
                  knowing she was in safe, professional hands. They made a
                  significant difference in her recovery and quality of life.
                  Thank you, Carehub, for your dedication!"
                </p>
              </div>
              <div className="testimonial_review">
                <img src={Client_img} alt="" className="testimonial_profile" />
                <h3 style={{ color: "white", fontWeight: 600 }}>Friendly</h3>
                <p style={{ color: "white" }}>
                  "I can't thank CareHub Health Care enough for the wonderful
                  support they provided for my family during a challenging time.
                  Their team went above and beyond to ensure our loved one
                  received the best possible care at home in Dubai. From
                  medication management to daily activities, they were there
                  every step of the way with kindness and expertise. Highly
                  recommend their services to anyone in need of compassionate
                  home care."
                </p>
              </div>
            </Slider>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Testimonial;
