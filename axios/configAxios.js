import { SecureKeychain } from "../src/config/secureStorage";
import axios from "axios";

export const axiosapi = axios.create({
    baseURL  : "http://localhost:1999",
    timeout : 50000,
    headers : {
        "Content-Type" : "application/json"
    }
})


axiosapi.interceptors.request.use(
    async (config)=>{
        const getKey = await SecureKeychain.get()
        if(getKey?.token){
            config.headers.Authorization = `Bearer ${getKey.token}`
        }
        return config
    },
    (error)=> Promise.reject(error)
)


