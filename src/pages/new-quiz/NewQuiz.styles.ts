import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
`;

export const Text = styled.h2`
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    font-size: 24px;
    line-height: 28px;
    text-align: center;
`;

export const WrapperSelectDifficult = styled.div`
    margin-top: ${({ theme }) => theme.spacing.xs};
`;