import axios from "axios"
import Cookies from "universal-cookie"
import { ResponseBody, ErrorResponseBody } from "@/types/ResponseBody"

export const API = {
    post: async <Data>({ endpoint, body, authorize }: {
        endpoint: string,
        body: Body,
        authorize?: boolean
    }): Promise<ResponseBody<Data>> => {
        return sendRequest<Data>({
            method: "post",
            endpoint,
            body,
            authorize
        })
    },
    get: async <Data>({ endpoint, authorize }: {
        endpoint: string,
        authorize?: boolean
    }): Promise<ResponseBody<Data>> => {
        return sendRequest<Data>({
            method: "get",
            endpoint,
            authorize
        })
    },
    put: async <Data>({ endpoint, body, authorize }: {
        endpoint: string,
        body: Body,
        authorize?: boolean
    }): Promise<ResponseBody<Data>> => {
        return sendRequest<Data>({
            method: "put",
            endpoint,
            body,
            authorize
        })
    },
    delete: async <Data>({ endpoint, authorize }: {
        endpoint: string,
        authorize?: boolean
    }) : Promise<ResponseBody<Data>> => {
        return sendRequest<Data>({
            method: "delete",
            endpoint,
            authorize
        })
    }
}

const cookies = new Cookies()

type Method = "post" | "get" | "put" | "delete"
type Body = Record<string, any>
type SendRequestOptions = {
    method: Method,
    endpoint: string,
    body?: Body,
    authorize?: boolean
}

const sendRequest = async <Data>({ method, endpoint, body, authorize }: SendRequestOptions): Promise<ResponseBody<Data>> => {
    try {
        const query = new URLSearchParams(window.location.search)
        const token = cookies.get("token") || query.get("token")
        if (authorize && !token) {
            window.location.href = "/login"
        }
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`
        const config = {
            headers: {
                Authorization: authorize && cookies.get("token") ? `Bearer ${cookies.get("token")}`
                    : authorize && query.get("token") ? `Bearer ${query.get("token")}` : undefined
            }
        }
        const res = method === "post" || method === "put" ? await axios[method](url, body, config)
            : await axios[method](url, config)
        return res.data
    } catch (err: unknown) {
        if (axios.isAxiosError<ErrorResponseBody>(err)) {
            if (err.response?.data?.success === false) return err.response.data
            return {
                success: false,
                error: {
                    code: err.response ? "REQUEST_FAILED" : "NETWORK_ERROR",
                    message: err.response ? "Request Failed" : "Network Error"
                },
                status: err.response?.status ?? 0
            }
        }
        throw err
    }
}