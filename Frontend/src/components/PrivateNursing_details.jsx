import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FeatureIcon from "../assets/features.svg";
import NursingServices from "../assets/Nursing_Services.jpg";
import BookAppointment from "./BookAppointment";
import OtherServices from "./OtherServices";
import Table from "./Table";
import ServiceFAQ from "./ServiceFAQ";

const TableData = [
  {
    title: "Metric",
    value1: "Carehub Home Care",
    value2: "Residential Nursing Home",
  },
  {
    title: "Personalized attention",
    value1:
      "1-to-1 Dedicated Care. The nurse's focus is 100% on your loved one.",
    value2:
      "Shared staff. One nurse often manages 5–10 patients simultaneously.",
  },
  {
    title: "Infection Control",
    value1:
      "Significantly Safer. Minimizes exposure to hospital-acquired infections (HAIs).",
    value2: "Higher risk. Hospitals are hubs for multi-drug resistant germs.",
  },
  {
    title: "Psychological Impact",
    value1:
      "Familiar Comfort. Reduces Relocation Stress and promotes faster mental healing.",
    value2:
      "High Stress. Clinical environments often lead to isolation and anxiety.",
  },
  {
    title: "Cost Management",
    value1:
      "Economical Choice. Avoids expensive Dubai hospital room charges (AED 3k–7k/night).",
    value2:
      "High Overhead. You pay for facility maintenance, meals, and admin fees.",
  },
  {
    title: "Family Inclusion",
    value1:
      "Unlimited Access. No visiting hour restrictions; families stay involved.",
    value2:
      "Restricted. Strict visiting hours and hospital policies limit family time.",
  },
  {
    title: "Recovery Speed",
    value1:
      "Accelerated. 24/7 monitoring in a low-stress environment leads to better outcomes.",
    value2: "Standardized. Recovery follows a rigid institutional protocol.",
  },
];

const FAQData = [
  {
    key: "0",
    question: "Q:How quickly can a nurse be deployed?",
    answer:
      "A: We aim to start care within 24 to 48 hours of the initial assessment, ensuring no gap in your medical support.",
  },
  {
    key: "1",
    question: "Q: Can Carehub nurses travel with us for Medical Tourism?",
    answer:
      "A: Yes, our nurses can provide accompaniment during travel to ensure medical continuity across borders.",
  },
  {
    key: "2",
    question: "Q: Is home nursing covered by insurance in the UAE?",
    answer:
      "A: Coverage varies by provider and policy; we provide all necessary clinical documentation to assist with your reimbursement claims.",
  },
];

