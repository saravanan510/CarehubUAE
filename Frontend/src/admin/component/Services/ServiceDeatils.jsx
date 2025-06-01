import { useState, useEffect } from "react";
import "./services.css";
import { AiOutlineFilePdf } from "react-icons/ai";
import Header from "../Header/Header";
import { useParams } from "react-router";
import axios from "../../../utils/axios";

const ServiceDeatils = () => {
  const [service, setService] = useState({});

  const [file, setFile] = useState();
  const { id } = useParams();

  const fetchService = async () => {
    try {
      const response = await axios.get(`/api/services/${id}`);
      setService(response.data);
    } catch (error) {
      console.error("Failed to fetch service:", error);
      // Optionally set an error state here
    }
  };

  useEffect(() => {
    fetchService();
  }, [id]);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("service", JSON.stringify(service));
    try {
      const uploadFile = await axios.post(
        "/api/services/uploadFile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setService(uploadFile.data);
    } catch (error) {
      console.log("failed to upload file", error);
    }
  };
  const handleUpdate = async (value) => {
    const updateService = { ...service };
    updateService.status = value;
    try {
      const updateResponse = await axios.post(
        `/api/services/${id}`,
        updateService
      );
      setService(updateResponse.data);
    } catch (error) {
      console.error("Failed to fetch service:", error);
    }
  };

  return (
    <div className="serviceDetails">
      <Header title={"Service Details"} />
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
                UserName: <span>{service.fullName}</span>
              </p>
              <p style={{ marginBottom: "6px" }}>
                Email: <span>{service.email}</span>
              </p>
              <p style={{ marginBottom: "6px" }}>
                phoneNumber: <span>{service.phoneNumber}</span>
              </p>
            </div>
          </div>
          <div>
            <h6>Appointment Details</h6>
            <div>
              <p style={{ marginBottom: "6px" }}>
                Service: <span>{service.service}</span>
              </p>
              <p style={{ marginBottom: "6px" }}>
                Date: <span>{service.date}</span>
              </p>
              <p style={{ marginBottom: "6px" }}>
                Status:{" "}
                <span style={{ fontWeight: "500" }}>{service.status}</span>
              </p>
            </div>
          </div>

          <div
            style={{
              visibility: service.status === "Pending" ? "visible" : "hidden",
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
                handleUpdate("Canceled");
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
          {service.files?.map((file, index) => {
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
    </div>
  );
};
export default ServiceDeatils;
