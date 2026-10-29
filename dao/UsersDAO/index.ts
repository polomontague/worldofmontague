import { User } from "@/types/User"
import { userBaseQuery } from "./userBaseQuery"
import { assembleUser } from "./assembleUser"
import { db } from "@/prisma/db"

type CreateUserData = Omit<User, "id"> & {
    email: string,
    password: string
}

type GetUsersOptions = {
    email?: string
}

export const UsersDAO = {
    createUser: async (data: CreateUserData): Promise<User> => {
        const result = await userBaseQuery().create({
            first_name: data.name.first,
            last_name: data.name.last,
            email: data.email,
            password: data.password
        })
        return assembleUser(result)
    },
    getUsers: async (options: GetUsersOptions): Promise<User[]> => {
        const results = await userBaseQuery().where({
            email: options.email
        }).all()
        return results.map(result => assembleUser(result))
    },
    getUserById: async (userId: number): Promise<User | undefined> => {
        const result = await userBaseQuery().where({
            id: userId
        }).first()
        return result ? assembleUser(result) : undefined
    },
    getPasswordByUserId: async (userId: number): Promise<string | undefined> => {
        const result = await db.orm.public.User.select("password").where({
            id: userId
        }).first()
        if (!result) return undefined
        return result.password
    }
}