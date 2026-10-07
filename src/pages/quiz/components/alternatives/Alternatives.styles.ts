import styled from "styled-components";
import { onMobile } from "../../../../theme";

export type AlternativeState = 'idle' | 'correct' | 'wrong' | 'dimmed';

export const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 14px;
    margin-top: 6px;

    ${onMobile} {
        grid-template-columns: minmax(0, 1fr);
        gap: 10px;
        margin-top: 0;
    }
`;

export const Alternative = styled.button<{ $state: AlternativeState }>`
    display: flex;
    align-items: center;
    gap: 16px;
    min-height: 84px;
    padding: 14px 20px;
    border-radius: ${({ theme }) => theme.radii.pill};
    border: 2px solid ${({ theme, $state }) =>
        $state === 'correct' ? theme.colors.success : $state === 'wrong' ? theme.colors.error : theme.colors.border};
    background: ${({ theme, $state }) =>
        $state === 'correct' ? theme.colors.success : $state === 'wrong' ? theme.colors.error : theme.colors.surface};
    color: ${({ theme, $state }) =>
        $state === 'correct' || $state === 'wrong' ? theme.colors.onAccent : theme.colors.text};
    opacity: ${({ $state }) => $state === 'dimmed' ? 0.45 : 1};
    font-size: 22px;
    font-weight: 700;
    text-align: left;
    cursor: pointer;
    transition: transform 120ms ease, border-color 120ms ease;

    &:hover:not(:disabled) {
        border-color: ${({ theme }) => theme.colors.accent};
        transform: translateY(-2px);
    }

    &:disabled {
        cursor: default;
    }

    ${onMobile} {
        min-height: 66px;
        padding: 10px 16px;
        gap: 14px;
        font-size: 19px;
    }
`;

export const Key = styled.span`
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    border-radius: 999px;
    border: 2px solid currentColor;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 800;

    ${onMobile} {
        width: 38px;
        height: 38px;
        font-size: 16px;
    }
`;

export const Text = styled.span`
    flex: 1;
    overflow-wrap: anywhere;
`;
