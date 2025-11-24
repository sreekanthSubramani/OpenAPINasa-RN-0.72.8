import axios from "axios";

export const axiosapi = axios.create({
    baseURL  : "http://localhost:1999",
    timeout : 50000,
    headers : {
        "Content-Type" : "application/json"
    }
})