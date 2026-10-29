import { Request } from "@/lib/Request"
import { Response } from "@/lib/Response"
import { Auth } from "@/lib/Auth"
import { NextRequest } from "next/server"
import { HttpError } from "@/lib/HttpError"
import { loginBodySchema } from "@/schemas/auth"
import { UsersDAO } from "@/dao/UsersDAO"
import { JWT } from "@/constants/JWT"

export const POST = async (req: NextRequest) => {
    try {
        const body = await Request.body(req, loginBodySchema)
        const users = await UsersDAO.getUsers({ email: body.email })
        const user = users.length ? users[0] : undefined
        if (!user) throw new HttpError(Response.incorrectCredentials())
        const password = (await UsersDAO.getPasswordByUserId(user.id))!
        if (!await Auth.comparePasswords({ raw: body.password, hashed: password })) throw new HttpError(Response.incorrectCredentials())
        
        const expires = JWT.LOGIN_EXPIRES
        const token = Auth.signToken(user, expires)

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