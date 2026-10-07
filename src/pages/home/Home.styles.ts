import styled from "styled-components";
import { onMobile } from "../../theme";

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 28px;

    ${onMobile} {
        gap: 18px;
    }
`;

export const Title = styled.h1`
    font-size: 80px;
    line-height: 0.95;
    font-weight: 800;
    letter-spacing: -0.02em;
    max-width: 900px;

    ${onMobile} {
        font-size: 46px;
        line-height: 0.98;
    }
`;

export const SubTitle = styled.p`
    font-size: 20px;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.textMuted};
    max-width: 620px;

    ${onMobile} {
        font-size: 16px;
    }
`;

export const Actions = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 14px;
    margin-top: 8px;

    ${onMobile} {
        flex-direction: column;
        align-self: stretch;
        gap: 12px;
        margin-top: 4px;
    }
`;

export const Steps = styled.ol`
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 20px;

    ${onMobile} {
        gap: 10px;
    }
`;

export const Step = styled.li`
    display: flex;
    gap: 18px;
    align-items: flex-start;
    padding: 22px 24px;
    border-radius: 20px;
    background: ${({ theme }) => theme.colors.surfaceAlt};

    ${onMobile} {
        align-items: center;
        gap: 14px;
        padding: 14px 16px;
        border-radius: 16px;
    }
`;

export const StepNumber = styled.span`
    font-size: 40px;
    font-weight: 800;
    line-height: 1;
    color: ${({ theme }) => theme.colors.accent};

    ${onMobile} {
        font-size: 26px;
        width: 36px;
    }
`;

export const StepText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    strong {
        font-size: 20px;
    }

    span {
        color: ${({ theme }) => theme.colors.textMuted};
        font-size: 16px;
        line-height: 1.45;
    }

    ${onMobile} {
        strong {
            font-size: 16px;
        }

        span {
            font-size: 14px;
        }
    }
`;
