import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
const baseURL = `${process.env.NEXT_PUBLIC_API_BASE_URL}`
import { auth } from "@/app/lib/firebase/config";

const ihttp = axios.create({ // next auth
    baseURL,
})
const publicAPIs = [
    '/auth/login',
]

async function requestInterceptor(config: InternalAxiosRequestConfig) {
    const { url } = config
    const notPublicAPI = !publicAPIs.some((publicAPI) => url?.startsWith(publicAPI))
    if (notPublicAPI) {
        const idToken = await auth.currentUser?.getIdToken()
        if (!idToken) {
            alert("Missing access token")
            return Promise.reject("Missing access token");
        }
        config.headers.Authorization = `Bearer ${idToken}`
    }

    return config
}
async function responseInterceptor(value: AxiosResponse<any, any>) {
    return value
}
async function responseErrorInterceptor(error: AxiosError<any> | any) {
    // { response: { status }, code, ...err }
    const { response: { status }, code, ...err } = error
    const isNotWorkError = code == "ERR_NETWORK"
    // declare variable to identify all server error
    const internalError = status >= 500 && status < 600
    const clientError = status >= 400 && status < 500
    try {
        if (isNotWorkError) {
            alert(`Please check your internet connection`)

        } else if (internalError) {
            alert(`Please try again later`)
        }
    } catch {
        /** in case called from server ignore client side function*/
    }
    return Promise.reject(error);
}
ihttp.interceptors.request.use(requestInterceptor)
ihttp.interceptors.response.use(responseInterceptor, responseErrorInterceptor)
export default ihttp