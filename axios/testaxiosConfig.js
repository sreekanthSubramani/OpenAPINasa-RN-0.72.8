import { axiosapi } from "./configAxios";
import { SecureKeychain } from "../src/config/secureStorage";

axiosapi.interceptors.request.use(
    async(config)=>{
        const accesskey = await SecureKeychain.getAccessToken()
        config.headers.Authorization = `Bearer ${accesskey}`
        return config
    },
    (error)=> Promise.reject(error)
)


let isRefreshing = false
const failedQueue = []

axiosapi.interceptors.response.use(
    (response)=> response,

    async(config)=>{
        const originalRequest = config.headers

        if(config.response?.status !== 401){
            throw new Error('Sorry it is 401 error !')
        }

        originalRequest._retry = true

        if(isRefreshing){
            return new Promise((resolve, reject)=>{
                failedQueue.push({resolve, reject})
            })
            .then((token)=>{
                originalRequest.headers.Authorization = `Bearer ${token}`
            })
            .catch((err)=> 
                Promise.reject(err)
            )
        }


        isRefreshing = true

        try{
            const refreshKey = await SecureKeychain.getRefreshToken()
            if(!refreshKey){
                throw new Error('No refresh key found !!')
            }

            const sendRequesttoVerify = await axiosapi.post('/user/refreshkey', {
                refresh : refreshKey
            })

            const data = sendRequesttoVerify?.data

            await SecureKeychain.saveAccessToken(data.access)
            await SecureKeychain.saveRefreshToken(data.refresh)

            failedQueue.forEach((p)=> p.resolve(data.access))
            failedQueue = []
            axiosapi(originalRequest)
        }catch(e){

            failedQueue.forEach((p)=> p.reject(e))
            failedQueue = []
            console.log(e)
        }finally{
            isRefreshing = false
        }

    }
)