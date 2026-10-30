"use client"
import { createContext, Dispatch, SetStateAction } from "react"
import { User } from "@/types/User"

export const UserContext = createContext<{
    user?: User,
    setUser: Dispatch<SetStateAction<User | undefined>>
}>({
    user: undefined,
    setUser: () => {}
})