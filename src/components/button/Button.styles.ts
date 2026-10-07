import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { onMobile } from '../../theme';

const base = css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    height: 60px;
    padding: 0 30px;
    border-radius: ${({ theme }) => theme.radii.pill};
    font-size: 19px;
    text-decoration: none;
    cursor: pointer;
    transition: transform 120ms ease, background-color 120ms ease, border-color 120ms ease;

    &:hover:not(:disabled) {
        transform: translateY(-2px);
    }

    &:disabled {
        cursor: not-allowed;
    }

    ${onMobile} {
        height: 58px;
        font-size: 18px;
    }
`;

const primary = css`
    ${base};
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.onAccent};
    border: 0;
    font-weight: 800;

    &:disabled {
        background: transparent;
        color: ${({ theme }) => theme.colors.textMuted};
        border: 2px dashed ${({ theme }) => theme.colors.borderStrong};
        font-weight: 700;
    }
`;

const ghost = css`
    ${base};
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
    border: 2px solid ${({ theme }) => theme.colors.borderStrong};
    font-weight: 700;

    &:hover:not(:disabled) {
        border-color: ${({ theme }) => theme.colors.accent};
    }
`;

export const PrimaryButton = styled.button`${primary}`;
export const PrimaryLink = styled(Link)`${primary}`;
export const GhostButton = styled.button`${ghost}`;
export const GhostLink = styled(Link)`${ghost}`;

/** Round icon-only button; always pair with an aria-label. */
export const IconButton = styled.button`
    width: 44px;
    height: 44px;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: ${({ theme }) => theme.radii.pill};
    border: 2px solid ${({ theme }) => theme.colors.border};
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
    cursor: pointer;

    &:hover {
        border-color: ${({ theme }) => theme.colors.accent};
    }
`;
