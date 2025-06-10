import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import { useAuth } from "../../context/Context";
import Logo from "../../assets/carehub_logo.png";
const Login = () => {
  const { handleLoginContext } = useAuth();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [loginDetails, setLoginDetails] = useState({
    userName: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (loginDetails.userName && loginDetails.password) {
      setLoader(true);
      setError("");
      try {
        const loginResponse = await axios.post("api/user/login", loginDetails, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (loginResponse.data.status == 200) {
          setLoader(false);
          handleLoginContext({ loggedIn: true });
          navigate("/admin/services");
          setError("");
        } else {
          handleLoginContext({ loggedIn: false });
          setError("Incorrect email or password");
          setLoader(false);
        }
      } catch (error) {
        console.log("login error");
      }
    } else {
      setError("Email and Password is required");
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
        navigate("/admin/services");
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
            <div
              style={{
                textAlign: "center",
                marginBottom: "36px",
              }}
            >
              <img src={Logo} alt="carehub" height={"48px"} />
            </div>
            <div style={{ padding: "0px", marginBottom: "12px" }}>
              <label>User Email</label>
              <input
                type="text"
                className="custom-input"
                name="userName"
                required
                value={loginDetails.userName}
                onChange={handleChange}
              />
            </div>
            <div style={{ padding: "0px", marginBottom: "16px" }}>
              <label>Password</label>
              <input
                type="password"
                className="custom-input"
                name="password"
                required
                value={loginDetails.password}
                onChange={handleChange}
              />
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button className="custom-button" onClick={handleLogin}>
              {loader ? "Login..." : "Login"}
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
