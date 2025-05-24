import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FeatureIcon from "../assets/features.svg";
import VentilatorCare from "../assets/Ventilator_Service.webp";
import BookAppointment from "./BookAppointment";
import OtherServices from "./OtherServices";

const VentilatorCare_details = () => {
  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg={8}>
              <div className="service_img">
                <img src={VentilatorCare} />
              </div>

              <div className="text-start pe-5" lg={8}>
                <h2 className="fs-3 fw-bold" style={{ color: "#012a4a" }}>
                  Ventilator Care
                </h2>
                <p>
                  Ventilators at home were an anomaly until a few years ago. It
                  was thought of as risky and people believed that it was not a
                  medically safe decision to provide nursing care to a patient
                  on a ventilator at home. However, times have changed. Numerous
                  medical and healthcare services are now available in the
                  comfort of one’s home and nursing care for mechanical
                  ventilation is one of them. It is completely safe to keep a
                  patient on a ventilator at home if you are under the guidance
                  of the carehub healthcare service providers. With a little
                  training and practice, or assistance from professional nurses
                  and healthcare staff, it is possible for home care for
                  ventilator patients to be surrounded by family and loved ones
                  while receiving nursing care for mechanical ventilation
                </p>

                <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                  What Are the Benefits Of Nursing Ventilator Care?
                </h4>
                <p>
                  The benefits of a patient receiving nursing ventilator care at
                  home are numerous. Nursing care of a patient on a ventilator
                  at home ensures that the patient feels more safe, comfortable
                  and at ease compared to a hospital or healthcare facility.
                  Receiving nursing ventilator care at home ensures that the
                  patient is surrounded by loved ones and family, instead of in
                  a stressful and tense environment of a hospital among other
                  patients. At home, the patient experiences peace of mind and
                  there’s a high chance that the patient might recover faster at
                  home. Nursing ventilator care at home also reduces the risk of
                  the patient acquiring infections from the hospital. Home
                  ventilator care is much safer since the chances of catching an
                  infection from caregivers or family members are comparatively
                  low
                </p>
                <p>
                  The benefits can be further categorized into medical and
                  personal benefits.
                </p>
                <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                  Medical Benefits
                </h4>
                <ul className="service_page_features_list">
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-semibold">
                      Access to service of qualified, experienced and
                      internationally trained medical professionals right in the
                      comfort of your home
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-semibold">
                      Smooth flow of information between the team of doctors,
                      care staff and the family members
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-semibold">
                      Use of the latest technology and devices that ensures
                      wellbeing and care of the patient in their own home
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-semibold">
                      Strict adherence to standard protocols of critical care to
                      ensure the safety and wellbeing of the patient
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-semibold">
                      Continuous monitoring of the patient’s vitals and regular
                      administration of medication at home itself
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-semibold">
                      Faster recovery of patients due to patient satisfaction
                      and better compliance by medical professionals
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-semibold">
                      Reduced chances of secondary infections
                    </p>
                  </li>
                </ul>
                <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                  Personal Benefits
                </h4>
                <ul className="service_page_features_list">
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-semibold">
                      A comfortable home environment with less noise and less
                      night time light can improve sleep patterns and overall
                      well-being.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-semibold">
                      Limited or no restriction on visiting hours by friends,
                      family and relatives
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-semibold">
                      Easy and convenient access to personal space and
                      belongings such as books, computers, etc.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-semibold">
                      More cost effective and affordable as compared to the
                      hospital ICU
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-semibold">
                      Better management of patient’s needs and personalized care
                      and attention
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-semibold">
                      Reduced length of stay at the hospital and away from home
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-semibold">
                      Faster rehabilitation into normal life because of smoother
                      transition from hospital to home
                    </p>
                  </li>
                </ul>
                <p>
                  The critical care team at home can take care of all the
                  following tasks and the patient’s family can remain stress
                  free with the assurance that the patient is well taken care
                  of.
                </p>
                <ul className="service_page_features_list">
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-semibold">
                      Nursing care for ventilated patients with Tracheostomy
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-semibold">
                      Nursing ventilator care for patients who are on CPAP or
                      BiPAP and/or High Flow Oxygen Therapy
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-semibold">
                      Total parenteral nutrition
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-semibold">
                      Internal feeding
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-semibold">
                      Infusion therapy
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-semibold">
                      Bowel and bladder management
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-semibold">
                      Maintaining skin integrity
                    </p>
                  </li>
                </ul>
              </div>
            </Col>
            <Col lg={4}>
              <OtherServices className="mb-4" />
              <BookAppointment currentService={"Ventilator Care"} />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default VentilatorCare_details;
