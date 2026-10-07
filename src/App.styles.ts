import styled, { createGlobalStyle } from 'styled-components';
import { onMobile } from './theme';

export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html, body {
        min-height: 100%;
    }

    body {
        background: ${({ theme }) => theme.colors.background};
        color: ${({ theme }) => theme.colors.text};
        font-family: ${({ theme }) => theme.fonts.body};
        -webkit-font-smoothing: antialiased;
    }

    button {
        font-family: inherit;
    }

    a {
        color: inherit;
    }

    :focus-visible {
        outline: 3px solid ${({ theme }) => theme.colors.accent};
        outline-offset: 3px;
    }

    #root {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
`;

export const Main = styled.main`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 8px 40px 40px;
    flex: 1;

    ${onMobile} {
        padding: 8px 16px 24px;
    }
`;

export const Overline = styled.p`
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.accent};

    ${onMobile} {
        font-size: 12px;
    }
`;

/** The dotted "marquee bulbs" stage panel used across Showtime screens. */
export const Stage = styled.section`
    background: ${({ theme }) => theme.colors.surface};
    border: 2px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.xl};
    outline: 3px dotted ${({ theme }) => theme.colors.accent};
    outline-offset: -16px;
    padding: 64px 48px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 22px;

    ${onMobile} {
        border-radius: 28px;
        outline-offset: -12px;
        padding: 40px 22px 32px;
        gap: 16px;
    }
`;

/** Hidden on screen, still read by screen readers. */
export const VisuallyHidden = styled.span`
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
`;
