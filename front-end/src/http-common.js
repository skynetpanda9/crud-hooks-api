import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3009/shipments",
  headers: {
    "Content-type": "application/json",
  },
});
