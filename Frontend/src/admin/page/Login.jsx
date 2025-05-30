import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import { useAuth } from "../../context/Context";
const Login = () => {
  const { setAuth } = useAuth();
  const [loginDetails, setLoginDetails] = useState({
    userName: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const loginResponse = await axios.post("api/user/login", loginDetails, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("loginResponse", loginResponse);
      if (loginResponse.status == 200) {
        setAuth({ loggedIn: true });
        navigate("/dashboard");
      } else {
        setAuth({ loggedIn: false });
      }
    } catch (error) {
      console.log("login error");
    }
  };
  const handleRegister = async () => {
    try {
      const registerResponse = await axios.post(
        "api/user/register",
        loginDetails,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (registerResponse) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("registration error");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
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
              <input
                type="text"
                className="custom-input"
                name="userName"
                value={loginDetails.userName}
                onChange={handleChange}
              />
            </div>
            <div style={{ padding: "0px", marginBottom: "16px" }}>
              <label>Password</label>
              <input
                type="text"
                className="custom-input"
                name="password"
                value={loginDetails.password}
                onChange={handleChange}
              />
            </div>
            <button className="custom-button" onClick={handleLogin}>
              Login
            </button>
            {/* <button className="custom-button" onClick={handleRegister}>
              Register
            </button> */}
          </Row>
        </Container>
      </div>
    </>
  );
};
export default Login;
