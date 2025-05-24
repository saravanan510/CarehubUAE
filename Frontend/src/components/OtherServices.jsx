import React from "react";
import FeatureIcon from "../assets/features.svg";
import { Link } from "react-router-dom";
import { AnimatedOnScroll } from "react-animated-css-onscroll";
const services = [
  {
    name: "Home Nursing Services",
    link: "/home-nursing-services",
  },
  {
    name: "Post Operative Care",
    link: "/post-operative-care",
  },
  {
    name: "Ventilator Care",
    link: "/ventilator-care",
  },
  {
    name: "Palliative Care",
    link: "/palliative-care",
  },
  {
    name: "Elderly Care",
    link: "/elderly-care",
  },
  {
    name: "Pediatric Palliative",
    link: "/pediatric-palliative",
  },
  {
    name: "Paralytic Care",
    link: "/paralytic-care",
  },
  {
    name: "Parkinson Care",
    link: "/parkinson-care",
  },
  {
    name: "Physiotherapy Services",
    link: "/physiotherapy-services",
  },
  {
    name: "Doctor Home Visits",
    link: "/doctor-home-visits",
  },
  {
    name: "Medical Tourism",
    link: "/medical-tourism",
  },
  {
    name: "Injection Services",
    link: "/injection-services",
  },
  {
    name: "Blood Test",
    link: "/blood-test",
  },
  {
    name: "Hydrafacial Services",
    link: "/hydrafacial-services",
  },
  {
    name: "Post Stroke Recovery",
    link: "/post-stroke-recovery",
  },
];

const OtherServices = () => {
  return (
    <AnimatedOnScroll animationIn="animate__slideInUp ">
      <div className="otherservices rounded-4 animate__animated">
        <h3 className="fs-5 fw-bold mb-3" style={{ color: "#012a4a" }}>
          Other Services
        </h3>
        <ul className="ServicePage_list-list">
          {services.map((ele, i) => {
            return (
              <li key={i}>
                <img src={FeatureIcon} className="me-2" />
                <Link to={ele.link}>{ele.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </AnimatedOnScroll>
  );
};

export default OtherServices;
