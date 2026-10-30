"use client"
import NextLink from "next/link"
import styled, { css } from "styled-components"
import { usePathname } from "next/navigation"

export type Link = {
    href: string,
    label: string
}

type LinkBarProps = {
    links: Link[]
}

export const LinkBar = ({ links }: LinkBarProps) => {
    const pathname = usePathname()

    return (
        <Bar>
            {links.map(link => (
                <Item key={link.href}>
                    <StyledLink
                        href={link.href}
                        $selected={link.href === pathname}
                    >
                        {link.label}
                    </StyledLink>
                </Item>
            ))}
        </Bar>
    )
}

const Bar = styled.ul`
    --outer-spacing: calc(calc(var(--field-size) - var(--inner-field-size)) / 2);
    display: -webkit-flex;
    display: flex;
    gap: var(--spacing-small);
    width: 100%;
    height: var(--field-size);
    padding: var(--outer-spacing);
    margin: 0;
    background-color: var(--very-dark-grey);
    border: var(--border-width) solid var(--dark-grey);
    border-radius: var(--border-radius);
    list-style: none;
    list-style-type: none;
`

const Item = styled.li`
    display: -webkit-flex;
    display: flex;
    align-items: center;
    flex: 1;
`

const StyledLink = styled(NextLink)<{ $selected: boolean }>`
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: var(--inner-field-size);
    background-color: ${({ $selected }) => $selected ? "var(--white)" : "transparent"};
    border-radius: var(--border-radius);
    font-family: var(--serif);
    font-size: var(--button-font-size);
    color: ${({ $selected }) => $selected ? "var(--black)" : "var(--grey)"};
    text-decoration: none;
    text-transform: uppercase;
`