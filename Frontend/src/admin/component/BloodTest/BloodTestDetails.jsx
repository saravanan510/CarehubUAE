import { useState, useEffect } from "react";
import Header from "../Header/Header";
import { useParams } from "react-router";
import axios from "../../../utils/axios";
import { AiOutlineFilePdf } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const BloodTestDetails = () => {
  const [bloodTest, setBloodTest] = useState({});
  const [show, setShow] = useState(false);
  const [file, setFile] = useState();
  const { id } = useParams();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchTest = async () => {
    try {
      const response = await axios.get(`/api/bloodtests/${id}`);
      setBloodTest(response.data);
    } catch (error) {
      console.error("Failed to fetch service:", error);
    }
  };

  useEffect(() => {
    fetchTest();
  }, [id]);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("test", JSON.stringify(bloodTest));
    try {
      const uploadFile = await axios.post(
        "/api/bloodtests/uploadFile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setBloodTest(uploadFile.data);
    } catch (error) {
      console.log("failed to upload file", error);
    }
  };

  const handleUpdate = async (value) => {
    handleClose();
    const updateTest = { ...bloodTest };
    updateTest.status = value;
    try {
      const updateResponse = await axios.post(
        `/api/bloodtests/${id}`,
        updateTest
      );
      setBloodTest(updateResponse.data);
    } catch (error) {
      console.error("Failed to fetch service:", error);
    }
  };

  return (
    <div className="bloodtestdetails">
      <Header title={"Bloodtest Details"} />
      <div style={{ padding: "20px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h6>User Details </h6>

            <div>
              <p style={{ marginBottom: "6px" }}>
                UserName: <span>{bloodTest.fullName}</span>
              </p>
              <p style={{ marginBottom: "6px" }}>
                Email: <span>{bloodTest.email}</span>
              </p>
              <p style={{ marginBottom: "6px" }}>
                phoneNumber: <span>{bloodTest.phoneNumber}</span>
              </p>
            </div>
          </div>
          <div>
            <h6>Blood Test Details</h6>
            <div>
              <ul style={{ marginBottom: "6px" }}>
                {bloodTest?.tests?.map((test, i) => {
                  return <li key={i}>{test.name}</li>;
                })}
              </ul>
              <p style={{ marginBottom: "6px" }}>
                Date: <span>{bloodTest.date}</span>
              </p>
              <p style={{ marginBottom: "6px" }}>
                Time: <span>{bloodTest.time}</span>
              </p>
              <p style={{ marginBottom: "6px" }}>
                Amount:{" "}
                <span>
                  {bloodTest?.tests?.reduce((acc, cv) => {
                    return acc + cv.price;
                  }, 0)}{" "}
                  AED
                </span>
              </p>
              <p style={{ marginBottom: "6px" }}>
                Status:{" "}
                <span style={{ fontWeight: "500" }}>{bloodTest.status}</span>
              </p>
            </div>
          </div>

          <div
            style={{
              visibility: bloodTest.status === "Pending" ? "visible" : "hidden",
            }}
          >
            <button
              style={{
                padding: "6px 12px",
                borderRadius: "4px",
                background: "#009b45",
                color: "white",
                marginRight: "12px",
              }}
              onClick={() => {
                handleUpdate("Completed");
              }}
            >
              Complete
            </button>
            <button
              style={{
                padding: "6px 12px",
                borderRadius: "4px",
                background: "hsl(6, 78%, 57%)",
                color: "white",
                marginRight: "12px",
              }}
              onClick={() => {
                // handleUpdate("Canceled");
                handleShow();
              }}
            >
              Cancel
            </button>
          </div>
        </div>

        <div style={{ marginTop: "24px" }}>
          <h6>Upload Document</h6>
          <input
            type="file"
            name=""
            id=""
            className="fileInput"
            onChange={handleChange}
          />
          <button className="custom-button" onClick={handleUpload}>
            Upload
          </button>
        </div>
        <div className="appointment-files">
          {bloodTest.files?.map((file, index) => {
            return (
              <div className="file">
                <AiOutlineFilePdf style={{ color: "red" }} />
                <a
                  style={{ textDecoration: "none", color: "black" }}
                  href={`/files/${file}`}
                  download
                >
                  {file}
                </a>
              </div>
            );
          })}
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to cancel appointment?</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="success"
            onClick={() => {
              handleUpdate("Canceled");
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default BloodTestDetails;
