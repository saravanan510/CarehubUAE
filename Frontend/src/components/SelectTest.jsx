import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FiSearch } from "react-icons/fi";
import TestCard from "./TestCard";

const SelectTest = ({ tests, handleAddTest, handleRemoveTest }) => {
  const [search, setSearch] = useState("");
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <section className="selectTest">
        <Container>
          <Row>
            <Col className="header">
              <h2 className="fs-2 fw-bold">Select your test</h2>
              <div className="searchbox">
                <input
                  value={search}
                  onChange={handleChange}
                  type="text"
                  placeholder="Search by name ex. blood test"
                />
                <FiSearch className="fs-5" />
              </div>
            </Col>
          </Row>
          <Row>
            {tests
              .filter((test) => {
                return test.name.toLowerCase().includes(search.toLowerCase());
              })
              .map((test) => {
                return (
                  <Col key={test.id} lg={4} className="mb-3">
                    <TestCard
                      test={test}
                      handleAddTest={handleAddTest}
                      handleRemoveTest={handleRemoveTest}
                    />
                  </Col>
                );
              })}
          </Row>
        </Container>
      </section>
    </>
  );
};
export default SelectTest;
