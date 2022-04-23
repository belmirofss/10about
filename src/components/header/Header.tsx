import React from 'react';
import { Content, Logo } from "./Header.styles";
import logo from '../../images/10about.png'
import { Link } from 'react-router-dom';

export default function Header() {

    return (
        <Content>
            <Link to="/">
                <Logo src={logo} alt="10about logo" />
            </Link>
        </Content>
    );
}