"use client"
import { CookiesProvider as ReactCookieCookiesProvider } from "react-cookie"
import { ReactNode } from "react"

type CookiesProviderProps = {
    children: ReactNode
}

export const CookiesProvider = ({ children }: CookiesProviderProps) => {
    return (
        <ReactCookieCookiesProvider>
            {children}
        </ReactCookieCookiesProvider>
    )
}