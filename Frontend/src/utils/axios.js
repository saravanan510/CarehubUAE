import axios from "axios";

const Axios = axios.create({
  baseURL: "http://carehubuae.com/api",
});

export default Axios;
