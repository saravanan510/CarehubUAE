import axios from "axios";

const Axios = axios.create({
  baseURL: "https://api.carehubuae.com", // Use HTTPS in production
});

export default Axios;
