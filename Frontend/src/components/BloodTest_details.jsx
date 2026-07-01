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
    title: "",
    value1: "Carehub Home Collection",
    value2: "Hospital / Clinic Lab",
  },
  {
    title: "Wait Time",
    value1: "Zero — you choose the appointment time",
    value2: "30 to 90 minutes typical",
  },
  {
    title: "Travel required",
    value1: "None",
    value2: "Yes — including parking and commuting",
  },
  {
    title: "Infection exposure",
    value1: "None — private, controlled environment",
    value2: "Elevated risk in crowded waiting rooms",
  },
  {
    title: "Fasting Tests",
    value1: "Ideal — nurse arrives before you've eaten",
    value2: "You must travel on an empty stomach",
  },
  {
    title: "Comfort",
    value1: "Your own sofa, bed, or desk",
    value2: "Clinical chairs in an unfamiliar setting",
  },
  {
    title: "Suitability for children",
    value1: "High — pediatric specialists available",
    value2: "Often stressful for young patients",
  },
  {
    title: "Result delivery",
    value1: "Secure WhatsApp or email delivery",
    value2: "Often requires in-person pickup or portal login",
  },
  {
    title: "Availability",
    value1: "24/7, including weekends and holidays",
    value2: "Typically limited to business hours",
  },
  {
    title: "Privacy",
    value1: "Complete discretion",
    value2: "Shared clinical environment",
  },
];
const FAQData = [
  {
    key: "0",
    question: "Q: Do I need a doctor's referral to book a home blood test?",
    answer:
      "A: Not for most tests. Many of our wellness panels — including CBC, vitamin profiles, thyroid tests, lipid panels, and HbA1c — can be booked directly without a referral. If you have a doctor's prescription, we'll follow it precisely. If you're self-referring, our team can help you identify the most relevant tests based on your health goals.",
  },
  {
    key: "1",
    question: "Q: Can I get a blood test at home for my child in Dubai?",
    answer:
      "A: Yes. We have phlebotomists with specialist pediatric training. They use butterfly needles, work slowly and gently, and are experienced at helping children feel relaxed before and during the draw. If your child has had a difficult experience with blood tests in clinics, our home environment — familiar, calm, and private — often makes a real difference.",
  },
  {
    key: "2",
    question: "Q: How should I prepare for a home blood test?",
    answer:
      "A: Preparation depends on the specific tests you've booked. For fasting tests (blood glucose, lipid profile, HbA1c), avoid eating or drinking anything except water for 8 to 12 hours before your appointment. For non-fasting tests, no special preparation is typically needed. We'll confirm any specific instructions when you book.",
  },
  {
    key: "3",
    question: "Q: How long does the home collection appointment take?",
    answer:
      "A: Most appointments are completed in 10 to 20 minutes from arrival. The blood draw itself takes only a few minutes — the rest of the time involves setup, documentation, and safe packaging of your sample.",
  },
  {
    key: "4",
    question:
      "Q: Are your blood test results accepted by Dubai hospitals and clinics?",
    answer:
      "A: Yes. Our partner laboratories are DHA-licensed and accredited. Their reports are issued in standard medical formats and are accepted by healthcare providers across the UAE.",
  },
  {
    key: "5",
    question:
      "Q: What if I need multiple tests? Can they all be done in one visit?",
    answer:
      "A: Absolutely. In most cases, all your required tests can be completed from a single blood draw. Our phlebotomist brings the appropriate tubes and equipment to collect what's needed in one sitting — you don't need multiple appointments.",
  },
  {
    key: "6",
    question: "Q: Is home blood testing available in all Dubai areas?",
    answer:
      "A: We cover all major residential and commercial areas across Dubai. This includes Downtown, Marina, Business Bay, Jumeirah, Al Barsha, Deira, Mirdif, Palm Jumeirah, Dubai Hills, and many more. Hotels and offices are also included. Contact us to confirm coverage for your specific location.",
  },
  {
    key: "7",
    question: "Q: Do you offer same-day results?",
    answer:
      "A: For many standard tests, yes. Turnaround time depends on the test type and the laboratory's processing schedule. Most reports are delivered within 12 to 24 hours; some standard panels are processed faster. If you require urgent results, let us know when booking and we'll do our best to prioritize..",
  },
  {
    key: "8",
    question:
      "Q: Is the blood test service available on weekends and public holidays?",
    answer:
      "A: Yes. Carehub operates 24 hours a day, 7 days a week — including Saturdays, Sundays, and UAE public holidays. We offer early morning slots specifically for patients who need fasting blood tests before work.",
  },
  {
    key: "9",
    question: "Q: How are my results delivered and are they confidential?",
    answer:
      "A: Your results are sent directly to you via WhatsApp or email — and only to you, unless you specify otherwise. We do not share patient data with third parties. All reports are issued in your name and can be saved digitally or printed as needed.",
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
            Book Your Home Blood Test
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
                Blood Test at Home in Dubai — Professional, Fast & Convenient
              </h1>
              <h5 class="fs-6 fw-bold">
                Carehub sends DHA-licensed phlebotomists to your door — home,
                office, or hotel — anywhere in Dubai. Get lab-accurate results
                in as little as 12 hours, without stepping outside.
              </h5>

              <p>
                Nobody's health journey should be complicated by traffic,
                queues, or a half-day wasted in a waiting room. Whether you're a
                busy professional managing your annual checkup, a parent getting
                routine tests done for your child, or someone monitoring a
                chronic condition from the comfort of home — Carehub makes blood
                testing in Dubai genuinely simple.
              </p>
              <p>
                Our blood test at home service in Dubai brings the diagnostic
                lab to your door. A certified, DHA-licensed phlebotomist arrives
                at your home, office, or hotel at your chosen time, collects
                your sample with care and precision, and your results are
                delivered digitally — usually within 12 to 24 hours.
              </p>
              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                No crowded clinics. No unnecessary exposure. No disruption to
                your day.
              </h4>

              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                Why Dubai Residents Are Switching To Home Blood Tests
              </h4>
              <h2 className="fs-5">
                Why More Dubai Residents Choose a Blood Test at Home
              </h2>

              <p>
                Dubai moves fast. Between work commitments, school runs, and the
                everyday pace of city life, finding time to visit a clinic for a
                blood test often gets pushed to "later." The problem is, later
                sometimes becomes never — and routine blood work is one of the
                most effective tools we have for catching health issues early.
              </p>
              <p>
                Home blood testing removes that friction entirely. You pick a
                time that works for you, our nurse arrives equipped with
                everything needed for a safe and sterile collection, and your
                samples go straight to an accredited laboratory. It's the same
                clinical accuracy you'd expect from a hospital lab, just without
                the journey or the wait.
              </p>
              <h5 class="fs-6 fw-bold" style={{ color: "#012a4a" }}>
                This convenience matters especially for:
              </h5>

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
                    <span className="fw-semibold">Elderly patients:</span> who
                    find clinic trips physically exhausting or difficult to
                    arrange
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
                    <span className="fw-semibold">Young children:</span>
                    who are anxious in clinical settings — our pediatric-trained
                    phlebotomists are skilled at gentle, low-stress draws
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
                    <span className="fw-semibold">
                      People with chronic conditions:
                    </span>
                    like diabetes, hypertension, or thyroid disorders who need
                    regular monitoring without repeated hospital visits
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
                    <span className="fw-semibold">Busy professionals:</span>
                    who can fit an early-morning fasting test into their
                    schedule without missing a beat at work
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
                    <span className="fw-semibold">
                      Postpartum mothers and individuals recovering from
                      surgery:
                    </span>
                    who can't or shouldn't be travelling unnecessarily
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
                    <span className="fw-semibold">
                      Residents who value privacy:
                    </span>
                    and prefer that their health monitoring stays discreet
                  </p>
                </li>
              </ul>

              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                What Makes Carehub Different
              </h4>
              <h2 className="fs-5">
                What Makes Carehub the Right Choice for Your Home Blood Test in
                Dubai
              </h2>
              <p>
                Dubai has several providers offering home blood collection — so
                what sets Carehub apart? It comes down to the details that
                matter most when your health is involved.
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
                    <span className="fw-semibold">
                      DHA-Licensed Professionals, Every Time:
                    </span>{" "}
                    Every phlebotomist on our team is licensed by the Dubai
                    Health Authority. This isn't a formality — it means they are
                    trained, evaluated, and accountable under UAE healthcare
                    regulations. Whether you're getting a routine CBC or a
                    specialized hormonal panel, your sample is collected by
                    someone who knows what they're doing.
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
                    <span className="fw-semibold">
                      Strict Hygiene and Sample Integrity:
                    </span>
                    We follow international-standard protocols for every
                    collection. Single-use, sterile equipment. Proper cold-chain
                    transport for samples that require temperature control.
                    Bio-hazard containers that meet DHA transport
                    specifications. From your arm to the laboratory, your sample
                    is handled as if the result depends on it — because it does.
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
                    <span className="fw-semibold">
                      Fast, Reliable Turnaround:
                    </span>
                    Waiting days for blood test results creates unnecessary
                    anxiety. Most of our reports are delivered digitally within
                    12 to 24 hours of sample collection. For urgent
                    investigations, we offer expedited processing — ask our team
                    when you book.
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
                    <span className="fw-semibold">
                      Complete Transparency on Pricing:
                    </span>
                    We don't believe in hidden charges. The price you're quoted
                    when you book is the price you pay. No surprise add-ons, no
                    collection surcharge sprung on you at the door.
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
                    <span className="fw-semibold">
                      24/7 Availability Across Dubai:
                    </span>
                    We operate around the clock, including weekends and public
                    holidays. Early-morning fasting blood tests, late-evening
                    collections after work — we fit around your life, not the
                    other way around.
                  </p>
                </li>
              </ul>

              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                Blood Tests Available At Home In Dubai
              </h4>
              <h2 className="fs-5">
                Blood Tests Available Through Our Dubai Home Collection Service
              </h2>
              <p>
                We support over 1,000 different laboratory investigations
                through accredited partner labs. Below are the most commonly
                requested categories and specific tests.
              </p>
              <h3 className="fs-3 fw-bold" style={{ color: "#012a4a" }}>
                Routine & Preventive Health Tests
              </h3>
              <p>
                These are the tests most doctors recommend as part of a regular
                annual health check. They give a broad picture of your overall
                health and flag abnormalities before they become problems.
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
                    <span className="fw-semibold">
                      Complete Blood Count (CBC/FBC):
                    </span>{" "}
                    Checks red blood cells, white blood cells, haemoglobin, and
                    platelets. Used to detect anaemia, infection, immune
                    disorders, and certain blood conditions. This is the single
                    most requested blood test in our home service in Dubai.
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
                    <span className="fw-semibold">
                      Fasting Blood Glucose & HbA1c:
                    </span>
                    Essential for diabetes screening and long-term blood sugar
                    control. Fasting tests are ideal for home collection — our
                    phlebotomist can arrive first thing in the morning before
                    breakfast, sparing you a hungry commute.
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
                    <span className="fw-semibold">Lipid Profile:</span>
                    Measures total cholesterol, LDL, HDL, and triglycerides.
                    Critical for assessing cardiovascular risk, particularly in
                    residents who follow higher-fat diets or have a family
                    history of heart disease.
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
                    <span className="fw-semibold">
                      Liver Function Tests (LFT):
                    </span>
                    Evaluate the health of the liver and help detect fatty liver
                    disease, hepatitis, or the effects of medications.
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
                    <span className="fw-semibold">
                      Kidney Function Tests (KFT / Renal Panel):
                    </span>
                    Creatinine, urea, and electrolyte levels to assess how well
                    your kidneys are filtering waste. Important for patients on
                    long-term medications or those with high blood pressure.
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
                    <span className="fw-semibold">Uric Acid Test:</span>
                    Particularly relevant in Dubai, where dietary patterns can
                    raise uric acid levels. Useful for gout monitoring and
                    kidney stone risk assessment.
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
                    <span className="fw-semibold">
                      ESR & CRP (Inflammatory Markers):
                    </span>
                    Used to detect underlying inflammation, which can signal
                    autoimmune conditions, infections, or other systemic issues.
                  </p>
                </li>
              </ul>

              <h3 className="fs-3 fw-bold" style={{ color: "#012a4a" }}>
                Vitamin & Nutritional Deficiency Tests at Home
              </h3>
              <p>
                Micronutrient deficiencies are surprisingly common in the UAE,
                driven by limited natural sun exposure, dietary habits, and
                indoor lifestyles. These home blood tests identify deficiencies
                before they become symptomatic.
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
                    <span className="fw-semibold">
                      Vitamin D Test at Home in Dubai:
                    </span>{" "}
                    One of our most frequently requested tests. Low Vitamin D is
                    widespread in Dubai despite the sunshine — because most
                    residents spend time indoors or protected from the sun.
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
                    <span className="fw-semibold">Vitamin B12 Test:</span>
                    B12 deficiency can cause fatigue, numbness, and neurological
                    issues. Particularly relevant for vegetarians, vegans, and
                    older adults.
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
                    <span className="fw-semibold">
                      Iron Studies (Ferritin, Serum Iron, TIBC):
                    </span>
                    Identifies iron-deficiency anaemia, which is especially
                    common in women and young children.
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
                    <span className="fw-semibold">
                      Calcium & Magnesium Levels:
                    </span>
                    Important for bone health, muscle function, and
                    cardiovascular regulation.
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
                    <span className="fw-semibold">
                      Full Micronutrient Panel:
                    </span>
                    A comprehensive screen covering multiple vitamins and
                    minerals in a single appointment.
                  </p>
                </li>
              </ul>

              <h3 className="fs-3 fw-bold" style={{ color: "#012a4a" }}>
                Hormone Tests at Home in Dubai
              </h3>
              <p>
                Hormonal imbalances affect energy, mood, weight, fertility, and
                a host of other functions. These tests are increasingly in
                demand for both men's and women's health.
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
                    <span className="fw-semibold">
                      Thyroid Profile (TSH, T3, T4):
                    </span>{" "}
                    Used to diagnose and monitor hypothyroidism and
                    hyperthyroidism. Thyroid disorders are among the most
                    underdiagnosed conditions in the UAE.
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
                    <span className="fw-semibold">
                      Female Hormone Panel (FSH, LH, Oestradiol, Progesterone,
                      Prolactin):
                    </span>
                    Helps evaluate fertility, menstrual irregularities,
                    menopause, and PCOS.
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
                    <span className="fw-semibold">Testosterone Test:</span>
                    For men experiencing fatigue, reduced libido, or unexplained
                    weight changes.
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
                    <span className="fw-semibold">Cortisol Test:</span>
                    Measures stress hormone levels to investigate adrenal
                    function.
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
                    <span className="fw-semibold">Insulin & HOMA-IR:</span>
                    Useful for assessing insulin resistance, especially in those
                    with pre-diabetes or PCOS.
                  </p>
                </li>
              </ul>

              <h3 className="fs-3 fw-bold" style={{ color: "#012a4a" }}>
                Chronic Disease Monitoring at Home
              </h3>
              <p>
                For patients managing ongoing health conditions, regular blood
                tests are not optional — they're essential. Our home service
                makes routine monitoring far less burdensome.{" "}
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
                    <span className="fw-semibold">
                      HbA1c (Glycated Haemoglobin):
                    </span>{" "}
                    The gold-standard marker for long-term diabetes control. We
                    recommend this every 3 to 6 months for diabetic patients.
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
                    <span className="fw-semibold">
                      eGFR & Creatinine for CKD Monitoring:
                    </span>
                    For patients on blood thinners like warfarin.
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
                    <span className="fw-semibold">
                      Full Cardiac Biomarker Panel:
                    </span>
                    Including NT-proBNP for patients with heart conditions.
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
                    <span className="fw-semibold">
                      Rheumatoid Factor & ANA for Autoimmune Screening:
                    </span>
                  </p>
                </li>
              </ul>

              <h3 className="fs-3 fw-bold" style={{ color: "#012a4a" }}>
                Specialized & Wellness Diagnostics
              </h3>

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
                    <span className="fw-semibold">
                      Food Intolerance & Allergy Testing:
                    </span>{" "}
                    Identify specific food triggers causing digestive
                    discomfort, skin conditions, or headaches.
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
                    <span className="fw-semibold">
                      STI / Infectious Disease Screening:
                    </span>
                    For patients on blood thinners like warfarin. Discreet,
                    confidential testing conducted in the privacy of your home.
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
                    <span className="fw-semibold">
                      Full Body Blood Test at Home in Dubai:
                    </span>
                    Our comprehensive wellness panel covering 60+ biomarkers —
                    an ideal annual health investment.
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
                    <span className="fw-semibold">
                      Pre-employment and Medical Fitness Tests:
                    </span>
                    Many Dubai employers require specific blood panels; we can
                    collect and process these at your convenience.
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
                    <span className="fw-semibold">Pediatric Blood Tests:</span>
                    Specially trained phlebotomists using butterfly needles for
                    children's comfort.
                  </p>
                </li>
              </ul>

              <h4 className="fs-5 fw-bold" style={{ color: "#012a4a" }}>
                HOW IT WORKS
              </h4>
              <h2 className="fs-5">
                How Our Home Blood Test Service in Dubai Works
              </h2>
              <p>
                Getting a blood test at home with Carehub is straightforward.
                Here's exactly what to expect from booking to receiving your
                results.{" "}
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
                    <span className="fw-semibold">
                      Step 1 — Book Online or on WhatsApp:
                    </span>{" "}
                    Contact us through our website booking form or WhatsApp.
                    Tell us which tests you need (or ask our team for guidance
                    if you're unsure), select your preferred date and time, and
                    confirm your location anywhere in Dubai.
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
                    <span className="fw-semibold">
                      Step 2 — Your Phlebotomist Arrives:
                    </span>
                    At your appointment time, a DHA-licensed phlebotomist
                    arrives at your door with a fully equipped,
                    temperature-controlled medical kit. They carry sterile,
                    single-use equipment and will go through a brief
                    pre-collection checklist with you.
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
                    <span className="fw-semibold">
                      Step 3 — Safe, Comfortable Sample Collection
                    </span>
                    The blood draw itself typically takes just a few minutes.
                    Our team is trained to make the experience as quick and
                    painless as possible. If you're nervous, let them know —
                    they work at your pace.
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
                    <span className="fw-semibold">
                      Step 4 — Secure Transport to an Accredited Lab:
                    </span>
                    Your sample is carefully labelled, sealed in appropriate
                    containers, and transported to one of our DHA-approved
                    partner laboratories. Temperature-sensitive samples are
                    carried in refrigerated kits to maintain integrity.
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
                    <span className="fw-semibold">
                      Step 5 — Results Delivered to You Digitally:
                    </span>
                    Your lab report arrives via WhatsApp or email — usually
                    within 12 to 24 hours. Reports are clearly formatted and
                    include reference ranges so you can understand your results.
                    If you'd like a doctor to walk you through the findings, we
                    can arrange that too.
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
                  <Image
                    src={FeatureIcon}
                    alt="Feature icon"
                    className="me-2"
                    width={16}
                    height={16}
                  />
                  <p className="service_feature m-0 fw-normal">
                    <span className="fw-semibold">Seamless Booking:</span>{" "}
                    Contact us via WhatsApp or our website to book your
                    preferred time slot.
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
                    <span className="fw-semibold">
                      Professional Collection:
                    </span>
                    Our phlebotomist arrives with a temperature-controlled
                    medical kit to collect your sample.
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
                    <span className="fw-semibold">Secure Transportation:</span>
                    Samples are transported in specialized bio-hazard containers
                    to maintain stability.
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
                    <span className="fw-semibold">
                      Accredited Lab Analysis:
                    </span>
                    Processing is done at leading, DHA-approved laboratories.
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
                  <Image
                    src={FeatureIcon}
                    alt="Feature icon"
                    className="me-2"
                    width={16}
                    height={16}
                  />
                  <p className="service_feature m-0 fw-semibold">
                    24x7 Diagnostic Test at Home in Dubai
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
                  <p className="service_feature m-0 fw-semibold">
                    Trusted, certified labs for accurate results
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
                  <p className="service_feature m-0 fw-semibold">
                    Quick, painless sample collection
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
            Home Blood Test vs. Clinic Visit — Which Is Right for You?
          </h2>
          <Table data={TableData} />
          <ServiceFAQ data={FAQData} />
        </div>
      </Container>
    </section>
  );
};

export default BloodTest_details;
