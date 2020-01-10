import React, { useState, useEffect } from 'react';
import { Keyboard, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';

import api from '../../services/api';
import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from './styles';

export default function Main({ navigation }) {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleAddUser() {
    setLoading(true);

    // pega o nome dos repositorios e armazena na newUser
    const response = await api.get(`/users/${newUser}`);

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };

    // Armazena o nome dos usuarios que esta em newUser no vetor de usuarios
    setUsers([...users, data]);
    setNewUser('');
    setLoading(false);
    Keyboard.dismiss();
  }

  useEffect(() => {
    async function save() {
      const storage = await AsyncStorage.getItem('users');

      if (storage) {
        setUsers(JSON.parse(storage));
      }
    }
    save();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Adicionar usuário"
          value={newUser}
          onChangeText={setNewUser}
          returnKeyType="send"
          onSubmitEditing={handleAddUser}
        />
        <SubmitButton loading={loading} onPress={handleAddUser}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Icon name="add" size={20} color="#fff" />
          )}
        </SubmitButton>
      </Form>
      <List
        data={users}
        keyExtractor={user => user.login}
        renderItem={({ item }) => (
          <User>
            <Avatar source={{ uri: item.avatar }} />
            <Name>{item.name}</Name>
            <Bio>{item.bio}</Bio>
            <ProfileButton
              loading={loading}
              onPress={() => navigation.navigate('User', { user: item })}
            >
              <ProfileButtonText>Ver Perfil</ProfileButtonText>
            </ProfileButton>
          </User>
        )}
      />
    </Container>
  );
}

Main.navigationOptions = {
  title: 'Usuários',
};

Main.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
