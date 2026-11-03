import Image from "next/image";
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
                <Image src={NursingServices} alt="Home-Nursing-in-Dubai-UAE" />
              </div>

              <div className="text-start pe-5" lg={8}>
                <h1 className="fs-2 fw-bold" style={{ color: "#012a4a" }}>
                  Home Nursing Services in Dubai
                </h1>

                <p>
                  Carehub provides DHA-licensed home nursing across Dubai for
                  patients recovering from surgery, living with chronic illness,
                  or needing long-term care. A nurse matched to your condition
                  comes to your home, follows your doctor's discharge plan and
                  keeps your family informed. Call{" "}
                  <a
                    href="tel:+971559339234"
                    style={{ color: "#009b45", fontWeight: "600" }}
                  >
                    +971 55 933 9234
                  </a>{" "}
                  or message us on{" "}
                  <a
                    href="https://wa.me/971559339234"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#009b45", fontWeight: "600" }}
                  >
                    WhatsApp
                  </a>{" "}
                  for a free consultation.
                </p>

                <h2 className="fs-4 fw-bold" style={{ color: "#012a4a" }}>
                  Why Choose Home Nursing?
                </h2>

                <p>
                  Recovering at home means your loved one stays in familiar
                  surroundings with family close by, and receives one-to-one
                  attention from a nurse. Our nurses are available day and night
                  to help with:
                </p>

                <ul className="service_page_features_list">
                  <li>
                    <Image
                      src={FeatureIcon}
                      alt="Feature icon"
                      className="me-2"
                      width={16}
                      height={16}
                    />
                    <p className="service_feature m-0 fw-normal">
                      Monitoring vital signs and reporting changes to the doctor
                    </p>
                  </li>
                  <li>
                    <Image
                      src={FeatureIcon}
                      alt="Feature icon"
                      className="me-2"
                      width={16}
                      height={16}
                    />
                    <p className="service_feature m-0 fw-normal">
                      Giving prescribed medication on time
                    </p>
                  </li>
                  <li>
                    <Image
                      src={FeatureIcon}
                      alt="Feature icon"
                      className="me-2"
                      width={16}
                      height={16}
                    />
                    <p className="service_feature m-0 fw-normal">
                      Wound care and dressing changes
                    </p>
                  </li>
                  <li>
                    <Image
                      src={FeatureIcon}
                      alt="Feature icon"
                      className="me-2"
                      width={16}
                      height={16}
                    />
                    <p className="service_feature m-0 fw-normal">
                      IV fluids and injections as prescribed
                    </p>
                  </li>
                  <li>
                    <Image
                      src={FeatureIcon}
                      alt="Feature icon"
                      className="me-2"
                      width={16}
                      height={16}
                    />
                    <p className="service_feature m-0 fw-normal">
                      Feeding tube, tracheostomy and ventilator care
                    </p>
                  </li>
                  <li>
                    <Image
                      src={FeatureIcon}
                      alt="Feature icon"
                      className="me-2"
                      width={16}
                      height={16}
                    />
                    <p className="service_feature m-0 fw-normal">
                      Help with mobility, hygiene and daily living
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
                <h5 className="fs-6 fw-bold" style={{ color: "#012a4a" }}>
                  Our nurses specialize in
                </h5>
                <ul className="service_page_features_list">
                  <li>
                    <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">
                        Surgical Site Monitoring:
                      </span>
                      Early detection of infection and specialized dressing
                      changes.
                    </p>
                  </li>
                  <li>
                    <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">Pain Management:</span>{" "}
                      Administering prescribed analgesics and monitoring for
                      side effects.
                    </p>
                  </li>
                  <li>
                    <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
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
                    <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">
                        Tracheostomy & Ventilator Care:
                      </span>
                      Managing airway clearance and ensuring equipment
                      functionality 24/7.
                    </p>
                  </li>
                  <li>
                    <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">
                        Enteral Feeding (PEG/NG Tube):
                      </span>{" "}
                      Expert administration of nutrition and hydration through
                      feeding tubes.
                    </p>
                  </li>
                  <li>
                    <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
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
                    <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">
                        Chronic Disease Management:
                      </span>
                      When managing conditions like Diabetes or Hypertension
                      requires professional monitoring to avoid complications.
                    </p>
                  </li>
                  <li>
                    <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">Limited Mobility:</span> For
                      patients recovering from strokes or spinal injuries who
                      require assistance with physical therapy and daily living.
                    </p>
                  </li>
                  <li>
                    <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
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
                    <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">Respite Care:</span>{" "}
                      Short-term relief for families.
                    </p>
                  </li>
                  <li>
                    <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">Live-In Care:</span>{" "}
                      Full-time nurses for round-the-clock attention.
                    </p>
                  </li>
                  <li>
                    <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">Recovery Care:</span>{" "}
                      Post-hospitalization or illness rehabilitation.
                    </p>
                  </li>
                </ul>
                <h2 className="fs-4 fw-bold" style={{ color: "#012a4a" }}>
                  Why Families Choose Carehub
                </h2>
                <p>
                  Families choose Carehub for three reasons: a nurse matched to
                  the patient's condition, a care plan that follows the doctor's
                  instructions, and regular updates to the family. Before care
                  starts, a senior nurse visits your home to check it is safe and
                  to advise on any equipment needed. If the care plan or the
                  nurse is not right, tell us and we will adjust it.
                </p>
                <h2 className="fs-4 fw-bold" style={{ color: "#012a4a" }}>
                  Book a free consultation
                </h2>
                <p>
                  Tell us about the patient's condition and when care should
                  start. We will explain the options, the cost and how quickly a
                  nurse can begin. Call{" "}
                  <a
                    href="tel:+971559339234"
                    style={{ color: "#009b45", fontWeight: "600" }}
                  >
                    +971 55 933 9234
                  </a>
                  , message us on{" "}
                  <a
                    href="https://wa.me/971559339234"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#009b45", fontWeight: "600" }}
                  >
                    WhatsApp
                  </a>
                  , or use the form below.
                </p>
              </div>
            </Col>
            <Col lg={4}>
              <OtherServices className="mb-4" />
              <BookAppointment currentService={"Home Nursing services"} />
            </Col>
          </Row>
          <div>
            <h2 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
              Benefits of Home Nursing vs. Facility-Based Care
            </h2>
            <Table data={TableData} />
            <ServiceFAQ data={FAQData} />
          </div>
        </Container>
      </section>
    </>
  );
};

export default PrivateNursing_details;
