"use client";
import Accordion from "react-bootstrap/Accordion";
const ServiceFAQ = ({ data }) => {
  return (
    <div style={{ marginTop: "48px" }}>
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <h2 className="fs-3 fw-bold">Frequently Asked Questions</h2>
      </div>
      <Accordion defaultActiveKey="0">
        {data.map((faq) => {
          return (
            <Accordion.Item eventKey={faq.key}>
              <Accordion.Header>{faq.question}</Accordion.Header>
              <Accordion.Body>{faq.answer}</Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </div>
  );
};
export default ServiceFAQ;
