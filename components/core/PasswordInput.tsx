"use client"
import styled from "styled-components"
import { useState } from "react"

type PasswordInputProps = {
    borderless?: boolean,
    placeholder: string,
    value: string,
    onChange: (value: string) => void
}

export const PasswordInput = ({ borderless, placeholder, value, onChange }: PasswordInputProps) => {
    const [showing, setShowing] = useState(false)

    return (
        <ScaleWrapper $borderless={borderless ?? false}>
            <Input
                type={showing ? "text" : "password"}
                placeholder={placeholder}
                value={value}
                onChange={(evt) => onChange(evt.target.value)}
            />
            <Button
                type="button"
                onClick={() => setShowing(!showing)}
            >
                {showing ? "Hide" : "Show"}
            </Button>
        </ScaleWrapper>
    )
}

const ScaleWrapper = styled.div<{ $borderless: boolean }>`
    width: 100%;
    height: var(--field-size);
    background-color: var(--very-dark-grey);
    border: ${({ $borderless }) => $borderless ? "none" : "var(--border-width) solid var(--dark-grey)"};
    border-radius: ${({ $borderless }) => $borderless ? "0" : "var(--border-radius)"};
    position: relative;
`

const Input = styled.input`
    display: -webkit-flex;
    display: flex;
    align-items: center;
    width: var(--scaled-width-and-height);
    height: var(--scaled-width-and-height);
    padding: 0 var(--scaled-spacing-medium) 0 var(--scaled-spacing-medium);
    background-color: transparent;
    border: none;
    border-radius: 0;
    outline: none;
    font-family: var(--serif);
    font-size: 16px;
    color: var(--white);
    transform: scale(var(--scale));
    transform-origin: top left;

    &::placeholder {
        color: var(--grey);
        opacity: 1; /* Firefox */
    }

    &::-ms-input-placeholder { /* Edge 12 -18 */
        color: var(--grey);
    }

    &:-webkit-autofill { /* Chrome, Safari, Edge */
        -webkit-box-shadow: 0 0 0 1000px var(--very-dark-grey) inset;
        box-shadow: 0 0 0 1000px var(--very-dark-grey) inset;
        -webkit-text-fill-color: var(--white);
        caret-color: var(--white);
    }
`

const Button = styled.button`
    display: -webkit-flex;
    display: flex;
    height: 100%;
    padding: 0 var(--spacing-medium) 0 var(--spacing-medium);
    background-color: transparent;
    border: none;
    border-radius: 0;
    outline: none;
    font-family: var(--serif);
    font-size: var(--font-size);
    color: var(--white);
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
`