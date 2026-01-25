import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FeatureIcon from "../assets/features.svg";
import PalliativeCare from "../assets/Palliative_Care.webp";
import BookAppointment from "./BookAppointment";
import OtherServices from "./OtherServices";
import Table from "./Table";
import ServiceFAQ from "./ServiceFAQ";

const TableData = [
  {
    title: "Feature",
    value1: "Palliative Care (Our Service)",
    value2: "Hospice Care",
  },
  {
    title: "Eligibility",
    value1: "Available at any stage of a serious illness.",
    value2: "Typically for patients with a 6-month prognosis.",
  },
  {
    title: "Treatment Goal",
    value1: "Provided alongside curative treatments.",
    value2: "Focused on comfort when curative care stops.",
  },
  {
    title: "Timing",
    value1: "Starts at the point of diagnosis.",
    value2: "Focuses on the final stages of life.",
  },
  {
    title: "Location",
    value1: "Provided at your home in Dubai or a clinic.",
    value2: "Usually home-based or in a dedicated facility.",
  },
];

const FAQData = [
  {
    key: "0",
    question: "Q: Is palliative care in Dubai only for cancer patients?",
    answer:
      "A: No. While we provide extensive support for oncological cases, we also care for patients with advanced heart disease, respiratory disorders, kidney failure, and neurological conditions like Parkinson’s or ALS.",
  },
  {
    key: "1",
    question: "Q: Is this service regulated by the Dubai Health Authority?",
    answer:
      "A: Yes. Every member of our team is DHA-licensed. We operate under the strict clinical guidelines set by the Dubai Health Authority to ensure the highest level of patient safety.",
  },
  {
    key: "2",
    question: "Q: Will my health insurance cover these services?",
    answer:
      "A: Most premium insurance providers in the UAE (such as GIG, Bupa, and NextCare) cover home-based palliative care. We can assist you in verifying your benefits.",
  },
  {
    key: "3",
    question: "Q: When is the right time to start palliative care?",
    answer:
      "A: The best time is at the point of diagnosis. Early integration helps manage symptoms before they become crises and provides the family with a clear roadmap for the journey ahead.",
  },
];

const PalliativeCare_details = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg={8}>
            <div className="service_img">
              <img src={PalliativeCare} />
            </div>

            <div className="text-start pe-5" lg={8}>
              <h1 className="fs-3 fw-bold" style={{ color: "#012a4a" }}>
                Professional Palliative Care in Dubai: Dignity, Comfort, and
                Expert Support
              </h1>
              <p>
                Facing a serious illness is one of life’s most difficult
                journeys, but you do not have to walk it alone. Our palliative
                care services in Dubai offer a specialized layer of support,
                focusing on the relief of symptoms and the improvement of daily
                life for both patients and their families. By combining clinical
                excellence with deep compassion, we ensure that comfort and
                dignity remain the priority, regardless of the medical
                diagnosis.
              </p>
              <p>
                One of the key benefits of getting palliative care services at
                home is the ability to receive care in a familiar and
                comfortable environment. Our team of nurses and healthcare
                professionals will work closely with you and your family to
                create a personalized care plan that meets your unique needs and
                preferences. This may include managing symptoms such as pain,
                fatigue, and nausea, as well as providing emotional support and
                assistance with daily activities.
              </p>
              <p>
                In addition to providing care at home, our team at Carehub
                Services also offers a range of support services, including
                bereavement counseling and assistance with end-of-life planning.
                We understand that a serious illness can be a difficult and
                emotional time for both the individual and their family, and our
                goal is to provide compassionate and understanding care every
                step of the way.
              </p>
              <p>
                At Carehub Services, we pride ourselves on being a trusted
                andreliable source of palliative care services in Dubai and
                across UAE. Our team of highly trained and experienced nurses
                and healthcare professionals is committed to providing the
                highest quality care, and we strive to make a positive
                difference in the lives of those we serve.
              </p>
              <p>
                If you or a loved one is living with a serious illness and in
                need of palliative care services, we invite you to contact us to
                learn more about how we can help. Our team is available 24/7 to
                answer any questions you may have and to help you get the care
                and support you need.
              </p>
              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                Service Overview: A Holistic Approach to Healing
              </h4>
              <p>
                Palliative care is often misunderstood as end-of-life care, but
                its true purpose is much broader. It is a specialized medical
                approach designed to optimize the quality of life by
                anticipating, preventing, and treating suffering.
              </p>
              <p>
                In Dubai, our home-based palliative care allows patients to
                remain in a familiar, loving environment while receiving
                thehigh-level medical attention typically found in a hospital.We
                address the physical, emotional, and social needs of our
                patients, working in harmony with their primary curative
                treatments.
              </p>
              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                Core Pillars of Our Care
              </h4>
              <p>
                To maintain the highest standards of healthcare in the UAE, our
                service is built on four essential pillars:
              </p>
              <ul className="service_page_features_list">
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">
                      Clinical Symptom Control:
                    </span>
                    Our DHA-registered nurses are experts in managing complex
                    symptoms, including chronic pain, respiratory distress, and
                    fatigue, ensuring the patient remains as comfortable as
                    possible.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" /> 
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">
                      Psychological Well-being:
                    </span>{" "}
                    We provide dedicated emotional support, helping patients and
                    families manage the anxiety and stress that often accompany
                    long-term illness.  
                  </p>
                </li>

                <li>
                  <img src={FeatureIcon} className="me-2" /> 
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">
                      Family-Centered Guidance:
                    </span>{" "}
                    We believe the family is the heart of the care plan. We
                    offer education and respite, ensuring caregivers feel
                    supported and informed every step of the way.
                  </p>
                </li>

                <li>
                  <img src={FeatureIcon} className="me-2" /> 
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">
                      24/7 Professional Availability:
                    </span>{" "}
                    In Dubai, medical needs don't follow a schedule. Our team is
                    available around the clock to provide peace of mind and
                    immediate intervention when it matters most.
                  </p>
                </li>
              </ul>
              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                Our Seamless 3-Step Process
              </h4>
              <ul className="service_page_features_list">
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">Clinical Consultation:</span>
                    We begin with a comprehensive home assessment in Dubai to
                    evaluate the patient’s medical history and comfort levels.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">
                      Multidisciplinary Strategy:
                    </span>
                    We coordinate with your existing specialists—at Dubai
                    Healthcare City or private hospitals—to build a unified care
                    plan.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">
                      Dedicated Home Implementation:
                    </span>{" "}
                    Our team begins regular home visits, providing constant
                    monitoring and adjusting care as the patient’s condition
                    evolves.
                  </p>
                </li>{" "}
              </ul>
            </div>
          </Col>

          <Col lg={4}>
            <OtherServices className="mb-4" />
            <BookAppointment currentService={"Palliative Care"} />
          </Col>
        </Row>
        <div>
          <h2 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
            Palliative Care vs. Hospice Care: Understanding the Difference
          </h2>
          <p>
            It is a common misconception that palliative care is only for the
            end of life. To help our Dubai clients make informed decisions, we
            have outlined the key differences:
          </p>
          <Table data={TableData} />
          <ServiceFAQ data={FAQData} />
        </div>
      </Container>
    </section>
  );
};

export default PalliativeCare_details;
