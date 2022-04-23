import styled from "styled-components";

export const Button = styled.button`
    padding: 4px;
    margin-top: ${({ theme }) => theme.spacing.xs};
    font-size: 24px;
    background: ${({ theme }) => theme.colors.primary};
    color: #FFF;
    outline: none;
    border: none;
    width: 100%;
    min-height: 48px;
    font-weight: bold;
    text-align: center;
    line-height: 48px;
    text-decoration: none;
    cursor: pointer;

    &:hover:not(:disabled) {
        transform: scale(1.05);
        transition: all 150ms;
    }   

    :disabled {
        cursor: no-drop;
        background: gray;
    }
`;