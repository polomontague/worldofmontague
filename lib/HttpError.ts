import { NextResponse } from "next/server"

export class HttpError extends Error {
    response: NextResponse

    constructor(response: NextResponse) {
        super()
        this.response = response
    }
}