import styled from "styled-components"
import Link from "next/link"

type SecondaryLinkButtonProps = {
    href: string,
    label: string
}

export const SecondaryLinkButton = ({ href, label }: SecondaryLinkButtonProps) => {
    return (
        <Button
            href={href}
        >
            {label}
        </Button>
    )
}

const Button = styled(Link)`
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: var(--field-size);
    background-color: var(--very-dark-grey);
    border: var(--border-width) solid var(--dark-grey);
    border-radius: var(--border-radius);
    font-family: var(--serif);
    font-size: var(--button-font-size);
    color: var(--grey);
    text-transform: uppercase;
    text-decoration: none;
`