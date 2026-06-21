import axios from "axios";
const authapi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API,
});
export default authapi;
