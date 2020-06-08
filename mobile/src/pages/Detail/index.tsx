import React, { useEffect, useState, useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import api from '../../services/api';

import {
  SafeArea,
  Container,
  PointImage,
  PointName,
  PointItems,
  Address,
  AddressTitle,
  AddressContent,
  Footer,
  Button,
  ButtonText,
} from './styles';

interface Params {
  point_id: number;
}

interface Data {
  point: {
    image: string;
    image_url: string;
    name: string;
    email: string;
    whatsapp: string;
    city: string;
    uf: string;
  };
  items: {
    title: string;
  }[];
}

const Detail: React.FC = () => {
  const { goBack } = useNavigation();
  const route = useRoute();

  const [data, setData] = useState<Data>({} as Data);

  const { point_id } = route.params as Params;

  const handleComposeMail = async (): Promise<void> => {
    await MailComposer.composeAsync({
      subject: 'Interesse na coleta de resíduos',
      recipients: [data.point.email],
    });
  };

  const loadData = useCallback(async (): Promise<void> => {
    const response = await api.get<Data>(`points/${point_id}`);

    setData(response.data);
  }, [point_id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (!data.point) {
    return null;
  }

  return (
    <SafeArea>
      <Container>
        <TouchableOpacity onPress={() => goBack()}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>
        <PointImage
          source={{
            uri: data.point.image_url,
          }}
        />

        <PointName>{data.point.name}</PointName>
        <PointItems>
          {data.items.map(({ title }) => title).join(', ')}
        </PointItems>

        <Address>
          <AddressTitle>Endereço</AddressTitle>
          <AddressContent>
            {data.point.city}, {data.point.uf}
          </AddressContent>
        </Address>
      </Container>

      <Footer>
        <Button
          onPress={() => {
            Linking.openURL(
              `whatsapp://send?phone=${data.point.whatsapp}&text=Tenho interesse sobre coleta de resíduos`,
            );
          }}
        >
          <FontAwesome name="whatsapp" size={20} color="#fff" />
          <ButtonText>Whatsapp</ButtonText>
        </Button>
        <Button onPress={() => handleComposeMail()}>
          <Icon name="mail" size={20} color="#fff" />
          <ButtonText>E-mail</ButtonText>
        </Button>
      </Footer>
    </SafeArea>
  );
};

export default Detail;
