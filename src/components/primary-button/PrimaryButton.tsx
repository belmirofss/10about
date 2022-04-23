import React, { ReactNode } from 'react';
import { Button } from './PrimaryButton.styles';

interface Props {
    children: ReactNode;
    onClick(): void;
    disabled?: boolean;
}

export default function PrimaryButton(props: Props) {

    const { children, disabled, onClick } = props;

    return (
        <Button onClick={onClick} disabled={disabled}>
            { children }
        </Button>
    );
}