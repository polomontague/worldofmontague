import { AuthFrame } from "@/components/AuthFrame"
import { ROUTES } from "@/constants/ROUTES"
import { ReactNode } from "react"

type AuthLayoutProps = {
    children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <AuthFrame
            links={[
                { href: ROUTES.AUTH.LOGIN, label: "Login" },
                { href: ROUTES.AUTH.REGISTER, label: "Join" }
            ]}
        >
            {children}
        </AuthFrame>
    )
}