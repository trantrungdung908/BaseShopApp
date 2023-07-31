import React, {memo, useCallback} from 'react';
import {RawUserInterface} from '@base/core/store/users/types';
import styled from 'styled-components/native';
import User from '@base/core/services/User';
import Avatar from '../Avatar';
import {TouchableWithoutFeedback} from 'react-native';


const SWrapper = styled.View`
  padding: 8px 16px;
  background-color: ${props => props.theme.backgroundColor};
  flex-direction: row;
  align-items: center;
`;

const InfoColumn = styled.View`
  margin-left: 12px;
  flex: 1;
`;

const SName = styled.Text`
  font-size: 15px;
  color: ${props => props.theme.primaryColor};
`;

const SDesc = styled.Text`
  color: ${props => props.theme.grey3};
  font-size: 13px;
`;

interface Props {
  user: RawUserInterface;
  onPress: (user: RawUserInterface) => any;
}
const SuggestionRow = memo(({user, onPress}: Props) => {
  const selfOnPress = useCallback(() => {
    onPress(user);
  }, [user, onPress]);

  return (
    <TouchableWithoutFeedback onPress={selfOnPress}>
      <SWrapper>
        <Avatar userId={user.id} size={40} />
        <InfoColumn>
          <SName numberOfLines={1}>{user.name}</SName>
          <SDesc numberOfLines={1}>{User(user).getDescription()}</SDesc>
        </InfoColumn>
      </SWrapper>
    </TouchableWithoutFeedback>;
  );
});

SuggestionRow.displayName = 'SuggestionRow';

export default SuggestionRow;
