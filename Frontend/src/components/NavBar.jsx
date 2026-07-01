"use client";

import Image from "next/image";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Link from "next/link";
import Logo from "../assets/carehub_logo.png";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";

const services = [
  { name: "Home Nursing Services", link: "/home-nursing-services-dubai" },
  { name: "Post Operative Care", link: "/post-operative-care-dubai" },
  { name: "Ventilator Care", link: "/ventilator-care" },
  { name: "Palliative Care", link: "/palliative-care-dubai" },
  { name: "Elderly Care", link: "/elderly-care-services-dubai" },
  { name: "Pediatric Palliative", link: "/pediatric-palliative" },
  { name: "Paralytic Care", link: "/paralytic-care" },
  { name: "Parkinson Care", link: "/parkinson-care" },
  { name: "Physiotherapy Services", link: "/physiotherapy-services" },
  { name: "Doctor Home Visits", link: "/doctor-home-visit-dubai" },
  { name: "Medical Tourism", link: "/medical-tourism" },
  { name: "Injection Services", link: "/injection-services-at-home-dubai" },
  { name: "Blood Test", link: "/blood-test-at-home-dubai" },
  { name: "Hydrafacial Services", link: "/hydrafacial-services" },
  { name: "Post Stroke Recovery", link: "/post-stroke-recovery" },
];

export default function NavBar() {
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 991 });
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Before mount, always resolve to the desktop/default variant so the
  // server-rendered HTML and the client's first render match exactly.
  const mobileActive = mounted && isMobile;

  const closeNavbar = () => setExpanded(false);

  return (
    <Navbar
      expand="lg"
      className="py-0"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Container>
        <Navbar.Brand>
          <Link href={"/"} onClick={closeNavbar}>
            <Image src={Logo} alt="" className="logo" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className={mobileActive ? "mobile-toggle" : ""}
        >
          <Nav className="ms-auto me-5 nav_item">
            <Nav.Link as={Link} href={"/"} onClick={closeNavbar}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} href={"/aboutus"} onClick={closeNavbar}>
              About Us
            </Nav.Link>
            <NavDropdown
              title="Services"
              id="basic-nav-dropdown"
              className="dropdown"
            >
              {services.map((item) => (
                <NavDropdown.Item
                  className="nav_service_link"
                  key={item.link}
                  onClick={closeNavbar}
                  as="div"
                >
                  <Link href={item.link}>{item.name}</Link>
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <Nav.Link
              as={Link}
              href={"/book-blood-test"}
              onClick={closeNavbar}
              style={{
                backgroundImage: "linear-gradient(to right, #009b45, #00829B)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Blood Test
            </Nav.Link>
          </Nav>
          <button
            type="button"
            className={
              mobileActive ? "custom-button mt-3" : "custom-button px-4"
            }
            onClick={closeNavbar}
          >
            <Link href={"/contact"}>Contact</Link>
          </button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
