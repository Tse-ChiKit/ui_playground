import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001/api", // your mock server port
  timeout: 5000,
});
