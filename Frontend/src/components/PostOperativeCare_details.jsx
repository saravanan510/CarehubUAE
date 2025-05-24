import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FeatureIcon from "../assets/features.svg";
import PostOperativeCare from "../assets/Post_Operative_Care.webp";
import BookAppointment from "./BookAppointment";
import OtherServices from "./OtherServices";

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
                <h2 className="fs-3 fw-bold" style={{ color: "#012a4a" }}>
                  Post Operative Care
                </h2>
                <p>
                  Anybody's life can be completely upended by a serious
                  sickness, accident, or other health incident. So it might be
                  easy to think of a loved one being released from the hospital
                  as the point at which everything returns to normal. Sadly,
                  this is frequently not the case. The month or months following
                  a hospital release reflect a high-risk period with frequent
                  hospital visits. Seniors returning from the hospital
                  frequently need assistance, including non-medical in-home
                  care.
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
                  Services
                </h4>

                <ul className="service_page_features_list">
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-semibold">
                      Comprehensive care: Carehub Services provides a wide range
                      of home health care services that are tailored to meet the
                      unique needs of each patient after hospitalization. This
                      includes everything from wound care and medication
                      management to physical therapy and occupational therapy.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-semibold">
                      Skilled and experienced staff: Our team of nurses,
                      therapists, and other healthcare professionals are highly
                      skilled and experienced in providing post-hospitalization
                      care. They are dedicated to helping patients regain their
                      strength and independence as quickly and safely as
                      possible.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-semibold">
                      Convenience and comfort: With home health care services
                      from Carehub healthcare Services, patients can recover in
                      the comfort of their own home rather than in a hospital or
                      nursing home. This can be a more comfortable and less
                      stressful option for many people.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-semibold">
                      Coordination with other healthcare providers: Our staff
                      works closely with patients' physicians, hospitals, and
                      other healthcare providers to ensure that all aspects of
                      their care are coordinated and that their recovery is on
                      track.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-semibold">
                      Continuous monitoring: Our staff will keep a watchful eye
                      on the patient's condition and report any changes or
                      concerns to the physician. They will also provide
                      education and support to the patient and their family so
                      that they can manage their care at home.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-semibold">
                      Cost-effective: Getting post-hospitalization home health
                      care services can often be a more cost-effective option
                      than staying in a hospital or nursing home. It can also
                      help to avoid unnecessary readmissions to the hospital.
                    </p>
                  </li>
                  <li>
                    <img src={FeatureIcon} className="me-2" />
                    <p className="service_feature m-0 fw-semibold">
                      Quality care: At Carehub healthcare Services, we are
                      committed to providing high-quality care to our patients.
                      Our staff is regularly trained and updated with the latest
                      techniques and technologies to provide the best care
                      possible.
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
        </Container>
      </section>
    </>
  );
};

export default PostOperativeCare_details;
