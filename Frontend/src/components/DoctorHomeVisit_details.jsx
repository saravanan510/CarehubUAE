import Image from "next/image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FeatureIcon from "../assets/features.svg";
import DoctorHomeVisit from "../assets/Doctor_Home_Visit.webp";
import BookAppointment from "./BookAppointment";
import OtherServices from "./OtherServices";
import Table from "./Table";
import ServiceFAQ from "./ServiceFAQ";

const TableData = [
  {
    title: "Feature",
    value1: "Carehub Home CareCarehub Doctor Home Visit",
    value2: "Dubai Public/Private Clinics",
  },
  {
    title: "Response Time",
    value1: "Immediate. Doctor dispatched to your location.",
    value2: "Variable. Subject to appointment slots and traffic.",
  },
  {
    title: "Exposure Risk",
    value1: "Zero. Total isolation in your own home.",
    value2: "High. Potential exposure to airborne pathogens in waiting areas.",
  },
  {
    title: "Care Quality",
    value1: "Personalized. 30-60 minute deep-dive consultations.",
    value2: "Transactional. Often 10-15 minutes per patient.",
  },
  {
    title: "Post-Visit Support",
    value1: "Included. Direct liaison with the nursing team.",
    value2: "Limited. Follow-up usually requires another appointment.",
  },
];
const FAQData = [
  {
    key: "0",
    question: "Q: Is the doctor visit covered by my UAE insurance?",
    answer:
      "A: While coverage depends on your specific policy, we provide all the standardized medical reports and invoices required for you to file a reimbursement claim with your insurance provider.",
  },
  {
    key: "1",
    question: "Q: How quickly can a doctor reach Jumeirah or Dubai Marina?",
    answer:
      "A: We have doctors strategically stationed across Dubai to ensure we can reach most major residential and business hubs within 45 to 60 minutes.",
  },
  {
    key: "2",
    question: "Q: Can the doctor perform a COVID-19 or Flu test at home?",
    answer:
      "A: Yes, our doctors are equipped with rapid testing kits for various viral infections and can provide immediate results or send samples for PCR analysis.",
  },
];

