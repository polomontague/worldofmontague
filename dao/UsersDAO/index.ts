import { User } from "@/types/User"
import { userBaseQuery } from "./userBaseQuery"

type CreateUserData = User & {
    email: string,
    password: string
}

export const UsersDAO = {
    createUser: async (data: CreateUserData) => {
        const result = await userBaseQuery().create({
            first_name: data.name.first,
            last_name: data.name.last,
            email: data.email,
            password: data.password
        })
    }
}