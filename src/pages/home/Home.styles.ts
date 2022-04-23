import styled from "styled-components";

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Title = styled.h1`
    font-size: 36px;
    line-height: 40px;
    text-align: center;
`;

export const SubTitle = styled.h2`
    margin-top: ${({ theme }) => theme.spacing.xs};
    font-size: 24px;
    line-height: 28px;
    text-align: center;
`;