const PrivateNursing_details = () => {
  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg={8}>
              <div className="service_img">
                <img src={NursingServices} alt="Home-Nursing-in-Dubai-UAE" />
              </div>

              <div className="text-start pe-5" lg={8}>
                <h1 className="fs-3 fw-bold" style={{ color: "#012a4a" }}>
                  Home Nursing Services in Dubai: The Ultimate Guide to
                  Professional In-Home Care
                </h1>
                <h3 className="fs-6 fw-semibold">
                  Professional Home Nursing Services in Dubai: Championing Your
                  Recovery at Home
                </h3>

                <p>
                  In an era where medical technology allows for hospital-grade
                  care to be delivered in the home, Carehub Healthcare stands as
                  a beacon of clinical excellence in the UAE. Our DHA-licensed
                  home nursing services are designed for those who prioritize
                  comfort without compromising on medical safety. Whether you
                  are navigating the challenges of post-surgical recovery,
                  managing a chronic illness, or seeking specialized pediatric
                  support, our internationally trained nurses provide the
                  expertise you need to heal in a familiar, stress-free
                  environment.
                </p>

                <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                  Why Home Nursing is the Superior Choice
                </h4>

                <p>
                  With Home Nursing Services Dubai, your loved ones avoid the
                  stress of moving to a facility. Our team of professional,
                  caring nurses is available day and night to assist with:
                </p>

                <h5 className="fs-6 fw-bold" style={{ color: "#012a4a" }}>
                  The Carehub Process: How We Start Your Journey
                </h5>

                <ul className="service_page_features_list">
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">
                        Clinical Consultation:
                      </span>{" "}
                      We begin with a detailed discussion of the patient’s
                      medical history, current prescriptions, and recovery
                      goals.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">On-Site Safety Audit:</span>{" "}
                      A senior nursing supervisor conducts a home visit to
                      assess the environment for safety and identify any
                      necessary medical equipment.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">Bespoke Care Mapping:</span>{" "}
                      Our medical director creates a personalized care plan that
                      aligns with your primary physician's hospital discharge
                      instructions.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">Nurse Matching:</span> We
                      assign a nurse whose specific clinical background (e.g.,
                      ICU, Cardiac, or Pediatric) matches the patient’s
                      diagnosis.
                    </p>
                  </li>
                </ul>

                <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                  Deep-Dive: Specialized Clinical Capabilities
                </h4>

                <p style={{ color: "#012a4a" }}>
                  Post-Operative & Wound Care Management Recovery after major
                  surgery-such as orthopedic, cardiac, or abdominal
                  procedures-requires vigilant monitoring. Our nurses specialize
                  in
                </p>
                <h5 class="fs-6 fw-bold" style={{ color: "#012a4a" }}>
                  Our nurses specialize in
                </h5>
                <ul className="service_page_features_list">
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">
                        Surgical Site Monitoring:
                      </span>
                      Early detection of infection and specialized dressing
                      changes.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">Pain Management:</span>{" "}
                      Administering prescribed analgesics and monitoring for
                      side effects.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">
                        Suture and Staple Removal:
                      </span>{" "}
                      Professional removal once the wound has successfully
                      closed.
                    </p>
                  </li>
                </ul>

                <h5 className="fs-6 fw-bold" style={{ color: "#012a4a" }}>
                  Complex Clinical Support
                </h5>
                <p style={{ color: "#012a4a" }}>
                  For patients with high-dependency needs, Carehub provides
                  hospital-level intervention:
                </p>

                <ul className="service_page_features_list">
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">
                        Tracheostomy & Ventilator Care:
                      </span>
                      Managing airway clearance and ensuring equipment
                      functionality 24/7.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">
                        Enteral Feeding (PEG/NG Tube):
                      </span>{" "}
                      Expert administration of nutrition and hydration through
                      feeding tubes.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">Infusion Therapy:</span>{" "}
                      Professional administration of IV fluids, antibiotics, and
                      IVF injections in the comfort of your bedroom.
                    </p>
                  </li>
                </ul>

                <h5 className="fs-6 fw-bold" style={{ color: "#012a4a" }}>
                  When Should You Consider Home Nursing?
                </h5>

                <ul className="service_page_features_list">
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">
                        Chronic Disease Management:
                      </span>
                      When managing conditions like Diabetes or Hypertension
                      requires professional monitoring to avoid complications.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">Limited Mobility:</span> For
                      patients recovering from strokes or spinal injuries who
                      require assistance with physical therapy and daily living.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">Maternity Support:</span>{" "}
                      New mothers needing help with newborn care, lactation, and
                      post-delivery wound healing.
                    </p>
                  </li>
                </ul>

                <h5 className="fs-6 fw-bold" style={{ color: "#012a4a" }}>
                  Specialized Home Care Nursing in Dubai
                </h5>

                <p>
                  We offer tailored care for seniors, those recovering from
                  surgery, or patients with long-term conditions like
                  Alzheimer’s, diabetes, or dementia. Our nurses are trained to
                  handle medical needs while providing emotional comfort.
                </p>
                <h5 className="fs-6 fw-bold" style={{ color: "#012a4a" }}>
                  Personalized Care Plans
                </h5>
                <p>
                  At Carehub, we focus on dignity and choice. Our Home Nursing
                  in Dubai starts with a free consultation to design a care plan
                  that matches your family’s needs and routines. Each client
                  gets a dedicated nurse to build trust and ensure consistent
                  support.
                </p>
                <h5 className="fs-6 fw-bold" style={{ color: "#012a4a" }}>
                  Flexible Options for Every Family
                </h5>
                <p>Beyond 24-hour care, we provide:</p>
                <ul className="service_page_features_list">
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">Respite Care:</span>{" "}
                      Short-term relief for families.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">Live-In Care:</span>{" "}
                      Full-time nurses for round-the-clock attention.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">Recovery Care:</span>{" "}
                      Post-hospitalization or illness rehabilitation.
                    </p>
                  </li>
                </ul>
                <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                  Why Families Trust Us
                </h4>
                <p>
                  With Home Nursing Services Dubai, your loved ones stay safe,
                  healthy, and happy at home. We prioritize clear communication,
                  regular updates, and affordable solutions.
                </p>
                <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                  Contact Us Today
                </h4>
                <p>
                  Discover how Carehub’s Home Care Nursing in Dubai can ease
                  your family’s journey. Call or message us to book a
                  consultation and learn about our compassionate, expert
                  services.
                </p>
              </div>
            </Col>
            <Col lg={4}>
              <OtherServices className="mb-4" />
              <BookAppointment currentService={"Home Nursing services"} />
            </Col>
          </Row>
          <div>
            <Table data={TableData} />
            <ServiceFAQ data={FAQData} />
          </div>
        </Container>
      </section>
    </>
  );
};

export default PrivateNursing_details;
