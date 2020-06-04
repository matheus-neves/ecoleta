import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import { Container } from './styles';
import logo from '../../assets/logo.svg';

interface HeaderProps {
  notHome?: boolean;
}

const Header: React.FC<HeaderProps> = ({ notHome }) => (
  <Container>
    <img src={logo} alt="Ecoleta" />

    {notHome && (
      <Link to="/">
        <FiArrowLeft />
        Voltar para home
      </Link>
    )}
  </Container>
);

export default Header;
