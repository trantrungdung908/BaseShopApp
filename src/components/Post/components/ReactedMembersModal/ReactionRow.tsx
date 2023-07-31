import React, {memo} from 'react';
import styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native';
import {RawReactionInterface} from '@/types';
import useBoolean from '@/hooks/useBoolean';

const SWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
`;

const SAvatarWrapper = styled.View`
  position: relative;
`;

const SAvatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

const SReactionImage = styled.Image`
  position: absolute;
  bottom: 0;
  right: -8px;
  width: 20px;
  height: 20px;
`;

const SNameWrapper = styled.View`
  margin-left: 22px;
  flex: 1;
`;

const SName = styled.Text`
  line-height: 20px;
  font-size: 15px;
  color: ${props => props.theme.grey1};
`;

const SDesc = styled.Text`
  color: ${props => props.theme.grey3};
  font-size: 15px;
`;

interface Props {
  reaction: RawReactionInterface;
}
const ReactionRow = memo(({reaction}: Props) => {
  const [isProfileVisible, setProfileOn, setProfileOff] = useBoolean(false);

  // const user = useUser(reaction.user_id);
  // const gavatar = useMemo(() => User.getGavatarImageSource(user), [user]);
  // const desc = useMemo(() => (user ? User(user).getDescription() : ''), [user]);
  return (
    <SWrapper>
      <TouchableWithoutFeedback onPress={setProfileOn}>
        <SAvatarWrapper>
          {/*<SAvatar source={gavatar} />*/}
          {/*<SReactionImage*/}
          {/*  source={Reaction.getReactionImage(reaction.reaction)}*/}
          {/*/>*/}
        </SAvatarWrapper>
      </TouchableWithoutFeedback>

      <SNameWrapper>
        <SName numberOfLines={1}>
          {/*{user ? user.name : 'Unknown User ' + reaction.user_id}*/}
        </SName>
        {/*{!!desc && <SDesc numberOfLines={1}>{desc}</SDesc>}*/}
      </SNameWrapper>

      {/*<ProfileModal*/}
      {/*  isVisible={isProfileVisible}*/}
      {/*  onCloseRequest={setProfileOff}*/}
      {/*  userId={reaction.user_id}*/}
      {/*/>*/}
    </SWrapper>
  );
});

ReactionRow.displayName = 'ReactionRow';

export default ReactionRow;
