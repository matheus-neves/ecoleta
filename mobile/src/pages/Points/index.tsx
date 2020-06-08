import React, { useState, useEffect, useCallback } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SvgUri } from 'react-native-svg';
import * as Location from 'expo-location';
import api from '../../services/api';

import {
  SafeArea,
  Container,
  Title,
  Description,
  MapContainer,
  Map,
  MapMarker,
  ItemsContainer,
  Item,
  ItemTitle,
  MapMarkerImage,
  MapMarkerContainer,
  MapMarkerTitle,
  MapPin,
} from './styles';

interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface Params {
  uf: string;
  city: string;
  coords?: Coords;
}

interface Coords {
  latitude: number;
  longitude: number;
}

interface Point {
  id: number;
  name: string;
  image: string;
  image_url: string;
  latitude: string;
  longitude: string;
}

const Points: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [points, setPoints] = useState<Point[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [initialPosition, setInitialPosition] = useState<Coords>({
    latitude: 0,
    longitude: 0,
  });
  const { goBack, navigate } = useNavigation();
  const route = useRoute();

  const { uf, city, coords } = route.params as Params;

  useEffect(() => {
    const loadPosition = async (): Promise<void> => {
      if (coords?.latitude === undefined) {
        const { status } = await Location.requestPermissionsAsync();

        if (status !== 'granted') {
          Alert.alert(
            'Oooops...',
            'Precisamos de sua permissão para obter a localização',
          );
          return;
        }
        const location = await Location.getCurrentPositionAsync();
        const { latitude, longitude } = location.coords;

        setInitialPosition({
          latitude,
          longitude,
        });

        return;
      }

      const { latitude, longitude } = coords;

      setInitialPosition({
        latitude,
        longitude,
      });
    };
    loadPosition();
  }, [coords]);

  const loadPoints = useCallback(async () => {
    const response = await api.get<Point[]>('points', {
      params: {
        city,
        uf,
        items: selectedItems,
      },
    });

    setPoints(response.data);
  }, [city, uf, selectedItems]);

  useEffect(() => {
    loadPoints();
  }, [loadPoints]);

  useEffect(() => {
    const loadItems = async (): Promise<void> => {
      const response = await api.get<Item[]>('items');
      setItems(response.data);
    };
    loadItems();
  }, []);

  const handleSelectItem = (id: number): void => {
    if (selectedItems.includes(id)) {
      const filteredItems = selectedItems.filter(item => item !== id);
      setSelectedItems(filteredItems);
      return;
    }
    setSelectedItems([...selectedItems, id]);
  };

  return (
    <SafeArea>
      <Container>
        <TouchableOpacity onPress={() => goBack()}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <Title>Bem vindo.</Title>
        <Description>Encontre no mapa um ponto de coleta.</Description>

        <MapContainer>
          {initialPosition.latitude !== 0 && (
            <Map
              initialRegion={{
                latitude: initialPosition.latitude,
                longitude: initialPosition.longitude,
                latitudeDelta: 0.014,
                longitudeDelta: 0.014,
              }}
            >
              {points.map(({ id, image_url, name, latitude, longitude }) => (
                <MapMarker
                  key={id}
                  onPress={() => navigate('Detail', { point_id: id })}
                  coordinate={{
                    latitude: Number(latitude),
                    longitude: Number(longitude),
                  }}
                >
                  <MapMarkerContainer>
                    <MapMarkerImage
                      source={{
                        uri: image_url,
                      }}
                    />
                    <MapMarkerTitle>{name}</MapMarkerTitle>
                    <MapPin />
                  </MapMarkerContainer>
                </MapMarker>
              ))}
            </Map>
          )}
        </MapContainer>
      </Container>
      <ItemsContainer>
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {items.map(({ id, image_url, title }) => (
            <Item
              key={id}
              onPress={() => handleSelectItem(id)}
              selected={selectedItems.includes(id)}
            >
              <SvgUri width={42} height={42} uri={image_url} />
              <ItemTitle>{title}</ItemTitle>
            </Item>
          ))}
        </ScrollView>
      </ItemsContainer>
    </SafeArea>
  );
};

export default Points;
