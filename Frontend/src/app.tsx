import React, { Children, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  ScrollRestoration,
  Link,
  Outlet,
  Location,
  useMatches,
  useNavigation,
} from "react-router-dom";
import Home from "./pages/Home";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateNursing from "./pages/PrivateNursing";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./components/Assistence";
import PostOperativeCare from "./pages/PostOperativeCare";
import VentilatorCare from "./pages/VentilatorCare";
import PalliativeCare from "./pages/PalliativeCare";
import ElderlyCare from "./pages/ElderlyCare";
import PediatricPalliative from "./pages/PediatricPalliative";
import ParalyticCare from "./pages/ParalyticCare";
import ParkinsonCare from "./pages/ParkinsonCare";
import PysiotheraphyServices from "./pages/PysiotheraphyServices";
import DoctorHomeVisit from "./pages/DoctorHomeVisit";
import MedicalTourism from "./pages/MedicalTourism";
import InjectionServices from "./pages/InjectionServices";
import BloodTest from "./pages/BloodTest";
import HydrafacialServices from "./pages/HydrafacialServices";
import ScrolltoTop from "./components/ScrollTop";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import RefundPolicy from "./pages/RefundPolicy";
import Logo from "./assets/logo.png";
import { useMediaQuery } from "react-responsive";
import Header from "./components/Header";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollTop";
import "animate.css/animate.css";

let router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/private-nursing",
        element: <PrivateNursing />,
      },
      {
        path: "/post-operative-care",
        element: <PostOperativeCare />,
      },
      {
        path: "/ventilator-care",
        element: <VentilatorCare />,
      },
      {
        path: "/palliative-care",
        element: <PalliativeCare />,
      },
      {
        path: "/elderly-care",
        element: <ElderlyCare />,
      },
      {
        path: "/pediatric-palliative",
        element: <PediatricPalliative />,
      },
      {
        path: "/paralytic-care",
        element: <ParalyticCare />,
      },
      {
        path: "/parkinson-care",
        element: <ParkinsonCare />,
      },
      {
        path: "/physiotherapy-services",
        element: <PysiotheraphyServices />,
      },
      {
        path: "/doctor-home-visits",
        element: <DoctorHomeVisit />,
      },
      {
        path: "/medical-tourism",
        element: <MedicalTourism />,
      },
      {
        path: "/injection-services",
        element: <InjectionServices />,
      },
      {
        path: "/blood-test",
        element: <BloodTest />,
      },
      {
        path: "/hydrafacial-services",
        element: <HydrafacialServices />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/aboutus",
        element: <AboutUs />,
      },
      {
        path: "/refund-policy",
        element: <RefundPolicy />,
      },
    ],
  },
]);

export const services: any = [
  {
    name: "24 Hours In-Home Nursing services",
    link: "/private-nursing",
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
];

export default function App() {
  return <RouterProvider router={router} />;
}

function Layout() {
  let navigation = useNavigation();
  const [hideService, setHideService] = useState<any>("");

  const isMobile: any = useMediaQuery({ maxWidth: 991 });

  let getKey = React.useCallback(
    (location: Location, matches: ReturnType<typeof useMatches>) => {
      let match = matches.find((m) => (m.handle as any)?.scrollMode);
      if ((match?.handle as any)?.scrollMode === "pathname") {
        return location.pathname;
      }
      return location.key;
    },
    []
  );

  const HandleChange = (e) => {
    setHideService(e.target.innerHTML);
  };

  const LinkStyles = {
    textDecoration: "none",
    color: "rgba(33, 37, 41, 0.75)",
    marginTop: "8px",
  };

  const dataget = services.find((data) => data.name === hideService);

  return (
    <>
      <ScrollToTop />
      <TopBar />

      {/* -------- Navbar Starts Here-------- */}

      <Navbar expand="lg" className="py-0">
        <Container>
          <Navbar.Brand>
            <img src={Logo} className="logo" alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className={isMobile && "mobile-toggle"}
          >
            <Nav className="ms-auto me-5 nav_item" onClick={HandleChange}>
              <Link to={"/"} style={LinkStyles}>
                Home
              </Link>
              {/* 
            {
             (hideService === "About Us" || hideService === "Home" || hideService === "Services") && 
            <Link to="#aboutus" style={LinkStyles}>About Us</Link>
            } */}

              {dataget ? (
                ""
              ) : (
                <Link to="#aboutus" style={LinkStyles}>
                  About Us
                </Link>
              )}

              <NavDropdown
                title="Services"
                id="basic-nav-dropdown"
                className="dropdown"
              >
                {services.map((item) => {
                  return (
                    <NavDropdown.Item className="nav_service_link">
                      <Link to={item.link}>{item.name}</Link>
                    </NavDropdown.Item>
                  );
                })}
              </NavDropdown>
            </Nav>
            <button
              type="button"
              className={isMobile ? "custom-button mt-3" : "custom-button"}
            >
              <Link to={"/contact"}>Contact </Link>
            </button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* -------- Navbar Ends Here-------- */}

      <Outlet />
      <Footer />
      <ScrollRestoration getKey={getKey} />
    </>
  );
}
