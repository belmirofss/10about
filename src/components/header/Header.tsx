import React, { ReactNode } from 'react';
import { Center, Content, Logo, Slot } from './Header.styles';

interface Props {
    center?: ReactNode;
    right?: ReactNode;
}

export default function Header(props: Props) {

    const { center, right } = props;

    return (
        <Content>
            <Logo to="/" aria-label="10about? home">10about?</Logo>
            <Center>{center}</Center>
            <Slot>{right}</Slot>
        </Content>
    );
}
