import "./services.css";
import { AiOutlineFilePdf } from "react-icons/ai";

const ServiceDeatils = () => {
  return (
    <div className="serviceDetails">
      <div>
        <h6>User Details</h6>
        <div>
          <p>
            UserName: <span>Saravanan</span>
          </p>
          <p>
            Email: <span>saravanan5101998@gmail.com</span>
          </p>
          <p>
            phoneNumber: <span>9159549409</span>
          </p>
        </div>
      </div>
      <div>
        <h6>Appointment Details</h6>
        <div>
          <p>
            Service: <span>Elderly Care</span>
          </p>
          <p>
            Date: <span>2025-05-22</span>
          </p>
          <p>
            Status: <span>Pending</span>
          </p>
        </div>
      </div>
      <div>
        <h6>Upload Document</h6>
        <input type="file" name="" id="" />
      </div>
      <div className="appointment-files">
        <div className="file">
          <AiOutlineFilePdf style={{ color: "red" }} />
          <p>Elderly Care Appointment.pdf</p>
        </div>
      </div>
      <div className="appointment-files">
        <div className="file">
          <AiOutlineFilePdf style={{ color: "red" }} />
          <p>Elderly Care Appointment.pdf</p>
        </div>
      </div>
    </div>
  );
};
export default ServiceDeatils;
