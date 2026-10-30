import { ReactNode } from "react"
import styled from "styled-components"

const Frame = styled.div`
    display: -webkit-flex;
    display: flex;
    padding-left: var(--sidebar-width);
`

const Navigation = styled.aside`
    width: var(--sidebar-width);
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
`

const ContainerLogo = styled.div`
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 100%;
    background-color: ivory;
    border-right: 6px solid green;
    outline: 6px solid red;
`

const ContainerLogoPosition = styled.div`
    transform: rotate(-90deg);
    white-space: nowrap;
`

const Logo = styled.h1`
    font-size: 28px;
`

const LogoSansSerif = styled.span`
    font-family: var(--sans-serif);
    font-weight: normal;
    color: var(--black);
    text-transform: uppercase;
`

const LogoSerif = styled.span`
    font-family: var(--serif);
    font-size: 0.9em;
    font-weight: normal;
    font-style: italic;
    color: var(--black);
`

const Content = styled.div`
    width: 100%;
`

type NavigationFrameProps = {
    children: ReactNode
}

export const NavigationFrame = ({ children }: NavigationFrameProps) => {
    return (
        <Frame>
            <Navigation>
                <ContainerLogo>
                    <ContainerLogoPosition>
                        <Logo>
                            <LogoSansSerif>World</LogoSansSerif>
                            <LogoSerif> of </LogoSerif>
                            <LogoSansSerif>Montague</LogoSansSerif>
                        </Logo>
                    </ContainerLogoPosition>
                </ContainerLogo>
            </Navigation>
            <Content>
                {children}
            </Content>
        </Frame>
    )
}