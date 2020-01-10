import { RectButton } from 'react-native-gesture-handler';

import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 30px;
`;
// border-bottom-width propriedade define a largura da borda inferior de um elemento.
export const Header = styled.View`
  align-items: center;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #eee;
`;
export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background: #eee;
`;
export const Name = styled.Text`
  font-size: 20px;
  color: #333;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
`;
export const Bio = styled.Text`
  font-size: 14px;
  line-height: 18px;
  color: #999;
  margin-top: 5px;
  text-align: center;
`;

export const Stars = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;
export const Starred = styled(RectButton)`
  flex-direction: row;
  background: #eee;
  padding: 10px 15px;
  margin-bottom: 20px;
  border-radius: 4px;
  align-items: center;
`;
export const OwnerAvatar = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 50px;
`;
export const Info = styled.View`
  margin-left: 20px;
`;
export const Title = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-weight: bold;
  font-size: 15px;
  color: #333;
`;
export const Author = styled.Text`
  font-size: 14px;
  color: #666;
  margin-top: 5px;
`;
