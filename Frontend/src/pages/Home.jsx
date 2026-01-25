import React from "react";
import HeroBanners from "../components/HeroBanners";
import ComperhensiveService from "../components/ComperhensiveService";
import Services from "../components/Services";
import Assistence from "../components/Assistence";
import Testimonial from "../components/Testimonial";
import Broucher from "../components/Broucher";
import Question2 from "../components/Questions2";
import AboutUs from "../components/AboutUs";
import AboutUs2 from "../components/AboutUs2";
import SimpleSlider from "../components/SimpleSlider";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>
          Best Home Nursing Services in Dubai | Carehub Healthcare UAE
        </title>
        <meta
          name="description"
          content=" Carehub offers professional home nursing, post-operative care, and elderly support in Dubai. Licensed nurses, doctor home visits, and 24/7 medical care. Book now!"
        />
        <meta
          name="keywords"
          content="Private nursing care in Dubai (High volume), Home care services in the UAE (Broad reach), IVF injections at home (Niche high-intent), Neurological rehabilitation (Specialized medical), 24-hour medical support (Urgent intent)"
        />
      </Helmet>
      <HeroBanners />
      <ComperhensiveService />
      <AboutUs />
      <AboutUs2 />
      <Services />
      <Assistence />
      <Testimonial />
      <Question2 />
      <Broucher />
    </div>
  );
};

export default Home;
