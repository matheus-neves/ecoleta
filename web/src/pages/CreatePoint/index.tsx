import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import axios from 'axios';
import api from '../../services/api';
import Header from '../../components/Header';
import { Container, Form, FieldGroup, Field, ItemsList } from './styles';

interface DataItem {
  id: number;
  title: string;
  image_url: string;
}

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const CreatePoint: React.FC = () => {
  const [items, setItems] = useState<DataItem[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
  });

  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const history = useHistory();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;
      setInitialPosition([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome',
      )
      .then(response => {
        const ufInitials = response.data.map(uf => uf.sigla);

        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === '0') return;

    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios?orderBy=nome`,
      )
      .then(response => {
        const cityNames = response.data.map(city => city.nome);

        setCities(cityNames);
      });
  }, [selectedUf]);

  const handleSelectUf = (e: ChangeEvent<HTMLSelectElement>): void => {
    const uf = e.target.value;
    setSelectedUf(uf);
  };

  const handleSelectCity = (e: ChangeEvent<HTMLSelectElement>): void => {
    const city = e.target.value;
    setSelectedCity(city);
  };

  const handleMapClick = (e: LeafletMouseEvent): void => {
    setSelectedPosition([e.latlng.lat, e.latlng.lng]);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectItem = (id: number): void => {
    if (selectedItems.includes(id)) {
      const filteredItems = selectedItems.filter(item => item !== id);
      setSelectedItems(filteredItems);
      return;
    }

    setSelectedItems([...selectedItems, id]);
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    const { name, email, whatsapp } = formData;
    const uf = selectedUf;
    const city = selectedCity;
    const [latitude, longitude] = selectedPosition;

    const data = {
      name,
      email,
      whatsapp,
      uf,
      city,
      latitude,
      longitude,
      items: selectedItems,
    };

    await api.post('points', data);

    history.push('/');
  };

  return (
    <Container>
      <Header notHome />

      <Form onSubmit={e => handleSubmit(e)}>
        <h1>
          Cadastro do
          <br /> ponto de coleta
        </h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <Field>
            <label htmlFor="name">
              <span>Nome da entidade</span>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={e => handleInputChange(e)}
              />
            </label>
          </Field>

          <FieldGroup>
            <Field>
              <label htmlFor="email">
                <span>E-mail</span>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={e => handleInputChange(e)}
                />
              </label>
            </Field>
            <Field>
              <label htmlFor="whatsapp">
                <span>Whatsapp</span>
                <input
                  type="text"
                  name="whatsapp"
                  id="whatsapp"
                  value={formData.whatsapp}
                  onChange={e => handleInputChange(e)}
                />
              </label>
            </Field>
          </FieldGroup>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço do mapa</span>
          </legend>

          <Map
            center={initialPosition}
            zoom={15}
            onClick={(e: LeafletMouseEvent) => handleMapClick(e)}
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectedPosition} />
          </Map>

          <FieldGroup>
            <Field>
              <label htmlFor="uf">
                <span>Estado (UF)</span>
                <select
                  name="uf"
                  id="uf"
                  value={selectedUf}
                  onChange={e => handleSelectUf(e)}
                >
                  <option value="0">Selecione uma UF</option>
                  {ufs.map(uf => (
                    <option key={uf} value={uf}>
                      {uf}
                    </option>
                  ))}
                </select>
              </label>
            </Field>
            <Field>
              <label htmlFor="city">
                <span>Cidade</span>
                <select
                  name="city"
                  id="city"
                  value={selectedCity}
                  onChange={e => handleSelectCity(e)}
                >
                  <option value="0">Selecione uma cidade</option>
                  {cities.map(city => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </label>
            </Field>
          </FieldGroup>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Ítens de coleta</h2>
            <span>Selecione um ou mais itens abaixo</span>
          </legend>

          <ItemsList>
            {items.map(item => (
              <li
                className={
                  selectedItems.includes(item.id) ? 'selected' : undefined
                }
                key={item.id}
                onClick={() => handleSelectItem(item.id)}
              >
                <img src={item.image_url} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}
          </ItemsList>
        </fieldset>

        <button type="submit">Cadastrar ponto de coleta</button>
      </Form>
    </Container>
  );
};

export default CreatePoint;
