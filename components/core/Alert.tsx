"use client"
import { ReactElement } from "react"
import styled from "styled-components"

type AlertProps = {
    open: boolean,
    message: string,
    onRequestClose: () => void
}

export const Alert = ({ open, message, onRequestClose }: AlertProps) => {
    if (!open) return

    return (
        <Overlay>
            <Window>
                <Message>
                    {message}
                </Message>
                <Button
                    onClick={() => onRequestClose()}
                >
                    Close
                </Button>
            </Window>
        </Overlay>
    )
}

const Overlay = styled.div`
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--black-translucent);
    backdrop-filter: blur(var(--blur));
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
`

const Window = styled.div`
    width: var(--alert-width);
    background-color: var(--very-dark-grey);
    border: var(--border-width) solid var(--dark-grey);
    border-radius: var(--border-radius-large);
    overflow: hidden;
`

const Message = styled.p`
    padding: var(--spacing-medium);
    margin: 0;
    font-family: var(--serif);
    font-size: var(--font-size);
    color: var(--white);
    text-align: center;
`

const Button = styled.button`
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: var(--field-size);
    background-color: transparent;
    border: none;
    border-top: var(--border-width) solid var(--dark-grey);
    outline: none;
    font-family: var(--serif);
    font-size: var(--font-size);
    color: var(--white);
`