import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:7065/api" // change if needed
});

export default api;