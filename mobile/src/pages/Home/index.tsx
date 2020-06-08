import React, { useEffect, useState } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import {
  Image,
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import config from '../../config/google';

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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 8,
    marginTop: 8,
    paddingHorizontal: 24,
    fontSize: 16,
    color: '#6c6c80',
  },
  inputAndroid: {
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 8,
    marginTop: 8,
    paddingHorizontal: 24,
    fontSize: 16,
    color: '#6c6c80',
  },
  iconContainer: {
    top: 25,
    right: 20,
  },
  placeholder: {
    color: '#6c6c80',
    fontSize: 16,
    paddingHorizontal: 24,
  },
  itemStyle: {
    color: '#fff',
  },
});

interface SelectData {
  label: string;
  value: string;
}

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

interface GoogleGeoResponse {
  results: {
    geometry: {
      location: {
        lat: string;
        lng: string;
      };
    };
  }[];
}

interface Address {
  uf: string;
  city: string;
}

interface Coords {
  latitude: string;
  longitude: string;
}

const Home: React.FC = () => {
  const [ufs, setUfs] = useState<SelectData[]>([
    {
      label: 'Selecione a UF',
      value: '0',
    },
  ]);
  const [cities, setCities] = useState<SelectData[]>([
    {
      label: 'Selecione a cidade',
      value: '0',
    },
  ]);
  const [coords, setCoords] = useState<Coords>({} as Coords);
  const [enabledButton, setEnabledButton] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  const navigation = useNavigation();

  const getCoords = async ({ city, uf }: Address): Promise<void> => {
    if (city === '0') return;

    try {
      setLoading(true);
      setEnabledButton(false);
      const { API_KEY } = config;
      const response = await axios.get<GoogleGeoResponse>(`
      https://maps.googleapis.com/maps/api/geocode/json?address=${city},${uf}&key=${API_KEY}
    `);

      const { location } = response.data.results[0].geometry;
      setCoords({ latitude: location.lat, longitude: location.lng });
      setEnabledButton(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert('Erro ao efetuar a busca...');
    }
  };

  useEffect(() => {
    const loadUfs = async (): Promise<void> => {
      const response = await axios.get<IBGEUFResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome',
      );

      const ufInitials = response.data.map(uf => uf.sigla);

      const formatedUf = ufInitials.map(uf => ({
        label: uf,
        value: uf,
      }));

      setUfs(formatedUf);
    };

    loadUfs();
  }, []);

  useEffect(() => {
    if (selectedUf === '0') return;
    const loadCities = async (): Promise<void> => {
      setSelectedCity('0');
      setEnabledButton(false);
      setLoading(true);
      const response = await axios.get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios?orderBy=nome`,
      );
      const cityNames = response.data.map(city => city.nome);

      const formatedCity = cityNames.map(city => ({
        label: city,
        value: city,
      }));

      setCities(formatedCity);
      setLoading(false);
    };

    loadCities();
  }, [selectedUf]);

  const handleSelectUf = (value: string): void => {
    setSelectedUf(value);
  };

  const handleSelectCity = async (value: string): Promise<void> => {
    setSelectedCity(value);
    await getCoords({ uf: selectedUf, city: value });
  };

  const handleEnter = (): void => {
    navigation.navigate('Points', {
      uf: selectedUf,
      city: selectedCity,
      coords,
    });
  };

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
        <RNPickerSelect
          placeholder={{
            label: 'Selecione a UF',
            value: '0',
            color: '#6c6c80',
          }}
          value={selectedUf}
          useNativeAndroidPickerStyle={false}
          style={{
            ...pickerSelectStyles,
          }}
          onValueChange={value => handleSelectUf(value)}
          items={ufs}
          Icon={() => <Icon name="chevron-down" size={24} color="#000" />}
        />

        <RNPickerSelect
          placeholder={{
            label: 'Selecione a cidade',
            value: '0',
            color: '#6c6c80',
          }}
          value={selectedCity}
          useNativeAndroidPickerStyle={false}
          style={{
            ...pickerSelectStyles,
          }}
          onValueChange={value => handleSelectCity(value)}
          items={cities}
          Icon={() => <Icon name="chevron-down" size={24} color="#000" />}
        />

        <Button onPress={() => handleEnter()} enabled={enabledButton}>
          <ButtonIcon>
            {!loading ? (
              <Icon name="arrow-right" color="#fff" size={24} />
            ) : (
              <ActivityIndicator color="#fff" size={24} />
            )}
          </ButtonIcon>
          <ButtonText>Entrar</ButtonText>
        </Button>
      </View>
    </Container>
  );
};

export default Home;
