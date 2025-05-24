import React from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MdOutlineWaterDrop } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";
const TestCard = ({ test, handleAddTest, handleRemoveTest }) => {
  const [info, setInfo] = useState(false);
  const handleClick = () => {
    setInfo(!info);
  };
  const handleChange = (e) => {
    const checked = e.target.checked;
    if (checked) {
      handleAddTest(test.id);
    } else {
      handleRemoveTest(test.id);
    }
  };
  return (
    <>
      <div className="testCard">
        <Container>
          <Row>
            <Col lg={9} className="p-0">
              <div className="d-flex align-items-start">
                <MdOutlineWaterDrop
                  className="mt-1 fs-5"
                  style={{ color: "#009b45" }}
                />
                <div>
                  <p className="mb-0 ms-2">{test.name}</p>
                  <div className="ms-2 mt-1">
                    <p className="m-0">
                      <span
                        className="fw-semibold"
                        style={{ color: "#009b45" }}
                      >
                        AED {test.price}
                      </span>
                      <span className="border-start border-end px-2 mx-2">
                        {test.biomakersList.length}
                      </span>
                      <span>
                        Biomakers
                        <button onClick={handleClick} className="dropdown_btn">
                          {info ? (
                            <RiArrowDropUpLine className="fs-4" />
                          ) : (
                            <RiArrowDropDownLine className="fs-4" />
                          )}
                        </button>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={3} className="p-0">
              <div className="d-flex align-items-center justify-content-end">
                <span className="p-0 me-2">Add</span>
                <input
                  type="checkbox"
                  style={{ height: "16px", width: "16px" }}
                  onChange={handleChange}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {info && (
        <div className="biomarkers">
          <Container>
            <p className="fw-semibold">List of Biomarkers</p>
            <ul>
              {test.biomakersList.map((list) => {
                return <li>{list}</li>;
              })}
            </ul>
          </Container>
        </div>
      )}
    </>
  );
};

export default TestCard;
