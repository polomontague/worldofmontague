"use client"
import styled from "styled-components"

type TextInputProps = {
    borderless?: boolean,
    placeholder: string,
    value: string,
    onChange: (value: string) => void
}

export const TextInput = ({ borderless, placeholder, value, onChange }: TextInputProps) => {
    return (
        <ScaleWrapper $borderless={borderless ?? false}>
            <Input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(evt) => onChange(evt.target.value)}
            />
        </ScaleWrapper>
    )
}

const ScaleWrapper = styled.div<{ $borderless: boolean }>`
    width: 100%;
    height: var(--field-size);
    background-color: var(--very-dark-grey);
    border: ${({ $borderless }) => $borderless ? "none" : "var(--border-width) solid var(--dark-grey)"};
    border-radius: ${({ $borderless }) => $borderless ? "0" : "var(--border-radius)"};
`

const Input = styled.input`
    display: -webkit-flex;
    display: flex;
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
    align-items: center;

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