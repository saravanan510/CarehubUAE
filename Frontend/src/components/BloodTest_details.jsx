import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FeatureIcon from "../assets/features.svg";
import BloodTest from "../assets/Blood_Test.webp";
import BookAppointment from "./BookAppointment";
import OtherServices from "./OtherServices";
import Table from "./Table";
import ServiceFAQ from "./ServiceFAQ";

const TableData = [
  {
    title: "Feature",
    value1: "Carehub Home Collection",
    value2: "Hospital/Clinic Laboratory",
  },
  {
    title: "Wait Time",
    value1: "Zero. Appointment at your preferred time.",
    value2: "30 to 90 minutes in a waiting room.",
  },
  {
    title: "Infection Risk",
    value1: "None. No exposure to other sick patients.",
    value2: "High. Crowded areas increase viral exposure.",
  },
  {
    title: "Comfort",
    value1: "Relax on your own sofa or bed.",
    value2: "Clinical, often anxiety-inducing chairs.",
  },
  {
    title: "Fasting Tests",
    value1: "Ideal. No need to travel while hungry.",
    value2: "Requires traveling on an empty stomach.",
  },
  {
    title: "Result Delivery",
    value1: "Securely sent via Email/WhatsApp.",
    value2: "Often requires physical pickup or login portals.",
  },
];

const FAQData = [
  {
    key: "0",
    question: "Q: Can I book a blood test at home for my child?",
    answer:
      "A: Yes. We have pediatric specialists trained to work with children, using butterfly needles and gentle techniques to make the process as trauma-free as possible.",
  },
  {
    key: "1",
    question: "Q: Do I need a doctor's referral for a home blood test?",
    answer:
      "A: While a referral is helpful, you can book many of our wellness panels directly for personal health monitoring.",
  },
  {
    key: "2",
    question: "Q: Is the home collection service available on weekends?",
    answer:
      "A: Absolutely. Carehub operates 7 days a week, including early morning slots for fasting blood tests.",
  },
];

const BloodTest_details = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg={8}>
            <div className="service_img">
              <img src={BloodTest} alt="Blood Test at Home Dubai" />
            </div>

            <div className="text-start pe-5">
              <h2 className="fs-3 fw-bold" style={{ color: "#012a4a" }}>
                Blood Test at Home in Dubai: Clinical Laboratory Services at
                Your Doorstep
              </h2>

              <h1 className="fs-3 fw-bold" style={{ color: "#012a4a" }}>
                Professional Blood Test at Home in Dubai: Fast, Accurate, and
                Stress-Free Diagnostics
              </h1>

              <p>
                In today’s fast-paced world, your health diagnostics should fit
                your schedule, not the other way around. Carehub Healthcare
                eliminates the need for hospital queues, traffic, and waiting
                rooms by bringing DHA-licensed phlebotomists directly to your
                home, office, or hotel in Dubai.
              </p>

              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                Why Choose Carehub for Your Home Blood Test?
              </h4>

              <ul className="service_page_features_list">
                <li>
                  <img src={FeatureIcon} className="me-2" alt="" />
                  <p className="service_feature m-0">
                    <span className="fw-semibold">
                      DHA-Licensed Phlebotomists:
                    </span>{" "}
                    Highly trained professionals specializing in painless and
                    pediatric blood draws.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" alt="" />
                  <p className="service_feature m-0">
                    <span className="fw-semibold">Rapid Turnaround Times:</span>{" "}
                    Digital reports delivered within 12–24 hours.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" alt="" />
                  <p className="service_feature m-0">
                    <span className="fw-semibold">Gold-Standard Hygiene:</span>{" "}
                    Strict international sterilization protocols.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" alt="" />
                  <p className="service_feature m-0">
                    <span className="fw-semibold">Total Privacy:</span> Get
                    tested safely in your own home.
                  </p>
                </li>
              </ul>

              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                The Carehub Process: How It Works
              </h4>

              <ul className="service_page_features_list">
                <li>
                  <img src={FeatureIcon} className="me-2" alt="" />
                  <p className="service_feature m-0">
                    <span className="fw-semibold">Seamless Booking:</span>{" "}
                    WhatsApp or website booking.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" alt="" />
                  <p className="service_feature m-0">
                    <span className="fw-semibold">
                      Professional Collection:
                    </span>{" "}
                    Temperature-controlled kits.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" alt="" />
                  <p className="service_feature m-0">
                    <span className="fw-semibold">Secure Transportation:</span>{" "}
                    Bio-hazard containers.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" alt="" />
                  <p className="service_feature m-0">
                    <span className="fw-semibold">Digital Reports:</span>{" "}
                    WhatsApp or Email delivery.
                  </p>
                </li>
              </ul>

              <p className="mt-3">
                Book hassle-free healthcare with Carehub — your trusted partner
                for home diagnostic services in Dubai.
              </p>
            </div>
          </Col>

          <Col lg={4}>
            <OtherServices className="mb-4" />
            <BookAppointment currentService="Blood Test" />
          </Col>
        </Row>
        <div>
          <Table data={TableData} />
          <ServiceFAQ data={FAQData} />
        </div>
      </Container>
    </section>
  );
};

export default BloodTest_details;
