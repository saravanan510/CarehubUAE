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

const Home = () => {
  return (
    <div>
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
