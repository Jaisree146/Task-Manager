import axios from "axios";
const taskapi = axios.create({
  baseURL: import.meta.env.VITE_TASK_API,
});
export default taskapi;