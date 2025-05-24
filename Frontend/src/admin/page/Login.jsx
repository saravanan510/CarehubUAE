import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/dashboard");
  };
  return (
    <>
      <div>
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Row style={{ width: "360px" }}>
            <div style={{ padding: "0px", marginBottom: "12px" }}>
              <label>User Email</label>
              <input type="text" className="custom-input" />
            </div>
            <div style={{ padding: "0px", marginBottom: "16px" }}>
              <label>Password</label>
              <input type="text" className="custom-input" />
            </div>
            <button className="custom-button" onClick={handleLogin}>
              Login
            </button>
          </Row>
        </Container>
      </div>
    </>
  );
};
export default Login;
