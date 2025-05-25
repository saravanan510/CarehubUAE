import axios from "axios";

const Axios = axios.create({
  // baseURL: "http://carehubuae.com/api",
  baseURL: "http://localhost:5000",
});

export default Axios;
