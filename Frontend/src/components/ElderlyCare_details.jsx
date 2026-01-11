import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FeatureIcon from "../assets/features.svg";

import ElderlyCare from "../assets/Elderly_Care.webp";
import BookAppointment from "./BookAppointment";
import OtherServices from "./OtherServices";
import Table from "./Table";
import ServiceFAQ from "./ServiceFAQ";

const TableData = [
  {
    title: "Personalized attention",
    value1:
      "1-to-1 Dedicated Care. The nurse's focus is 100% on your loved one",
    value2:
      "1-to-1 Dedicated Care. The nurse's focus is 100% on your loved one",
  },
  {
    title: "Personalized attention",
    value1:
      "1-to-1 Dedicated Care. The nurse's focus is 100% on your loved one",
    value2:
      "1-to-1 Dedicated Care. The nurse's focus is 100% on your loved one",
  },
  {
    title: "Personalized attention",
    value1:
      "1-to-1 Dedicated Care. The nurse's focus is 100% on your loved one",
    value2:
      "1-to-1 Dedicated Care. The nurse's focus is 100% on your loved one",
  },
  {
    title: "Personalized attention",
    value1:
      "1-to-1 Dedicated Care. The nurse's focus is 100% on your loved one",
    value2:
      "1-to-1 Dedicated Care. The nurse's focus is 100% on your loved one",
  },
  {
    title: "Personalized attention",
    value1:
      "1-to-1 Dedicated Care. The nurse's focus is 100% on your loved one",
    value2:
      "1-to-1 Dedicated Care. The nurse's focus is 100% on your loved one",
  },
  {
    title: "Personalized attention",
    value1:
      "1-to-1 Dedicated Care. The nurse's focus is 100% on your loved one",
    value2:
      "1-to-1 Dedicated Care. The nurse's focus is 100% on your loved one",
  },
];

const FAQData = [
  {
    key: "0",
    question: "How quickly can a nurse be deployed?",
    answer:
      "We aim to start care within 24 to 48 hours of the initial assessment, ensuring no gap in your medical support.",
  },
  {
    key: "1",
    question: "How quickly can a nurse be deployed?",
    answer:
      "We aim to start care within 24 to 48 hours of the initial assessment, ensuring no gap in your medical support.",
  },
  {
    key: "2",
    question: "How quickly can a nurse be deployed?",
    answer:
      "We aim to start care within 24 to 48 hours of the initial assessment, ensuring no gap in your medical support.",
  },
  {
    key: "3",
    question: "How quickly can a nurse be deployed?",
    answer:
      "We aim to start care within 24 to 48 hours of the initial assessment, ensuring no gap in your medical support.",
  },
];

