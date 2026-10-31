"use client"
import { useState, useEffect, useContext } from "react"
import { TextInput } from "@/components/core/TextInput"
import Form from "@/components/core/Form"
import { PasswordInput } from "@/components/core/PasswordInput"
import { FieldFrame } from "@/components/core/FieldFrame"
import { Button } from "@/components/core/Button"
import { Validation } from "@/lib/Validation"
import { API_ROUTES } from "@/constants/API_ROUTES"
import { Alert } from "../core/Alert"
import { useCookies } from "react-cookie"
import { UserContext } from "@/contexts/UserContext"
import { API } from "@/lib/API"
import { User } from "@/types/User"

export const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [submitDisabled, setSubmitDisabled] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [cookies, setCookie] = useCookies()
    const { setUser } = useContext(UserContext)

    useEffect(() => {
        setSubmitDisabled(!validate())
    }, [email, password])

    const validate = (): boolean => {
        let valid = true
        if (!Validation.email(email)) valid = false
        if (!Validation.password(password)) valid = false
        return valid
    }

    const handleSubmit = () => {
        setLoading(true)
        API.post<{ user: User, token: string, type: string, expires: number }>({
            endpoint: API_ROUTES.AUTH.LOGIN,
            body: {
                email,
                password
            }
        }).then(body => {
            setLoading(false)
            if (body.success) {
                setUser(body.data.user)
                setCookie("token", body.data.token, {
                    path: "/",
                    expires: new Date(new Date().getTime() + (body.data.expires * 1000)),
                    sameSite: "strict",
                    secure: process.env.NODE_ENV === "production",
                    httpOnly: false,
                })
            } else {
                setError(body.error.message)
            }
        })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FieldFrame>
                <TextInput placeholder="Email..." value={email} onChange={setEmail} />
                <PasswordInput placeholder="Password..." value={password} onChange={setPassword} />
                <Button label="Login" disabled={submitDisabled} loading={loading} />
            </FieldFrame>
            <Alert
                open={Boolean(error)}
                message={error}
                onRequestClose={() => setError("")}
            />
        </Form>
    )
}