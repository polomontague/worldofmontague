import styled from "styled-components"
import { Spinner } from "./Spinner"

type ButtonProps = {
    label: string,
    disabled?: boolean,
    loading?: boolean,
    onClick?: () => void
}

export const Button = ({ label, disabled, loading, onClick }: ButtonProps) => {
    return (
        <ButtonStyled
            disabled={Boolean(disabled || loading)}
            onClick={onClick ? () => onClick() : undefined}
        >
            {label}
            {loading ? (
                <ContainerSpinner>
                    <Spinner />
                </ContainerSpinner>
            ) : null}
        </ButtonStyled>
    )
}

const ButtonStyled = styled.button`
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: var(--field-size);
    background-color: var(--white);
    border: none;
    border-radius: var(--border-radius);
    outline: none;
    font-family: var(--serif);
    font-size: var(--button-font-size);
    color: var(--black);
    text-transform: uppercase;
    position: relative;

    &:disabled{
        background-color: var(--very-dark-grey);
        border: var(--border-width) solid var(--dark-grey);
        color: var(--grey);
    }
`

const ContainerSpinner = styled.div`
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
`