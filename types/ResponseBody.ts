export type SuccessResponseBody<Data> = {
    success: true,
    data: Data,
    status: number
}

export type ErrorResponseBody = {
    success: false,
    error: {
        code: string,
        message: string,
        fields?: Record<string, string>
    },
    status: number
}

export type ResponseBody<Data> = SuccessResponseBody<Data> | ErrorResponseBody