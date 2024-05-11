import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000", // Your backend server URL
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  },
});

export default instance;
