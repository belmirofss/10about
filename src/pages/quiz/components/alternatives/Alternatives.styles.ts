import styled from "styled-components";
import { lighten } from 'polished';

interface AlternativeProps {
    selected?: boolean;
    correct?: boolean;
    wrong?: boolean;
}

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const Alternative = styled.button<AlternativeProps>`
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: ${({ theme }) => theme.spacing.xs};
    font-size: 18px;
    background: ${({ selected, correct, wrong, theme }) => {
        if (selected && correct) {
            return lighten(0.7, theme.colors.success);
        }

        if (selected && wrong) {
            return lighten(0.5, theme.colors.error);
        }

        return '#FFF';
    }};
    border: 4px solid ${({ correct, wrong, theme }) => {
        if (correct) {
            return theme.colors.success;
        }

        if (wrong) {
            return theme.colors.error;
        }

        return theme.colors.primary
    }};
    color: ${({ correct, wrong, theme }) => {
        if (correct) {
            return theme.colors.success;
        }

        if (wrong) {
            return theme.colors.error;
        }

        return theme.colors.primary
    }};
    outline: none;
    width: 100%;    
    min-height: 48px;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    cursor: pointer;

    transform: ${({ selected }) => selected ? 'scale(1.05)' : 'none'};

    &:hover:not(:disabled) {
        transform: scale(1.05);
        transition: all 150ms;
    } 

    :disabled {
        cursor: no-drop;
    }
`;