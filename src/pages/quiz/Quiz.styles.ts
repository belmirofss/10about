import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Title = styled.h2`
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    font-size: 24px;
    line-height: 28px;
    text-align: center;
`;

export const QuestionText = styled.p`
    font-size: 18px;
    font-size: 20px;
    text-align: center;
    max-width: 100%;
`;