import Image from "next/image";
import React from "react";
import FeatureIcon from "../assets/features.svg";
import Link from "next/link";

const services = [
  {
    name: "Home Nursing Services",
    link: "/home-nursing-services-dubai",
  },
  {
    name: "Post Operative Care",
    link: "/post-operative-care-dubai",
  },
  {
    name: "Ventilator Care",
    link: "/ventilator-care",
  },
  {
    name: "Palliative Care",
    link: "/palliative-care-dubai",
  },
  {
    name: "Elderly Care",
    link: "/elderly-care-services-dubai",
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
    link: "/doctor-home-visit-dubai",
  },
  {
    name: "Medical Tourism",
    link: "/medical-tourism",
  },
  {
    name: "Injection Services",
    link: "/injection-services-at-home-dubai",
  },
  {
    name: "Blood Test",
    link: "/blood-test-at-home-dubai",
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
    <div className="otherservices rounded-4">
      <h3 className="fs-5 fw-bold mb-3" style={{ color: "#012a4a" }}>
        Other Services
      </h3>
      <ul className="ServicePage_list-list">
        {services.map((ele, i) => {
          return (
            <li key={i}>
              <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
              <Link href={ele.link}>{ele.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OtherServices;
