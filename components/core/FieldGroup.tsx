import { ReactNode } from "react"
import styled from "styled-components"

type FieldsetProps = {
    label: string,
    description?: string,
    children: ReactNode
}

export const FieldGroup = ({ label, description, children }: FieldsetProps) => {
    return (
        <Frame>
            <Label>{label}</Label>
            <Group>
                {children}
            </Group>
            {description ? (
                <Description>{description}</Description>
            ) : null}
        </Frame>
    )
}

const Frame = styled.div`
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-very-small);
`

const Label = styled.p`
    padding-left: var(--spacing-small);
    margin: 0;
    font-family: var(--condensed);
    font-size: var(--font-size-small);
    color: var(--grey);
    text-transform: uppercase;
    line-height: normal;
`

const Group = styled.div`
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    gap: var(--border-width);
    background-color: var(--dark-grey);
    border: var(--border-width) solid var(--dark-grey);
    border-radius: var(--border-radius);
`

const Description = styled.p`
    padding: 0;
    padding-left: var(--spacing-medium);
    margin: 0;
    font-family: var(--serif);
    font-size: var(--font-size-small);
    color: var(--grey);
`