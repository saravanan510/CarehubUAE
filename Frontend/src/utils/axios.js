import axios from "axios";
const Axios = axios.create({
  baseURL: process.env.BACKEND_URL,
  // baseURL: "https://carehub-backend-l7gv.onrender.com/",
});

export default Axios;
