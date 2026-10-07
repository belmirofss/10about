import styled from "styled-components";
import { Stage } from "../../App.styles";
import { onMobile } from "../../theme";

export const Layout = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 28px;
    align-items: stretch;

    ${onMobile} {
        flex-direction: column;
        gap: 18px;
    }
`;

export const Scoreboard = styled(Stage)`
    flex: 999 1 560px;
    min-width: 0;
    padding: 52px 48px;

    ${onMobile} {
        flex: none;
        padding: 34px 20px 28px;
    }
`;

export const Digits = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    ${onMobile} {
        gap: 8px;
    }
`;

export const Digit = styled.span<{ $highlight?: boolean }>`
    width: 120px;
    height: 150px;
    border-radius: 16px;
    background: ${({ theme }) => theme.colors.background};
    border: 2px solid ${({ theme }) => theme.colors.border};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 120px;
    font-weight: 800;
    line-height: 1;
    color: ${({ theme, $highlight }) => $highlight ? theme.colors.accent : theme.colors.text};

    ${onMobile} {
        width: 76px;
        height: 96px;
        border-radius: 12px;
        font-size: 76px;
    }
`;

export const Slash = styled.span`
    font-size: 64px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.borderStrong};

    ${onMobile} {
        font-size: 40px;
    }
`;

export const Message = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;

    h1 {
        font-size: 40px;
        font-weight: 800;
        letter-spacing: -0.01em;
    }

    p {
        font-size: 18px;
        color: ${({ theme }) => theme.colors.textMuted};
    }

    ${onMobile} {
        h1 {
            font-size: 30px;
        }

        p {
            font-size: 16px;
        }
    }
`;

export const Run = styled.ol`
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;

    ${onMobile} {
        display: grid;
        gap: 4px;
        width: 100%;
    }
`;

export const RunItem = styled.li<{ $correct: boolean }>`
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: ${({ theme, $correct }) => $correct ? theme.colors.success : theme.colors.error};
    color: ${({ theme }) => theme.colors.onAccent};
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 15px;

    ${onMobile} {
        width: auto;
        height: 28px;
        border-radius: 7px;
        font-size: 12px;
    }
`;

export const Actions = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    margin-top: 6px;

    ${onMobile} {
        flex-direction: column;
        align-self: stretch;
    }
`;

export const Review = styled.section`
    flex: 1 1 300px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    h2 {
        font-size: 22px;
        font-weight: 800;
        margin-bottom: 4px;
    }

    ${onMobile} {
        flex: none;
        gap: 8px;

        h2 {
            font-size: 17px;
            margin-bottom: 0;
        }
    }
`;

export const Miss = styled.article`
    background: ${({ theme }) => theme.colors.surfaceAlt};
    border-radius: 18px;
    padding: 18px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    h3 {
        font-size: 18px;
        line-height: 1.3;
    }

    ${onMobile} {
        border-radius: 14px;
        padding: 12px 14px;
        gap: 6px;

        h3 {
            font-size: 15px;
        }
    }
`;

export const MissNumber = styled.span`
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.18em;
    color: ${({ theme }) => theme.colors.accent};
`;

export const MissAnswers = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 15px;

    span {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    span:first-child {
        color: ${({ theme }) => theme.colors.errorText};
    }

    span:last-child {
        color: ${({ theme }) => theme.colors.successText};
    }

    ${onMobile} {
        font-size: 14px;
    }
`;

export const Perfect = styled.p`
    background: ${({ theme }) => theme.colors.surfaceAlt};
    border-radius: 18px;
    padding: 18px 20px;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 16px;
    line-height: 1.5;
`;

export const ShareFeedback = styled.p`
    min-height: 20px;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textMuted};
`;
