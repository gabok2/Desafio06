import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

import PropTypes from 'prop-types';

import api from '../../services/api';
import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default function User({ navigation }) {
  User.navigationOptions = () => ({
    title: navigation.getParam('user').name,
  });

  const [starts, setStarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const user = navigation.getParam('user');

  async function loadPage(pageNumber = page, shouldRefresh = false) {
    const response = await api.get(
      `/users/${user.login}/starred?page=${pageNumber}`
    );

    setStarts(shouldRefresh ? response.data : [...starts, ...response.data]);
    setPage(pageNumber + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function refreshList() {
    setRefreshing(true);

    await loadPage(1, true);

    setRefreshing(false);
  }

  const handleNavigate = repository => {
    navigation.navigate('repoWeb', { repository });
  };

  return (
    <Container>
      <Header>
        <Avatar source={{ uri: user.avatar }} />
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </Header>
      {loading ? (
        <ActivityIndicator color="#111" />
      ) : (
        <Stars
          data={starts}
          keyExtractor={star => String(star.id)}
          onEndReached={() => loadPage()}
          onEndReachedThreshold={0.1}
          onRefresh={refreshList}
          refreshing={refreshing}
          renderItem={({ item }) => (
            <Starred onPress={() => handleNavigate(item)}>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />

              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
        />
      )}
    </Container>
  );
}

User.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }).isRequired,
};
