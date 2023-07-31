import styled, {ThemeContext} from 'styled-components/native';
import React, {memo, useContext, useEffect} from 'react';
import {RawReactionInterface} from '@base/core/types';
import StatusBarHelper from '@base/core/helpers/StatusBarHelper';
import Header from './Header';
import ReactionsList from './ReactionsList';

const SWrapper = styled.View`
  background-color: ${props => props.theme.backgroundColor};
  flex: 1;
`;

interface Props {
  reactions: RawReactionInterface[];
  onCloseRequest: () => any;
}
const Content = memo(({reactions, onCloseRequest}: Props) => {
  const theme = useContext(ThemeContext);

  // useEffect(() => {
  //     const updater = StatusBarHelper.pushStackEntry({
  //         backgroundColor: theme.primaryColor,
  //         barStyle: "light-content"
  //     });

  //     return () => {
  //         updater.pop();
  //     }
  // }, []);

  return (
    <SWrapper>
      <Header onCloseRequest={onCloseRequest} />

      <ReactionsList reacitons={reactions} />
    </SWrapper>
  );
});

export default Content;
