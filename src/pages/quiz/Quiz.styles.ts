import styled from "styled-components";
import { onMobile } from "../../theme";

export const Layout = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
    align-items: stretch;

    ${onMobile} {
        flex-direction: column;
        gap: 20px;
    }
`;

export const QuestionSection = styled.section`
    flex: 999 1 560px;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 26px;

    ${onMobile} {
        flex: none;
        gap: 18px;
    }
`;

export const QuestionText = styled.h1`
    font-size: 52px;
    line-height: 1.05;
    font-weight: 800;
    letter-spacing: -0.02em;
    max-width: 760px;

    &:focus {
        outline: none;
    }

    ${onMobile} {
        font-size: 30px;
        line-height: 1.1;
        letter-spacing: -0.01em;
    }
`;

export const Footer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    min-height: 64px;
    margin-top: auto;

    ${onMobile} {
        flex-direction: column;
        align-items: stretch;
        text-align: center;
        gap: 12px;
    }
`;

export const Tip = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 16px;

    kbd {
        font-family: inherit;
        border: 1px solid ${({ theme }) => theme.colors.borderStrong};
        border-radius: 6px;
        padding: 2px 8px;
    }

    ${onMobile} {
        display: none;
    }
`;

export const Verdict = styled.div<{ $correct: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 2px;

    strong {
        font-size: 26px;
        color: ${({ theme, $correct }) => $correct ? theme.colors.success : theme.colors.error};
    }

    span {
        color: ${({ theme }) => theme.colors.textMuted};
        font-size: 16px;
    }

    ${onMobile} {
        strong {
            font-size: 22px;
        }

        span {
            font-size: 15px;
        }
    }
`;

/** Centered panel for the loading and error states. */
export const StatusPanel = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 80px 24px;
    text-align: center;

    p {
        max-width: 520px;
        font-size: 18px;
        line-height: 1.5;
        color: ${({ theme }) => theme.colors.textMuted};
    }

    h1 {
        font-size: 32px;
        font-weight: 800;
    }
`;

export const StatusActions = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
`;
