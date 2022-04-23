import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');

    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
        font-family: 'Lobster', cursive;
    }

    body {
        -webkit-font-smoothing: antialiased !important;
    }

    body, html {
        height: 100vh;
    }

    #root {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
`;

export const Content = styled.main`
    display: flex;
    align-items: center;
    flex: 1;
    width: 424px;
    margin: 0 auto;

    @media(max-width: ${({ theme }) => theme.breakpoints.sm}) {
        width: 95vw;
    }
`;