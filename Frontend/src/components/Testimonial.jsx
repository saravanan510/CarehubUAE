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
            {/* <Col className="review" lg="6">
            <img src={Client_img} alt="" className="testimonial_profile" />
            <h4 style={{ color: "white" }}>
              Compassion Is At The Heart Of Our Care
            </h4>
            <p style={{ color: "white" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </Col> */}
            <Slider {...settings}>
              <div className="testimonial_review">
                <img src={Client_img} alt="" className="testimonial_profile" />
                <h2
                  style={{ color: "white", fontWeight: 600 }}
                  className="mb-3"
                >
                  Great Staff!
                </h2>
                <p style={{ color: "white" }}>
                  "CareHub Health Care provided exceptional home care services
                  for my elderly mother in Dubai. Their caregivers were not only
                  highly skilled but also compassionate and attentive to her
                  needs. I felt confident knowing she was in good hands, and it
                  made a significant difference in her quality of life. Thank
                  you, CareHub, for your dedication and professionalism!"
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
