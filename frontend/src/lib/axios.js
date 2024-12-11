import axios from "axios"


export const axiosInstance = axios.create({
    baseURL:"http://localhost:1411/api",
    withCredentials:true
})