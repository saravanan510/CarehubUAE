import axios from "axios";

const Axios = axios.create({
  baseURL: "https://api.carehubuae.com",
  // baseURL: "http://localhost:5000",
});

export default Axios;
