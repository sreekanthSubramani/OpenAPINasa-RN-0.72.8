import { SecureKeychain } from "../src/config/secureStorage";
import axios, { Axios } from "axios";

export const axiosapi = axios.create({
    baseURL  : "http://localhost:1999",
    timeout : 50000,
    headers : {
        "Content-Type" : "application/json"
    }
})


axiosapi.interceptors.request.use(
    async (config)=>{
        const accessToken = await SecureKeychain.getAccessToken()
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error)=> Promise.reject(error)
)


let isRefreshing = false
let failedQueue = []

axiosapi.interceptors.response.use(
    (response)=> response,

    async (error)=>{
        const originalRequest = error.config

        if(error.response?.status !== 401){
            return Promise.reject(error)
        }

        originalRequest._retry = true

        if(isRefreshing){
            return new Promise((resolve, reject)=>{
                failedQueue.push({resolve, reject})
            })
            .then((token)=>{
                originalRequest.headers.Authorization = `Bearer ${token}`
                return axiosapi(originalRequest)
            })
            .catch((err)=>{
                console.log(err, 'here is the problem')
            })
        }

        isRefreshing = true

        try{
            const getRefreshers = await SecureKeychain.getRefreshToken()

            if(!getRefreshers){
                throw new Error('No refresh token found')
            }

            const refreshTokenFromAPI = await axiosapi.post('/user/refreshtoken', {
                refresh : getRefreshers
            })

            const newAccessToken = refreshTokenFromAPI.data?.access
            const newRefreshToken = refreshTokenFromAPI.data?.refresh

            await SecureKeychain.saveAccessToken(newAccessToken)
            await SecureKeychain.saveRefreshToken(newRefreshToken)

            failedQueue.forEach((p)=> p.resolve(newAccessToken))
            failedQueue = []

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
            return axiosapi(originalRequest)


        }catch(e){
            console.log(e)

            failedQueue.forEach((p)=> p.reject(e))
            failedQueue = []
            return Promise.reject(e)
        } finally {
            isRefreshing = false
        }

    }
)



