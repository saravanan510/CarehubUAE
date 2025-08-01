import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import Logo from "../assets/carehub_logo.png";
import { useMediaQuery } from "react-responsive";
import { useState } from "react"; // Import useState

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

export default function NavBar() {
  const isMobile = useMediaQuery({ maxWidth: 991 });
  const [expanded, setExpanded] = useState(false); // State to control Navbar expansion

  // Function to close the navbar
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
          <Link to={"/"} onClick={closeNavbar}>
            {" "}
            {/* Close on logo click */}
            <img src={Logo} className="logo" alt="" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className={isMobile && "mobile-toggle"}
        >
          <Nav className="ms-auto me-5 nav_item">
            <Nav.Link as={Link} to={"/"} onClick={closeNavbar}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to={"/aboutus"} onClick={closeNavbar}>
              About Us
            </Nav.Link>
            <NavDropdown
              title="Services"
              id="basic-nav-dropdown"
              className="dropdown"
            >
              {services.map((item, i) => {
                return (
                  <NavDropdown.Item
                    className="nav_service_link"
                    key={i}
                    onClick={closeNavbar}
                  >
                    <Link to={item.link}>{item.name}</Link>
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
            <Nav.Link
              as={Link}
              to={"/bookbloodtest"}
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
            className={isMobile ? "custom-button mt-3" : "custom-button px-4 "}
            onClick={closeNavbar}
          >
            <Link to={"/contact"}>Contact </Link>
          </button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
