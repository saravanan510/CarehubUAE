import Image from "next/image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FeatureIcon from "../assets/features.svg";
import BloodTest from "../assets/Blood_Test.webp";
import BookAppointment from "./BookAppointment";
import OtherServices from "./OtherServices";
import Table from "./Table";
import ServiceFAQ from "./ServiceFAQ";
import Link from "next/link";
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
        <div
          className="d-flex flex-column flex-sm-row justify-content-between align-items-center p-3 mb-4"
          style={{
            backgroundColor: "#f9f9f9",
          }}
        >
          <p style={{ margin: "0px", fontWeight: "600" }}>
            Book hassle-free healthcare with Carehub - your trusted partner for
            home diagnostic services in Dubai!
          </p>
          <Link
            href="/book-blood-test"
            style={{
              padding: "6px 12px",
              borderRadius: "4px",
              background: "#009b45",
              color: "white",
              marginRight: "12px",
              textDecoration: "none",
              display: "inline-block",
            }}
            className="splash-button"
          >
            Book Blood Test
          </Link>
        </div>

        <Row>
          <Col lg={8}>
            <div className="service_img">
              <Image src={BloodTest} alt="Blood Test" />
            </div>

            <div className="text-start pe-5" lg={8}>
              <h3 className="fs-3 fw-bold" style={{ color: "#012a4a" }}>
                Blood Test at Home in Dubai: Clinical Laboratory Services at
                Your Doorstep
              </h3>
              <h1 className="fs-6 fw-semibold">
                Professional Blood Test at Home in Dubai: Fast, Accurate, and
                Stress-Free Diagnostics
              </h1>

              <p>
                In today’s fast-paced world, your health diagnostics should fit
                your schedule, not the other way around. Carehub Healthcare
                eliminates the need for hospital queues, traffic, and waiting
                rooms by bringing DHA-licensed phlebotomists directly to your
                home, office, or hotel in Dubai. Whether you require a routine
                wellness check, chronic disease monitoring, or specialized
                diagnostic panels, our home blood collection service ensures
                that your samples are handled with the highest clinical
                standards and processed in accredited laboratories for 100%
                accuracy.
              </p>
              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                Why Choose Carehub for Your Home Blood Test?
              </h4>
              <p>
                We provide a seamless link between your home and the laboratory,
                prioritizing patient comfort and data integrity.
              </p>

              <ul className="service_page_features_list">
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">
                      DHA-Licensed Phlebotomists:
                    </span>{" "}
                    Our team consists of highly trained professionals
                    specializing in "difficult draws" and pediatric samples,
                    ensuring a painless and efficient experience.
                  </p>
                </li>
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">Rapid Turnaround Times:</span>
                    We understand that waiting for results can be stressful.
                    Most reports are delivered digitally within 12 to 24 hours.
                  </p>
                </li>
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">Gold-Standard Hygiene:</span>
                    Every collection follows strict international protocols for
                    sterilization and sample preservation.
                  </p>
                </li>
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">Total Privacy:</span>
                    Get tested in the confidentiality of your own home, away
                    from the public eye of a clinic.
                  </p>
                </li>
              </ul>

              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                Our Comprehensive Range of Home Blood Tests
              </h4>
              <p>
                We offer over 1,000 different laboratory investigations. Our
                most requested home panels include:
              </p>

              <h5 className="fs-6 fw-bold" style={{ color: "#012a4a" }}>
                A. General Wellness & Vitality Panels
              </h5>

              <ul className="service_page_features_list">
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">
                      Full Blood Count (FBC/CBC):
                    </span>{" "}
                    To check for anemia, infection, and general immune health.
                  </p>
                </li>
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">
                      Vitamin & Mineral Profile:
                    </span>
                    Assessing levels of Vitamin D, B12, Iron, and Calcium.
                  </p>
                </li>
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">
                      Kidney & Liver Function (KFT/LFT):
                    </span>
                    Essential for monitoring organ health and metabolic balance.
                  </p>
                </li>
              </ul>

              <h5 className="fs-6 fw-bold" style={{ color: "#012a4a" }}>
                B. Chronic Disease & Hormonal Monitoring
              </h5>

              <ul className="service_page_features_list">
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">
                      Diabetes Management (HbA1c):
                    </span>{" "}
                    Critical for tracking long-term blood sugar control.
                  </p>
                </li>
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">
                      Thyroid Profile (T3, T4, TSH):
                    </span>
                    To diagnose and manage hyper- or hypothyroidism.
                  </p>
                </li>
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">Lipid Profile:</span>
                    Detailed analysis of cholesterol and triglycerides for heart
                    health.
                  </p>
                </li>
              </ul>

              <h5 className="fs-6 fw-bold" style={{ color: "#012a4a" }}>
                C. Specialized Diagnostics
              </h5>

              <ul className="service_page_features_list">
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">
                      Food Intolerance & Allergy Testing:
                    </span>{" "}
                    Identifying triggers for digestive or skin issues.
                  </p>
                </li>
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">Hormonal Panels:</span>
                    Including Testosterone, Estrogen, and Progesterone for men’s
                    and women’s health.
                  </p>
                </li>
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">
                      Infectious Disease Screening:
                    </span>
                    Rapid and discreet testing for various viral and bacterial
                    infections.
                  </p>
                </li>
              </ul>

              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                The Carehub Process: How It Works
              </h4>
              <p>
                We have streamlined our diagnostic workflow to ensure maximum
                efficiency.
              </p>

              <ul className="service_page_features_list">
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">Seamless Booking:</span>{" "}
                    Contact us via WhatsApp or our website to book your
                    preferred time slot.
                  </p>
                </li>
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">
                      Professional Collection:
                    </span>
                    Our phlebotomist arrives with a temperature-controlled
                    medical kit to collect your sample.
                  </p>
                </li>
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">Secure Transportation:</span>
                    Samples are transported in specialized bio-hazard containers
                    to maintain stability.
                  </p>
                </li>
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">
                      Accredited Lab Analysis:
                    </span>
                    Processing is done at leading, DHA-approved laboratories.
                  </p>
                </li>
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">Digital Reports:</span>
                    Receive your results directly on your phone with an optional
                    doctor's consultation for review.
                  </p>
                </li>
              </ul>

              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                Customized Care for Everyone
              </h4>
              <p>
                We offer tailored health checkup packages for all ages,
                including basic tests, specialized screenings, and comprehensive
                full-body checkups. Whether for routine monitoring or specific
                health needs, our flexible options ensure affordable, convenient
                care.
              </p>
              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                Why Choose Carehub?
              </h4>

              <ul className="service_page_features_list">
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-semibold">
                    24x7 Diagnostic Test at Home in Dubai
                  </p>
                </li>
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-semibold">
                    Trusted, certified labs for accurate results
                  </p>
                </li>
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-semibold">
                    Quick, painless sample collection
                  </p>
                </li>
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-semibold">
                    Transparent pricing and timely reports
                  </p>
                </li>
              </ul>
            </div>
          </Col>
          <Col lg={4}>
            <OtherServices className="mb-4" />
            <BookAppointment currentService={"Blood Test"} />
          </Col>
        </Row>
        <div>
          <h2 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
            Comparison: Carehub Home Collection vs. Traditional Labs
          </h2>
          <Table data={TableData} />
          <ServiceFAQ data={FAQData} />
        </div>
      </Container>
    </section>
  );
};

export default BloodTest_details;
