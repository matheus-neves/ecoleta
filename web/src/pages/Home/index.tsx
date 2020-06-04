import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import Header from '../../components/Header';
import { Container, Content, Main } from './styles';

const Home: React.FC = () => (
  <Container>
    <Content>
      <Header />

      <Main>
        <h1>Seu marketplace de coleta de resíduos</h1>
        <p>
          Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
        </p>

        <Link to="/create-point">
          <span>
            <FiLogIn />
          </span>
          <strong>Cadastre um ponto de coleta</strong>
        </Link>
      </Main>
    </Content>
  </Container>
);

export default Home;
