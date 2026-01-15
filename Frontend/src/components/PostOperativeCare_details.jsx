import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FeatureIcon from "../assets/features.svg";
import PostOperativeCare from "../assets/Post_Operative_Care.webp";
import BookAppointment from "./BookAppointment";
import OtherServices from "./OtherServices";
import Table from "./Table";
import ServiceFAQ from "./ServiceFAQ";

const TableData = [
  {
    title: "Metric",
    value1: "Carehub Home Recovery",
    value2: "Extended Hospital Stay",
  },
  {
    title: "Nurse-to-Patient Ratio",
    value1: "1-to-1 Dedicated Care",
    value2: "Shared among multiple beds",
  },
  {
    title: "Infection Risk",
    value1: "Sharp Drop (Home germs are familiar)",
    value2: "Higher risk of hospital-acquired infections (HAI)",
  },
  {
    title: "Environment",
    value1: "Familiar, quiet, and promotes rest",
    value2: "High-stress, noisy, and clinical",
  },
  {
    title: "Cost Factors",
    value1: "Highly Cost-Effective (Pay for care only)",
    value2: "Expensive daily room and service charges",
  },
  {
    title: "Recovery Speed",
    value1: "Often faster due to better sleep and mood",
    value2: "Standard clinical progression",
  },
];

const FAQData = [
  {
    key: "0",
    question: "Q: How soon can I start home nursing after surgery?",
    answer:
      "A: We recommend starting the same day you are discharged. We can even provide a nurse to accompany you in the ambulance or car from the hospital.",
  },
  {
    key: "1",
    question: "Q: Can you help with physical therapy after surgery?",
    answer:
      "A: Yes. We have dedicated Physiotherapy services that work alongside your nurse to help you regain strength and range of motion.",
  },
  {
    key: "2",
    question: "Q: What if I have a surgical emergency at 2 AM?",
    answer:
      "A: Carehub provides 24/7 support. Our on-duty nurses are trained in emergency protocols to stabilize patients and coordinate with emergency services.",
  },
];

