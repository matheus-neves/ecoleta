import styled, { css } from 'styled-components/native';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native';

interface PropsItem {
  selected: boolean;
}

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  padding-bottom: 20px;
`;

export const Container = styled.View`
  flex: 1;
  padding: 32px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-family: 'Ubuntu_700Bold';
  margin-top: 24px;
`;

export const Description = styled.Text`
  color: #6c6c80;
  font-size: 16px;
  margin-top: 4px;
  font-family: 'Roboto_400Regular';
`;

export const MapContainer = styled.View`
  flex: 1;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 16px;
`;

export const Map = styled(MapView)`
  width: 100%;
  height: 100%;
`;

export const MapMarkerContainer = styled.View`
  position: relative;
  width: 90px;
  height: 70px;
  background-color: #34cb79;
  flex-direction: column;
  border-radius: 8px;
  align-items: center;
`;

export const MapPin = styled.View`
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 2px;
  background-color: #34cb79;
  transform: rotate(45deg);
  bottom: -5px;
  z-index: 1;
`;

export const MapMarker = styled(Marker)`
  width: 90px;
  height: 80px;
`;

export const MapMarkerImage = styled.Image.attrs({
  resizemode: 'cover',
})`
  width: 90px;
  height: 45px;
`;

export const MapMarkerTitle = styled.Text`
  position: relative;
  flex: 1;
  font-family: 'Roboto_400Regular';
  color: #fff;
  font-size: 13px;
  line-height: 23px;
  z-index: 2;
`;

export const ItemsContainer = styled.View`
  flex-direction: row;
  margin-top: 16px;
`;

export const Item = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})<PropsItem>`
  background-color: #fff;
  border-width: 2px;
  border-color: #eee;
  height: 120px;
  width: 120px;
  border-radius: 8px;
  padding: 20px 12px 16px;
  margin-right: 8px;
  align-items: center;
  justify-content: space-between;
  text-align: center;

  ${attrs =>
    attrs.selected &&
    css`
      border-color: #34cb79;
      border-width: 2px;
    `}
`;

export const ItemTitle = styled.Text`
  font-family: 'Roboto_400Regular';
  text-align: center;
  font-size: 13px;
`;
