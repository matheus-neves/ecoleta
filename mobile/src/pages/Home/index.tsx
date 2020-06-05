import React from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { Image, View } from 'react-native';

import logo from '../../assets/logo.png';
import HomeBackground from '../../assets/home-background.png';

import {
  Container,
  Main,
  Title,
  Description,
  Button,
  ButtonIcon,
  ButtonText,
} from './styles';

const Home: React.FC = () => {
  return (
    <Container source={HomeBackground} imageStyle={{ width: 274, height: 368 }}>
      <Main>
        <Image source={logo} />
        <Title>Seu marketplace de coleta de resíduos</Title>
        <Description>
          Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
        </Description>
      </Main>

      <View>
        <Button
          onPress={() => {
            console.log('log');
          }}
        >
          <ButtonIcon>
            <Icon name="arrow-right" color="#fff" size={24} />
          </ButtonIcon>
          <ButtonText>Entrar</ButtonText>
        </Button>
      </View>
    </Container>
  );
};

export default Home;