const PostOperativeCare_details = () => {
  return (
    <>
      <section>
        <Container>
          <Row className="g-4">
            <Col lg={8}>
              <div className="service_img">
                <img src={PostOperativeCare} />
              </div>

              <div className="text-start pe-5" lg={8}>
                <h1 className="fs-3 fw-bold" style={{ color: "#012a4a" }}>
                  Post-Operative Care Services in Dubai: The Complete Guide to
                  Safe Recovery
                </h1>
                <h3 className="fs-6 fw-semibold">
                  Expert Post-Operative Care in Dubai: Accelerate Your Healing
                  in the Comfort of Home
                </h3>
                <p>
                  The hours and days following a surgical procedure are the most
                  critical for a patient’s long-term health. While modern
                  surgical techniques have advanced, the success of any
                  operation depends heavily on the quality of the recovery
                  period. At Carehub Healthcare, we understand that the
                  transition from a clinical hospital setting to the home can be
                  daunting for patients and their families. Our DHA-licensed
                  post-operative care in Dubai is designed to bridge this gap,
                  providing hospital-grade nursing supervision that ensures
                  safety, manages pain, and prevents the complications that
                  often lead to hospital readmission.
                </p>
                <p>
                  Unfortunately, a lot of individuals underestimate the
                  difficulties and risks associated with leaving the hospital.
                  Therefore, the in-home care team at Carehub Services has
                  created this brief guide to help you or a loved one close to
                  you decide whether or not post-hospital discharge care is the
                  correct choice
                </p>

                <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                  The Importance of Professional Post-Surgical Support
                </h4>
                <p>
                  For many, the goal is to return home as quickly as possible.
                  However, without professional oversight, simple recovery can
                  turn into a medical emergency.
                </p>

                <ul className="service_page_features_list">
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">
                        Reducing Readmission Rates:
                      </span>
                      Statistics show that professional home nursing
                      significantly reduces the likelihood of being readmitted
                      to the hospital due to infections or medication errors.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">
                        Infection Surveillance:
                      </span>{" "}
                      Our nurses are trained to spot the earliest signs of
                      surgical site infections (SSIs) that a non-medical family
                      member might overlook.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">
                        Psychological Comfort:
                      </span>{" "}
                      Recovery is faster when a patient is in a familiar
                      environment, surrounded by loved ones, but supported by a
                      clinical professional.
                    </p>
                  </li>
                </ul>

                <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                  Our Core Post-Operative Clinical Interventions Carehub
                </h4>
                <p>
                  {" "}
                  provides a multidisciplinary approach to recovery, covering
                  every aspect of the patient's physical and medical needs.
                </p>
                <h5 className="fs-6 fw-bold" style={{ color: "#012a4a" }}>
                  A. Advanced Wound & Incision Care The integrity of the
                  surgical site is our highest priority.
                </h5>

                <ul className="service_page_features_list">
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">
                        Sterile Dressing Changes:
                      </span>
                      We follow strict aseptic techniques to clean and dress
                      wounds, preventing bacterial contamination.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">Drainage Management:</span>{" "}
                      Expert monitoring and emptying of surgical drains (such as
                      Jackson-Pratt or Hemovac drains).
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">
                        Suture and Staple Removal:
                      </span>{" "}
                      Once the surgeon provides clearance, our licensed nurses
                      perform painless removal of clips or stitches at your
                      home.
                    </p>
                  </li>
                </ul>

                <h5 className="fs-6 fw-bold" style={{ color: "#012a4a" }}>
                  B. Medication & Pain Optimization Effective pain management is
                  essential for mobility and healing.
                </h5>

                <ul className="service_page_features_list">
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">IV Infusion Therapy:</span>
                      If oral medications are insufficient, our nurses can
                      administer intravenous pain relief and antibiotics.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">
                        Anticoagulation Therapy:
                      </span>{" "}
                      Post-surgery patients are at higher risk for DVT (Deep
                      Vein Thrombosis). We manage blood-thinning injections and
                      monitor for clotting symptoms.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">Nausea Management:</span>{" "}
                      Post-anesthesia nausea is common; we provide
                      pharmacological and lifestyle support to ensure patient
                      comfort.
                    </p>
                  </li>
                </ul>

                <h5 className="fs-6 fw-bold" style={{ color: "#012a4a" }}>
                  C. Mobility & Respiratory Therapy Staying stationary for too
                  long after surgery is dangerous.
                </h5>

                <ul className="service_page_features_list">
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">Early Ambulation:</span>
                      We assist patients in safe movement, from sitting up in
                      bed to walking, reducing the risk of pneumonia and blood
                      clots.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-semibold">
                      <span className="fw-semibold">
                        Deep Breathing Exercises:
                      </span>{" "}
                      Utilizing incentive spirometry to keep the lungs clear
                      after general anesthesia.
                    </p>
                  </li>
                </ul>

                <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                  Specialized Recovery Programs by Surgery Type
                </h4>
                <p>
                  Carehub tailors every care plan to the specific procedure the
                  patient underwent.
                </p>

                <ul className="service_page_features_list">
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">Orthopedic Recovery:</span>
                      Specialized support for hip replacements, knee surgeries,
                      and spinal procedures, focusing on mobility and physical
                      therapy coordination.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">Cardiac Post-Op:</span>{" "}
                      High-vigilance monitoring of vitals, heart rate, and
                      oxygen levels following bypass or valve surgeries.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">
                        Plastic & Aesthetic Surgery:
                      </span>{" "}
                      Discreet, high-end care for patients recovering from
                      cosmetic procedures, focusing on swelling reduction and
                      wound aesthetics.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">Bariatric Support:</span>{" "}
                      Nutritional guidance and monitoring for patients following
                      weight-loss surgery.
                    </p>
                  </li>
                </ul>

                <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                  The Carehub "Continuum of Care" Model
                </h4>
                <p>
                  We don't just provide a nurse; we provide a medical ecosystem.
                </p>

                <ul className="service_page_features_list">
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">Discharge Liaison:</span>
                      We coordinate with your hospital team before you leave to
                      ensure we have all orders and equipment ready.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">Home Setup:</span> We assist
                      in setting up medical beds, oxygen concentrators, or
                      monitoring devices in your bedroom.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">
                        24/7 Nursing Supervision:
                      </span>{" "}
                      Whether you need a morning visit or a live-in nurse for
                      the first week, our scheduling is flexible.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">Doctor Integration:</span>{" "}
                      If complications arise, our Doctor Home Visit team is on
                      standby to provide an immediate medical consultation.
                    </p>
                  </li>
                </ul>

                <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                  Why Carehub is Dubai’s Preferred Recovery Partner
                </h4>

                <ul className="service_page_features_list">
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">Licensed Authority:</span>
                      Every nurse is DHA-certified and has undergone specialized
                      post-surgical training.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">Cultural Sensitivity:</span>{" "}
                      We offer a diverse team of male and female nurses to
                      respect the privacy and cultural preferences of our
                      patients.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">
                        Detailed Documentation:
                      </span>{" "}
                      We maintain a daily clinical log that you can present to
                      your surgeon during follow-up visits.
                    </p>
                  </li>
                </ul>

                <ul className="service_page_features_list">
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">Comprehensive care:</span>{" "}
                      Carehub Services provides a wide range of home health care
                      services that are tailored to meet the unique needs of
                      each patient after hospitalization. This includes
                      everything from wound care and medication management to
                      physical therapy and occupational therapy.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">
                        Skilled and experienced staff:
                      </span>{" "}
                      Our team of nurses, therapists, and other healthcare
                      professionals are highly skilled and experienced in
                      providing post-hospitalization care. They are dedicated to
                      helping patients regain their strength and independence as
                      quickly and safely as possible.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">
                        Convenience and comfort:
                      </span>{" "}
                      With home health care services from Carehub healthcare
                      Services, patients can recover in the comfort of their own
                      home rather than in a hospital or nursing home. This can
                      be a more comfortable and less stressful option for many
                      people.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">
                        Coordination with other healthcare providers:
                      </span>{" "}
                      Our staff works closely with patients' physicians,
                      hospitals, and other healthcare providers to ensure that
                      all aspects of their care are coordinated and that their
                      recovery is on track.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">
                        Continuous monitoring:
                      </span>{" "}
                      Our staff will keep a watchful eye on the patient's
                      condition and report any changes or concerns to the
                      physician. They will also provide education and support to
                      the patient and their family so that they can manage their
                      care at home.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">Cost-effective:</span>{" "}
                      Getting post-hospitalization home health care services can
                      often be a more cost-effective option than staying in a
                      hospital or nursing home. It can also help to avoid
                      unnecessary readmissions to the hospital.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-normal">
                      <span className="fw-semibold">Quality care:</span> At
                      Carehub healthcare Services, we are committed to providing
                      high-quality care to our patients. Our staff is regularly
                      trained and updated with the latest techniques and
                      technologies to provide the best care possible.
                    </p>
                  </li>
                </ul>
              </div>
            </Col>
            <Col lg={4}>
              <OtherServices className="mb-4" />
              <BookAppointment currentService={"Post Operative Care"} />
            </Col>
          </Row>
          <div>
            <h2 className="fs-4 fw-bold">
              Benefits of Home Nursing vs. Extended Hospitalization
            </h2>
            <Table data={TableData} />
            <ServiceFAQ data={FAQData} />
          </div>
        </Container>
      </section>
    </>
  );
};

export default PostOperativeCare_details;
