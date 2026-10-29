import { UsersDAO } from "@/dao/UsersDAO"
import { HttpError } from "@/lib/HttpError"
import { Request } from "@/lib/Request"
import { Response } from "@/lib/Response"
import { registerBodySchema } from "@/schemas/auth"
import { NextRequest } from "next/server"
import { Auth } from "@/lib/Auth"
import { JWT } from "@/constants/JWT"

export const POST = async (req: NextRequest) => {
    try {
        const body = await Request.body(req, registerBodySchema)
        const users = await UsersDAO.getUsers({ email: body.email })
        if (users.length) throw new HttpError(Response.emailTaken()) // Validate that email is not already in database

        const hashedPassword = await Auth.hashPassword(body.password)
        const user = await UsersDAO.createUser({
            name: body.name,
            email: body.email,
            password: hashedPassword
        })
        const expires = JWT.LOGIN_EXPIRES
        const token = await Auth.signToken(user, expires)

        return Response.ok({
            user,
            token,
            type: "JWT",
            expires
        })
    } catch (err) {
        if (err instanceof HttpError) return err.response
        return Response.internalServerError()
    }
}