const ElderlyCare_details = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg={8}>
            <div className="service_img">
              <img src={ElderlyCare} />
            </div>

            <div className="text-start pe-5" lg={8}>
              <h2 className="fs-3 fw-bold" style={{ color: "#012a4a" }}></h2>
              <h1 className="fs-3 fw-bold" style={{ color: "#012a4a" }}>
                Compassionate Elderly Care Services in Dubai: Aging with Dignity
                at Home
              </h1>
              <h5>
                Expert Elderly Care in Dubai: Dedicated Support for a Life
                Well-Lived
              </h5>

              <p>
                As our loved ones age, their needs evolve from simple
                companionship to complex medical and physical support. In the
                fast-paced environment of the UAE, finding a balance between
                professional obligations and family care can be overwhelming.
                Carehub Healthcare bridges this gap by providing premier elderly
                care in Dubai, allowing seniors to maintain their independence
                within the comfort and safety of their own homes. Our mission is
                to transform the aging process into a journey of dignity,
                health, and emotional fulfillment.
              </p>
              <p>
                Carehub Services is UAEs leading provider of 24 hour home care.
                When you require around-the-clock assistance, we provide you
                with peace of mind, safety, and security. Our 24 hour disability
                assistance for Elders care services are provided on a continuous
                or intermittent basis while you recuperate from an illness or
                surgery.
              </p>
              <p>
                You will have a dedicated Client Care Coordinator working for
                you as a Carehub Services client. In order to provide your home
                care services, your Coordinator will assist you in developing a
                plan of care and assembling a small, nurse-led team of highly
                vetted caregivers.
              </p>
              <p>
                Carehub Services provides a flexible 24 hour care alternative
                with no lock-in contracts or obligations, allowing you to alter
                the level of assistance as needed.
              </p>
              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                The Core Pillars of Carehub Senior Support
              </h4>
              <h5 className="fs-6 fw-bold" style={{ color: "#012a4a" }}>
                Clinical & Medical Supervision
              </h5>
              <p>
                Unlike basic caregiving, Carehub provides DHA-licensed nursing
                professionals who can manage the technical aspects of senior
                health:
              </p>

              <ul className="service_page_features_list">
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    <span className="fw-semibold">
                      Chronic Condition Management:
                    </span>
                    Expert care for seniors living with Diabetes, Hypertension,
                    and Cardiovascular issues
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    <span className="fw-semibold">Medication Compliance:</span>{" "}
                    Rigorous tracking and administration of prescriptions to
                    prevent adverse drug interactions.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    <span className="fw-semibold">Vital Sign Analysis:</span>{" "}
                    Daily monitoring of blood pressure, glucose levels, and
                    oxygen saturation to catch health changes before they become
                    emergencies.
                  </p>
                </li>
              </ul>

              <h5 className="fs-6 fw-bold" style={{ color: "#012a4a" }}>
                Specialized Memory Care (Alzheimer’s & Dementia)
              </h5>
              <p>
                Cognitive decline requires a specialized approach that
                prioritizes routine and calm.
              </p>

              <ul className="service_page_features_list">
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    <span className="fw-semibold">Cognitive Stimulation:</span>
                    Engaging seniors in memory-enhancing activities and social
                    interaction to slow the progression of symptoms.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    <span className="fw-semibold">
                      Safe Environment Management:
                    </span>{" "}
                    Modifying the home to reduce confusion and prevent
                    "wandering" behaviors.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    <span className="fw-semibold">Emotional Anchoring:</span>{" "}
                    Providing a consistent caregiver to build a bond of trust
                    and reduce the anxiety often associated with memory loss.
                  </p>
                </li>
              </ul>

              <h5 className="fs-6 fw-bold" style={{ color: "#012a4a" }}>
                Physical Mobility & Fall Prevention
              </h5>
              <p>
                In the senior population, a single fall can lead to a long-term
                loss of independence.
              </p>

              <ul className="service_page_features_list">
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    <span className="fw-semibold">Safe Transfers:</span>
                    Professional assistance with moving from bed to chair or
                    navigating the bathroom safely.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    <span className="fw-semibold">
                      Gentle Exercise Programs:
                    </span>{" "}
                    Working alongside our Physiotherapy team to keep joints
                    mobile and muscles strong.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    <span className="fw-semibold">Home Safety Audits:</span> We
                    identify hazards like loose rugs or poor lighting that
                    increase the risk of injury.
                  </p>
                </li>
              </ul>

              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                A "Day in the Life" with a Carehub Senior Caregiver
              </h4>

              <ul className="service_page_features_list">
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    <span className="fw-semibold">Morning:</span>
                    Gentle waking, assistance with personal hygiene
                    (bathing/dressing), and a nutritious breakfast tailored to
                    dietary needs.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    <span className="fw-semibold">Mid-Day:</span> Medication
                    administration followed by a light walk or cognitive
                    activities like puzzles or reading.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    <span className="fw-semibold">Afternoon:</span>{" "}
                    Accompaniment to doctor appointments in Dubai or social
                    outings, ensuring the senior never feels isolated.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    <span className="fw-semibold">Evening:</span> Preparing a
                    calm environment for sleep, ensuring all medical needs are
                    met, and providing the family with a daily progress report.
                  </p>
                </li>
              </ul>

              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                Why Home Care Outperforms Residential Facilities in the UAE
              </h4>
              <p>
                We are ready to help your recover comfortably in your home with
                our personalized services designed just for your needs. We’re
                here to meet a number of post-surgery care needs, so you can
                focus on your post op care and recovery. We want to ensure our
                caregivers are accessible to you when you need them, which is
                why we are here to answer your call 24/7.
              </p>
              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                Our caregivers can assist with things such as
              </h4>
              <ul className="service_page_features_list">
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    Following discharge orders.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    Transportation to your home and your appointments.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    Prescription pickup, grocery shopping and other ends.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    Medication reminders.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    Meal preparation.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    Communication with healthcare providers and loved ones
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-semibold">
                    Reduced chances of secondary infections
                  </p>
                </li>
              </ul>
            </div>
          </Col>
          <Col lg={4}>
            <OtherServices className="mb-4" />
            <BookAppointment currentService={"Elderly Care"} />
          </Col>
          <Col className="text-start pe-5" lg={9}>
            <Row>
              <Col></Col>
            </Row>
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

export default ElderlyCare_details;
