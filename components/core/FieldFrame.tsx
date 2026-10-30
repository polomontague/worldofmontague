import { ReactNode } from "react"
import styled from "styled-components"

type FieldFrameProps = {
    children: ReactNode
}

const Frame = styled.div`
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-small);
`

export const FieldFrame = ({ children }: FieldFrameProps) => {
    return (
        <Frame>
            {children}
        </Frame>
    )
}