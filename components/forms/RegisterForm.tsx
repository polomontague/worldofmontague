"use client"
import { useState, useEffect, useContext } from "react"
import Form from "../core/Form"
import { TextInput } from "../core/TextInput"
import { PasswordInput } from "../core/PasswordInput"
import { FieldFrame } from "../core/FieldFrame"
import { Button } from "../core/Button"
import { FieldGroup } from "../core/FieldGroup"
import { Validation } from "@/lib/Validation"
import { Alert } from "../core/Alert"
import { API } from "@/lib/API"
import { User } from "@/types/User"
import { API_ROUTES } from "@/constants/API_ROUTES"
import { UserContext } from "@/contexts/UserContext"
import { useCookies } from "react-cookie"

export const RegisterForm = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [submitDisabled, setSubmitDisabled] = useState(true)
    const [loading, setLoading] = useState(false)
    const { setUser } = useContext(UserContext)
    const [cookies, setCookie] = useCookies()

    useEffect(() => {
        setSubmitDisabled(!validate())
    }, [firstName, lastName, email, password, confirmPassword])

    const validate = (): boolean => {
        let valid = true
        if (!firstName) valid = false
        if (!lastName) valid = false
        if (!Validation.email(email)) valid = false
        if (!Validation.password(password)) valid = false
        if (password !== confirmPassword) valid = false
        return valid
    }

    const handleSubmit = () => {
        setLoading(true)
        API.post<{ user: User, token: string, type: string, expires: number }>({
            endpoint: API_ROUTES.AUTH.REGISTER,
            body: {
                name: {
                    first: firstName,
                    last: lastName
                },
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
                <FieldGroup label="Name">
                    <TextInput borderless placeholder="First Name..." value={firstName} onChange={setFirstName} />
                    <TextInput borderless placeholder="Last Name..." value={lastName} onChange={setLastName} />
                </FieldGroup>
                <TextInput placeholder="Email..." value={email} onChange={setEmail} />
                <FieldGroup label="Password">
                    <PasswordInput borderless placeholder="Password..." value={password} onChange={setPassword} />
                    <PasswordInput borderless placeholder="Confirm Password..." value={confirmPassword} onChange={setConfirmPassword} />
                </FieldGroup>
                <Button label="Join" disabled={submitDisabled} loading={loading} />
            </FieldFrame>
            <Alert
                open={Boolean(error)}
                message={error}
                onRequestClose={() => setError("")}
            />
        </Form>
    )
}