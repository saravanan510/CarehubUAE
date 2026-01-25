import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FeatureIcon from "../assets/features.svg";
import Injection_Service from "../assets/Injection_service.webp";
import BookAppointment from "./BookAppointment";
import OtherServices from "./OtherServices";
import Table from "./Table";
import ServiceFAQ from "./ServiceFAQ";
const TableData = [
  {
    title: "Feature",
    value1: "Injection at Home (Our Service)",
    value2: "Traditional Clinic Visit",
  },
  {
    title: "Convenience",
    value1: "No travel or waiting time required.",
    value2: "Requires commuting and waiting rooms.",
  },
  {
    title: "Safety",
    value1: "Zero exposure to hospital-acquired infections.",
    value2: "Potential exposure to other ill patients.",
  },
  {
    title: "Comfort",
    value1: "Personalized care in a familiar environment.",
    value2: "Clinical and often stressful setting.",
  },
  {
    title: "Privacy",
    value1: "100% discrete and private.",
    value2: "Public waiting areas.",
  },
];

const FAQData = [
  {
    key: "0",
    question:
      "Q: Are your nurses licensed by the Dubai Health Authority (DHA)?",
    answer:
      "A: Absolutely. All our practitioners are fully DHA-licensed and have extensive experience in clinical nursing and emergency response.",
  },
  {
    key: "1",
    question: "Q: How quickly can a nurse arrive at my home in Dubai?",
    answer:
      "A: We offer flexible scheduling. In many cases, we can arrange for a nurse to be at your location within a few hours of booking, depending on your area in Dubai.",
  },
  {
    key: "2",
    question: "Q: Can you administer injections to children and infants?",
    answer:
      "A: Yes, our team includes nurses specialized in pediatric care who are trained to provide a calm and painless experience for our younger patients.",
  },
];
const InjectionServices_details = () => {
  return (
    <section>
      <Container>
        <Row className="g-4">
          <Col lg={8}>
            <div className="service_img">
              <img src={Injection_Service} />
            </div>

            <div className="text-start pe-5" lg={8}>
              <h1 className="fs-6 fw-semibold">
                Expert Injection at Home Service in Dubai: Safe, Professional,
                and Convenient
              </h1>
              <p>
                Skip the long hospital queues and the stress of traffic. Our
                Injection at Home service in Dubai brings professional clinical
                care directly to your doorstep. Whether it is a routine vitamin
                boost, prescribed medication, or a vital vaccination, our
                DHA-licensed nurses ensure you receive your treatment in the
                comfort and privacy of your own home.
              </p>
              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                Service Overview: Clinical Excellence in Your Living Room
              </h4>
              <p>
                Administering injections requires precision, sterile techniques,
                and professional expertise. Many patients in Dubai find it
                challenging to visit a clinic regularly for their prescribed
                doses, especially those with mobility issues, busy schedules, or
                young children.
              </p>
              <p>
                Our service is designed to bridge this gap. We provide a wide
                range of injection services, ensuring that every procedure is
                conducted following strict Dubai Health Authority (DHA)
                protocols. From intramuscular (IM) to subcutaneous (SC) and
                intravenous (IV) administration, we prioritize your health and
                comfort above all else.
              </p>
              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                Our Comprehensive Injection Services
              </h4>
              <p>
                Our team is equipped to handle various medical and wellness
                requirements, including:
              </p>
              <ul className="service_page_features_list">
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">Prescribed Medications:</span>{" "}
                     Reliable administration of antibiotics, anticoagulants, or
                    hormonal treatments as per your doctor's prescription.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">
                      Vitamin & Wellness Drips:
                    </span>{" "}
                    Save Boost your immunity and energy levels with specialized
                    IV drips and Vitamin B12 injections.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">Vaccinations:</span>
                    Convenient home immunization for children, adults, and
                    travelers.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">Diabetes Management:</span>{" "}
                    Expert assistance with insulin administration and glucose
                    monitoring.
                  </p>
                </li>
                <li>
                  <img src={FeatureIcon} className="me-2" />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">Post-Operative Care:</span>{" "}
                    Essential injections required during the recovery phase
                    after surgery.
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
                    <span className="fw-semibold">Quick Booking:</span>
                    Contact us via phone or WhatsApp to schedule a time that
                    suits your lifestyle.
                  </p>
                </li>

                <li>
                  <img src={FeatureIcon} className="me-2" /> 
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">Professional Arrival:</span> 
                    A DHA-licensed nurse arrives at your Dubai residence
                    equipped with all necessary sterile supplies.    
                  </p>
                </li>

                <li>
                  <img src={FeatureIcon} className="me-2" /> 
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">Safe Administration:</span>   
                    After verifying your prescription, the nurse administers the
                    injection and monitors you for any immediate reactions to
                    ensure total safety.
                  </p>
                </li>
              </ul>
              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                Key Benefits
              </h4>
              <ul className="service_page_features_list">
                <li>
                  <img src={FeatureIcon} className="me-2" /> 
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">Convenience:</span> Skip long
                    hospital waits and avoid crowded spaces.
                  </p>
                </li>

                <li>
                  <img src={FeatureIcon} className="me-2" /> 
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">Cost-Effective:</span> Save  
                    money on transportation and parking fees.
                  </p>
                </li>

                <li>
                  <img src={FeatureIcon} className="me-2" /> 
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">Safety & Comfort:</span> Stay
                    protected at home, especially if mobility or time is a
                    concern.
                  </p>
                </li>

                <li>
                  <img src={FeatureIcon} className="me-2" /> 
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">Quality Care:</span>
                    Experienced medical professionals ensure safe, hygienic, and
                    expert care.
                  </p>
                </li>
              </ul>
              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                Why Choose Injection Services in Dubai?
              </h4>

              <p>
                Ideal for busy professionals, seniors, or anyone seeking
                hassle-free healthcare, our Injection at Home Service in Dubai
                offers affordable pricing and flexible scheduling. Whether
                routine treatments or specialized medical needs, we deliver
                reliable care tailored to your requirements.
              </p>

              <p>
                Book today and experience stress-free, high-quality Medical
                Injection Services Dubai from the comfort of your home!
              </p>
            </div>
          </Col>
          <Col lg={4}>
            <OtherServices className="mb-4" />
            <BookAppointment currentService={"Injection Services"} />
          </Col>
        </Row>
        <div>
          <h2 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
            Comparison: Home Injection vs. Clinic Visit
          </h2>

          <p>
            Understanding why more residents are choosing home-based clinical
            services:
          </p>
          <Table data={TableData} />
          <ServiceFAQ data={FAQData} />
        </div>
      </Container>
    </section>
  );
};

export default InjectionServices_details;
