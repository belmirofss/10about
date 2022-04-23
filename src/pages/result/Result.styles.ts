import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
`;

export const ResultText = styled.h1`
    text-align: center;
    font-size: 36px;
    line-height: 40px;
`;

export const Message = styled.p`
    margin-top: ${({ theme }) => theme.spacing.xs};
    text-align: center;
    font-size: 24px;
    line-height: 28px;
`;