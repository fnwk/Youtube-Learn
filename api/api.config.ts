import axios from "axios";

const REQ_TIMEOUT = 10000;
const REQ_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const apiClient = axios.create({
  baseURL: REQ_BASE_URL,
  timeout: REQ_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});
