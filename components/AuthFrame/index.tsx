import { ReactNode } from "react"
import styled from "styled-components"
import { LinkBar, Link } from "./LinkBar"
import { Logo } from "./Logo"
import { FieldFrame } from "../core/FieldFrame"

type AuthFrameProps = {
    links: Link[],
    children: ReactNode
}

export const AuthFrame = ({ links, children }: AuthFrameProps) => {
    return (
        <Frame>
            <Container>
                <Logo />
                <FieldFrame>
                    <LinkBar links={links} />
                    {children}
                </FieldFrame>
            </Container>
        </Frame>
    )
}

const Frame = styled.div`
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
`

const Container = styled.div`
    width: 100%;
    max-width: 300px;
`