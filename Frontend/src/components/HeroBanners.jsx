import Carousel from "react-bootstrap/Carousel";
import Banner_1 from "../assets/Banner_1.webp";
import Banner_2 from "../assets/Banner_2.webp";
import Banner_3 from "../assets/Banner_3.webp";
import Mobile_Banner_1 from "../assets/Mobile_Banner_1.webp";
import Mobile_Banner_2 from "../assets/Mobile_Banner_2.webp";
import Mobile_Banner_3 from "../assets/Mobile_Banner_3.webp";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

function UncontrolledExample() {
  const isMobile = useMediaQuery({ maxWidth: 475 });
  const controls = !isMobile;
  return (
    <Carousel controls={controls}>
      <Carousel.Item className="banner">
        {isMobile ? (
          <img src={Mobile_Banner_1} alt="First slide" className="" />
        ) : (
          <img src={Banner_1} alt="First slide" className="" />
        )}

        <Carousel.Caption className="banner_caption">
          <h1 className={isMobile ? "fw-bold" : "fw-bold"}>
            To us, it's Personal, Live Well with In-Home Care
          </h1>
          <p>
            At Care hub Healthcare, we know that people are happiest and most
            comfortable when in their own home.
          </p>
          <Link to={"/contact"}>
            <button className="banner_btn fw-semibold">Book Appointment</button>{" "}
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="banner">
        {isMobile ? (
          <img src={Mobile_Banner_2} alt="First slide" className="" />
        ) : (
          <img src={Banner_2} alt="First slide" className="" />
        )}
        <Carousel.Caption className="banner_caption">
          <h1 className={isMobile ? "fw-bold" : "fw-bold"}>
            Regenerative Aesthetic care, Where innovation meets excellence
          </h1>
          <p>
            At Carehub Nursing Services, we understand the importance of
            maintaining a sense of independence and autonomy for our clients.
          </p>
          <Link to={"/contact"}>
            <button className="banner_btn fw-semibold">Book Appointment</button>{" "}
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="banner">
        {isMobile ? (
          <img src={Mobile_Banner_3} alt="First slide" className="" />
        ) : (
          <img src={Banner_3} alt="First slide" className="" />
        )}
        <Carousel.Caption className="banner_caption">
          <h1 className={isMobile ? "fw-bold" : "fw-bold"}>
            Championing Your Comeback, Elevating Your Future
          </h1>
          <p>
            Access to service of qualified, experienced and internationally
            trained medical professionals right in the comfort of your home.
          </p>

          <Link to={"/contact"}>
            <button className="banner_btn fw-semibold">Book Appointment</button>{" "}
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;
