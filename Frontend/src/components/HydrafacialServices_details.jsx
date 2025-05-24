import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FeatureIcon from "../assets/features.svg";
import Hydrafacial from "../assets/Hydrafacial.webp";
import BookAppointment from "./BookAppointment";
import OtherServices from "./OtherServices";
const HydrafacialServices_details = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg={8}>
            <div className="service_img">
              <img src={Hydrafacial} />
            </div>

            <div className="text-start pe-5" lg={8}>
              <h2 className="fs-3 fw-bold" style={{ color: "#012a4a" }}>
                Hydrafacial Services at Home
              </h2>
              <p>
                Hydrafacial is an innovative and non-invasive skincare treatment
                that combines the benefits of hydradermabrasion, peels,
                extraction, and hydrating serums which is organic. This
                multi-step procedure is designed to cleanse, exfoliate, extract
                impurities, and infuse the skin with nourishing serums. It
                effectively addresses various skin concerns, including congested
                pores, uneven texture, fine lines, and hyperpigmentation.
                Hydrafacial is suitable for all skin types and provides instant
                and long-lasting results, leaving your skin revitalized,
                refreshed, and radiant. After just one treatment, you can expect
                visible results, including restored youthfulness, vibrancy, and
                smoother skin with reduced wrinkles and blemishes.
              </p>
              <p>
                Glutathione and vitamin C IV drip is a therapeutic treatment
                that delivers high levels of these essential nutrients directly
                into your bloodstream. Glutathione is a powerful antioxidant
                that supports detoxification and cellular health. Vitamin C is
                vital for immune function, collagen synthesis, and skin health.
                The IV drip ensures maximum absorption and effectiveness of
                these nutrients.
              </p>
            </div>
          </Col>
          <Col lg={4}>
            <OtherServices className="mb-4" />
            <BookAppointment currentService={"Hydrafacial Services"} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HydrafacialServices_details;
