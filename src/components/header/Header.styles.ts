import styled from 'styled-components';

export const Content = styled.header`
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.lg};

    @media(max-width: ${({ theme }) => theme.breakpoints.md}) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

export const Logo = styled.img`
    height: 46px;

    &:hover {
        transform: scale(1.05);
        transition: all 150ms;
    }
`;