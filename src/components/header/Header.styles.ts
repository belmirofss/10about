import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { onMobile } from '../../theme';

export const Content = styled.header`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 22px 40px;
    display: grid;
    grid-template-columns: minmax(max-content, 1fr) auto minmax(max-content, 1fr);
    align-items: center;
    gap: 16px;

    ${onMobile} {
        grid-template-columns: auto minmax(0, 1fr) auto;
        padding: 12px 16px;
        gap: 10px;
    }
`;

export const Center = styled.div`
    display: flex;
    justify-content: center;
    min-width: 0;
`;

export const Logo = styled(Link)`
    font-family: ${({ theme }) => theme.fonts.logo};
    font-size: 34px;
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    justify-self: start;

    &:hover {
        color: ${({ theme }) => theme.colors.accent};
    }

    ${onMobile} {
        font-size: 28px;
    }
`;

export const Slot = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 28px;
    min-width: 0;
    font-weight: 600;

    ${onMobile} {
        gap: 12px;
    }
`;

/** "Category | Difficulty" pill shown while a game is on. */
export const GameChip = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
    background: ${({ theme }) => theme.colors.surface};
    border: 2px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.pill};
    padding: 8px 16px;
    font-weight: 600;
    font-size: 15px;
    white-space: nowrap;

    span:first-child {
        color: ${({ theme }) => theme.colors.accent};
        overflow: hidden;
        text-overflow: ellipsis;
    }

    span:nth-child(2) {
        color: ${({ theme }) => theme.colors.borderStrong};
    }

    ${onMobile} {
        padding: 6px 12px;
        font-size: 13px;
        gap: 6px;
    }
`;

const headerLink = css`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textMuted};

    &:hover {
        color: ${({ theme }) => theme.colors.accent};
    }
`;

export const HeaderLink = styled(Link)`${headerLink}`;
export const HeaderAnchor = styled.a`${headerLink}`;

/** Not rendered at all on phones. */
export const DesktopOnly = styled.span`
    ${onMobile} {
        display: none;
    }
`;

/** Label that is visually hidden on phones (still read by screen readers), leaving only the icon next to it. */
export const LabelHiddenOnMobile = styled.span`
    ${onMobile} {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip: rect(0 0 0 0);
        white-space: nowrap;
    }
`;
