"use client"
import { UserContext } from "@/contexts/UserContext"
import { useCookies } from "react-cookie"
import { API_ROUTES } from "@/constants/API_ROUTES"
import { useEffect, useState, ReactNode } from "react"
import { User } from "@/types/User"
import { API } from "@/lib/API"

type UserProviderProps = {
    children: ReactNode
}

export const UserProvider = (props: UserProviderProps) => {
    const [user, setUser] = useState<User | undefined>()
    const [cookies] = useCookies()

    useEffect(() => {
        if (cookies.token) {
            API.get<{ user: User }>({
                endpoint: API_ROUTES.AUTH.ME,
                authorize: true
            }).then(body => {
                if (body.success) {
                    setUser(body.data.user)
                }
            })
        } else {
            setUser(undefined)
        }
    }, [cookies.token])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {props.children}
        </UserContext.Provider>
    )
}