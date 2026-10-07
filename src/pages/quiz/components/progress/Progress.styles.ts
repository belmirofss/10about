import styled from "styled-components";
import { onMobile } from "../../../../theme";

export type StepState = 'correct' | 'wrong' | 'current' | 'upcoming';

export const Ladder = styled.aside`
    flex: 1 1 240px;
    max-width: 300px;
    align-self: flex-start;
    background: ${({ theme }) => theme.colors.surface};
    border: 2px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.lg};
    padding: 18px;

    ${onMobile} {
        display: none;
    }
`;

export const LadderHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 4px 8px 10px;

    h2 {
        font-size: 13px;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: ${({ theme }) => theme.colors.accent};
        font-weight: 600;
    }

    span {
        font-size: 15px;
        color: ${({ theme }) => theme.colors.textMuted};
    }

    strong {
        color: ${({ theme }) => theme.colors.text};
    }
`;

export const Rungs = styled.ol`
    list-style: none;
    display: flex;
    flex-direction: column-reverse;
    gap: 6px;
`;

export const Rung = styled.li<{ $state: StepState }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;
    padding: 0 14px;
    border-radius: 12px;
    font-weight: 700;
    font-size: 16px;
    background: ${({ theme, $state }) =>
        $state === 'current' ? theme.colors.accent : $state === 'upcoming' ? 'transparent' : theme.colors.surfaceRaised};
    color: ${({ theme, $state }) =>
        $state === 'current' ? theme.colors.onAccent : $state === 'upcoming' ? theme.colors.textFaint : theme.colors.text};

    small {
        font-size: 12px;
        letter-spacing: 0.16em;
    }
`;

export const Mark = styled.span<{ $correct: boolean }>`
    display: flex;
    color: ${({ theme, $correct }) => $correct ? theme.colors.success : theme.colors.error};
`;

export const Bar = styled.ol`
    display: none;
    list-style: none;

    ${onMobile} {
        order: -1;
        display: grid;
        gap: 5px;
    }
`;

export const Segment = styled.li<{ $state: StepState }>`
    height: 8px;
    border-radius: 999px;
    background: ${({ theme, $state }) => ({
        correct: theme.colors.success,
        wrong: theme.colors.error,
        current: theme.colors.accent,
        upcoming: theme.colors.border
    })[$state]};
`;