const DoctorHomeVisit_details = () => {
  return (
    <section>
      <Container>
        <Row className="g-4">
          <Col lg={8}>
            <div className="service_img">
              <Image src={DoctorHomeVisit} alt="Doctor Home Visit" />
            </div>

            <div className="text-start pe-5" lg={8}>
              <h3 className="fs-3 fw-bold" style={{ color: "#012a4a" }}>
                Doctor Home Visit Services in Dubai: The Ultimate Guide to
                Private Medical Care
              </h3>
              <h1 className="fs-6 fw-semibold">
                Professional Doctor Home Visit in Dubai: Exceptional Medical
                Care Delivered to Your Doorstep
              </h1>

              <p>
                In a fast-paced metropolis like Dubai, your health should never
                be sidelined by logistical hurdles. Traditional clinic visits
                often involve navigating heavy traffic, enduring long waiting
                room times, and risking exposure to secondary infections all
                while you are feeling at your worst. Carehub Healthcare is
                transforming the patient experience by bringing senior,
                DHA-licensed physicians directly to your home, office, or hotel.
                Our Doctor Home Visit service combines the clinical rigor of a
                hospital with the personalized, unhurried attention that only a
                private consultation can provide.
              </p>
              <p>
                Based on the patient’s condition, our doctors create a detail
                care plan for recovery. Senior citizens who may be immobile,
                patients recovering from chronic diseases or major surgeries
                especially benefit from our Doctor consultations at home. Some
                of the services provided during our visits are:
              </p>

              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                The Evolution of Healthcare: Why Choose a Home Physician?
              </h4>

              <p>
                The modern healthcare landscape is shifting toward
                "Patient-Centric" models. In Dubai, the demand for on-call
                doctors has surged as families and professionals seek more
                efficient ways to manage their wellbeing.
              </p>

              <ul className="service_page_features_list">
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">
                      Eliminating the "White Coat" Stress:
                    </span>
                    For many-especially children and the elderly-clinical
                    environments trigger anxiety. A home visit allows the doctor
                    to observe the patient in a relaxed, natural setting,
                    leading to a more accurate diagnosis.
                  </p>
                </li>
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">Immediate Intervention:</span>{" "}
                    When an illness strikes at 2:00 AM, the ability to have a
                    doctor arrive at your doorstep within the hour is not just a
                    convenience; it is a critical medical safety net.
                  </p>
                </li>
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">
                      Focused 1-to-1 Consultation:
                    </span>{" "}
                    Unlike a busy outpatient department where doctors are
                    pressured to see dozens of patients, a Carehub home visit
                    ensures that you have the doctor’s undivided attention for
                    as long as necessary.
                  </p>
                </li>
              </ul>

              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                Comprehensive Clinical Services Provided During a Home Visit
              </h4>
              <p>
                Our doctors carry advanced diagnostic kits, allowing them to
                perform a wide array of medical tasks on-site that were
                previously only possible in a hospital.
              </p>

              <h5 className="fs-6 fw-bold" style={{ color: "#012a4a" }}>
                A. Acute Illness & Urgent Care
              </h5>
              <p>
                Our General Practitioners (GPs) are experts in treating common
                but debilitating conditions:
              </p>

              <ul className="service_page_features_list">
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">
                      Respiratory & Flu Support:
                    </span>
                    Managing high fevers, seasonal influenza, asthma flare-ups,
                    and bronchitis.
                  </p>
                </li>
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">
                      Gastrointestinal Distress:
                    </span>{" "}
                    Treatment for food poisoning, severe stomach infections, and
                    the administration of IV rehydration for dehydration.
                  </p>
                </li>
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">Infection Control:</span>{" "}
                    Diagnosing and treating urinary tract infections (UTIs),
                    skin rashes, and ear/throat infections.
                  </p>
                </li>
              </ul>

              <h5 className="fs-6 fw-bold" style={{ color: "#012a4a" }}>
                B. Chronic Disease Management
              </h5>
              <p>
                For patients with long-term conditions, regular home visits
                ensure that their health remains stable without the strain of
                frequent travel.
              </p>

              <ul className="service_page_features_list">
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">
                      Diabetes & Hypertension:
                    </span>
                    Routine monitoring, prescription adjustments, and
                    preventative counseling.
                  </p>
                </li>
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">
                      Cardiovascular Check-ups:
                    </span>{" "}
                    Regular ECGs and heart-rate monitoring for seniors or
                    post-stroke patients.
                  </p>
                </li>
              </ul>

              <h5 className="fs-6 fw-bold" style={{ color: "#012a4a" }}>
                C. Pediatric & Geriatric Specializations
              </h5>
              <p>
                For patients with long-term conditions, regular home visits
                ensure that their health remains stable without the strain of
                frequent travel.
              </p>

              <ul className="service_page_features_list">
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">Child-Friendly Care:</span>
                    We provide gentle consultations for children, covering
                    everything from pediatric fevers to nebulization for
                    respiratory distress.
                  </p>
                </li>
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">Senior Wellness:</span>{" "}
                    Holistic geriatric assessments that focus on mobility,
                    cognitive health, and polypharmacy (medication management).
                  </p>
                </li>
              </ul>

              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                Comparison: Carehub Home Visit vs. Hospital ER/Clinics
              </h4>

              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                Seamless Diagnostic & Pharmacy Integration
              </h4>

              <p>
                A Carehub doctor visit is part of a larger "Medical Hub." If the
                physician determines that further tests are needed, the process
                is handled entirely at your home.
              </p>

              <ul className="service_page_features_list">
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">
                      Mobile Laboratory Services:
                    </span>
                    Our nurses arrive to collect blood, urine, or swab samples,
                    which are then analyzed at accredited labs with results sent
                    directly to your phone.
                  </p>
                </li>
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">Prescription Delivery:</span>{" "}
                    We work with leading pharmacies across Dubai to ensure your
                    prescribed medications are delivered to your doorstep within
                    hours of the doctor's visit.
                  </p>
                </li>
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">Specialist Referrals:</span>{" "}
                    Should your condition require a consultant or hospital
                    admission, our doctors facilitate the entire referral
                    process, providing the necessary medical reports for a
                    smooth transition.
                  </p>
                </li>
              </ul>

              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                Specialized Support for Tourists and Corporate Offices
              </h4>

              <ul className="service_page_features_list">
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">
                      Medical Tourism Support:
                    </span>
                    We provide high-end medical care to hotel guests in Dubai,
                    ensuring that an illness doesn't ruin your stay. We can also
                    provide "Fit-to-Fly" certificates for returning travelers.
                  </p>
                </li>
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">Corporate Wellness:</span> We
                    offer on-site consultations for employees at their place of
                    work, reducing sick-leave duration and improving workplace
                    health.
                  </p>
                </li>
              </ul>

              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                Frequently Asked Questions
              </h4>

              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                The Carehub Commitment: Licensing & Ethics
              </h4>
              <p>
                Every doctor at Carehub Healthcare is strictly vetted and holds
                a valid license from the Dubai Health Authority (DHA). We adhere
                to international medical ethics and UAE healthcare regulations,
                ensuring that your data is private and your care is of the
                highest clinical caliber.
              </p>

              <ul className="service_page_features_list">
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-semibold">
                    Physical examination and vitals monitoring
                  </p>
                </li>
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-semibold">
                    Coordination of skilled nurses and treatment protocols
                  </p>
                </li>
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-semibold">
                    Referral for physical therapy and any other specialized
                    rehabilitation services
                  </p>
                </li>
                <li>
                  <Image src={FeatureIcon} alt="Feature icon" className="me-2" width={16} height={16} />
                  <p className="service_feature m-0 fw-semibold">
                    Follow up care for chronic conditions including but not
                    limited to Heart diseases, Stroke, Parkinson’s disease,
                    Arthritis, Diabetes, COPD and kidney and Liver disorders
                  </p>
                </li>
              </ul>
            </div>
          </Col>
          <Col lg={4}>
            <OtherServices className="mb-4" />
            <BookAppointment currentService={"Doctor Home Visits"} />
          </Col>
        </Row>
        <div>
          <h2 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
            Comparison: Carehub Home Visit vs. Hospital ER/Clinics
          </h2>
          <Table data={TableData} />
          <ServiceFAQ data={FAQData} />
        </div>
      </Container>
    </section>
  );
};

export default DoctorHomeVisit_details;
