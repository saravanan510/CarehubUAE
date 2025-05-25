import axios from "axios";

const Axios = axios.create({
  // baseURL: "http://carehubuae.com/api",
  // baseURL: "http://localhost:5000",
  baseURL: "http://147.93.110.142:5000",
});

export default Axios;
