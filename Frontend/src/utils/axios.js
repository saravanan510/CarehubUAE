import axios from "axios";
const Axios = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL: "https://carehub-backend-l7gv.onrender.com/",
});

export default Axios;
