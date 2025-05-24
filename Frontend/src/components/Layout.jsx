import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollTop";
import { useMediaQuery } from "react-responsive";
import "animate.css/animate.css";
import Action from "./Action";

const Layout = () => {
  const isMobile = useMediaQuery({ maxWidth: 475 });
  return (
    <>
      <ScrollToTop />
      <Header />
      <div style={{ marginTop: isMobile ? "80px" : "124px" }}>
        <Outlet />
      </div>
      <Footer />
      <Action />
    </>
  );
};

export default Layout;
