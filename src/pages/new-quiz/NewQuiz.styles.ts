import styled, { css, keyframes } from "styled-components";
import { onMobile } from "../../theme";

export const Layout = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 28px;
    align-items: flex-start;

    ${onMobile} {
        flex-direction: column;
        align-items: stretch;
        gap: 16px;
    }
`;

export const BoardSection = styled.section`
    flex: 999 1 560px;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 18px;

    ${onMobile} {
        flex: none;
        gap: 14px;
    }
`;

export const TitleRow = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;

    h1 {
        font-size: 44px;
        font-weight: 800;
        letter-spacing: -0.02em;
    }

    span {
        color: ${({ theme }) => theme.colors.textMuted};
        font-size: 16px;
    }

    ${onMobile} {
        h1 {
            font-size: 28px;
        }

        span {
            font-size: 14px;
        }
    }
`;

export const Board = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 10px;

    ${onMobile} {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
`;

const tileBox = css`
    height: 84px;
    padding: 12px 14px;
    border-radius: ${({ theme }) => theme.radii.md};

    ${onMobile} {
        height: 76px;
        padding: 10px 12px;
    }
`;

export const Tile = styled.button<{ $selected: boolean }>`
    ${tileBox};
    border: 2px solid ${({ theme, $selected }) => $selected ? theme.colors.accentSoft : theme.colors.primary};
    background: ${({ theme, $selected }) => $selected ? theme.colors.accent : theme.colors.primary};
    color: ${({ theme, $selected }) => $selected ? theme.colors.onAccent : theme.colors.accent};
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    transition: transform 120ms ease;

    &:hover {
        transform: translateY(-2px);
    }

    span:first-child {
        font-size: 12px;
        font-weight: 600;
        opacity: 0.75;
    }

    span:last-child {
        font-size: 15px;
        font-weight: 800;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        line-height: 1.1;
    }

    ${onMobile} {
        span:last-child {
            font-size: 14px;
        }
    }
`;

const pulse = keyframes`
    from { opacity: 0.35; }
    to { opacity: 0.7; }
`;

export const TilePlaceholder = styled.div`
    ${tileBox};
    background: ${({ theme }) => theme.colors.surface};
    animation: ${pulse} 900ms ease-in-out infinite alternate;

    @media (prefers-reduced-motion: reduce) {
        animation: none;
        opacity: 0.5;
    }
`;

export const Notice = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    padding: 28px;
    border-radius: ${({ theme }) => theme.radii.lg};
    background: ${({ theme }) => theme.colors.surfaceAlt};
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 17px;
    line-height: 1.5;
`;

export const Panel = styled.aside`
    flex: 1 1 300px;
    background: ${({ theme }) => theme.colors.surface};
    border: 2px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.lg};
    padding: 26px;
    display: flex;
    flex-direction: column;
    gap: 18px;

    h2 {
        font-size: 22px;
        font-weight: 800;
    }

    ${onMobile} {
        flex: none;
        position: sticky;
        bottom: 0;
        margin: 0 -16px -24px;
        border-width: 2px 0 0;
        border-radius: 24px 24px 0 0;
        padding: 16px 16px 24px;
        gap: 14px;

        h2 {
            position: absolute;
            width: 1px;
            height: 1px;
            overflow: hidden;
            clip: rect(0 0 0 0);
        }
    }
`;

export const Difficulties = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;

    ${onMobile} {
        order: -1;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 6px;
        padding: 5px;
        border-radius: ${({ theme }) => theme.radii.pill};
        background: ${({ theme }) => theme.colors.background};
    }
`;

export const DifficultyButton = styled.button<{ $selected: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 58px;
    padding: 0 18px;
    border-radius: ${({ theme }) => theme.radii.md};
    border: 2px solid ${({ theme, $selected }) => $selected ? theme.colors.accent : theme.colors.borderStrong};
    background: ${({ theme, $selected }) => $selected ? theme.colors.accent : 'transparent'};
    color: ${({ theme, $selected }) => $selected ? theme.colors.onAccent : theme.colors.text};
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;

    ${onMobile} {
        justify-content: center;
        height: 44px;
        padding: 0;
        border: 0;
        border-radius: ${({ theme }) => theme.radii.pill};
        font-size: 16px;
    }
`;

export const Pips = styled.span`
    display: flex;
    gap: 5px;

    ${onMobile} {
        display: none;
    }
`;

export const Pip = styled.span<{ $filled: boolean }>`
    width: 10px;
    height: 10px;
    border-radius: 999px;
    border: 2px solid currentColor;
    background: ${({ $filled }) => $filled ? 'currentColor' : 'transparent'};
`;

export const Summary = styled.div`
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    padding-top: 18px;
    display: flex;
    flex-direction: column;
    gap: 6px;

    strong {
        font-size: 22px;
    }

    span:last-child {
        color: ${({ theme }) => theme.colors.textMuted};
        font-size: 16px;
    }

    ${onMobile} {
        border-top: 0;
        padding-top: 0;
        flex-direction: row;
        align-items: baseline;
        justify-content: space-between;

        p {
            display: none;
        }

        strong {
            font-size: 17px;
        }

        span:last-child {
            font-size: 14px;
        }
    }
`;
