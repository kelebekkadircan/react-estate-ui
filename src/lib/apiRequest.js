import axios from "axios";

const apiRequest = axios.create({
    baseURL: "http://localhost:8810/api",
    withCredentials: true,
});

export default apiRequest;
