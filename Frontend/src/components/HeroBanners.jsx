"use client";
import Image from "next/image";
import Carousel from "react-bootstrap/Carousel";
import Banner_1 from "../assets/Banner_1.webp";
import Banner_2 from "../assets/Banner_2.webp";
import Banner_3 from "../assets/Banner_3.webp";
import Mobile_Banner_1 from "../assets/Mobile_Banner_1.webp";
import Mobile_Banner_2 from "../assets/Mobile_Banner_2.webp";
import Mobile_Banner_3 from "../assets/Mobile_Banner_3.webp";
import { Link } from "@/utils/router-compat";

function UncontrolledExample() {
  return (
    <Carousel controls fade={false}>
      <Carousel.Item className="banner">
        <Image
          src={Banner_1}
          alt="First slide"
          className="d-none d-sm-block"
          priority
        />
        <Image
          src={Mobile_Banner_1}
          alt="First slide"
          className="d-block d-sm-none"
          priority
        />
        <Carousel.Caption className="banner_caption">
          <h1 className="fw-bold">
            Championing Your Recovery, Elevating Your Future: Expert Home
            Nursing in Dubai
          </h1>
          <p>
            Access world-class medical care from internationally trained,
            licensed nursing professionals in the comfort of your home. From
            post-surgical recovery to 24/7 elderly care, Carehub Healthcare is
            your partner in healing.
          </p>
          <Link to={"/contact"}>
            <button className="banner_btn fw-semibold">Book Appointment</button>
          </Link>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item className="banner">
        <Image
          src={Banner_2}
          alt="Second slide"
          className="d-none d-sm-block"
        />
        <Image
          src={Mobile_Banner_2}
          alt="Second slide"
          className="d-block d-sm-none"
        />
        <Carousel.Caption className="banner_caption">
          <h1 className="fw-bold">
            Your Health, Our Priority. Expert Nursing at Home.
          </h1>
          <p>
            Licensed DHA professionals providing clinical excellence 24/7. From
            pain management to elderly support, we bring the hospital to
            you—safely and professionally.
          </p>
          <Link to={"/contact"}>
            <button className="banner_btn fw-semibold">Book Appointment</button>
          </Link>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item className="banner">
        <Image src={Banner_3} alt="Third slide" className="d-none d-sm-block" />
        <Image
          src={Mobile_Banner_3}
          alt="Third slide"
          className="d-block d-sm-none"
        />
        <Carousel.Caption className="banner_caption">
          <h1 className="fw-bold">Recover Faster. Heal Better. Stay Home.</h1>
          <p>
            Premium home nursing and physician visits tailored to your recovery.
            Experience one-on-one medical care designed for your comfort and
            independence in Dubai.
          </p>
          <Link to={"/contact"}>
            <button className="banner_btn fw-semibold">Book Appointment</button>
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;
