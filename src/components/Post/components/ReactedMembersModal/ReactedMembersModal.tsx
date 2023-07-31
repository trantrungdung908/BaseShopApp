import React, {memo} from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import {RawReactionInterface} from '@base/core/types';
import Content from './Content';

const SModal = styled(Modal)`
  margin: 0;
  flex: 1;
`;

interface Props {
  isVisible: boolean;
  onCloseRequest: () => any;
  reactions: RawReactionInterface[];
}
const ReactedMembersModal = memo(
  ({isVisible, onCloseRequest, reactions}: Props) => {
    return (
      <SModal
        isVisible={isVisible}
        onDismiss={onCloseRequest}
        onSwipeComplete={onCloseRequest}
        onBackdropPress={onCloseRequest}
        onBackButtonPress={onCloseRequest}
        swipeDirection={'down'}
        propagateSwipe>
        <Content reactions={reactions} onCloseRequest={onCloseRequest} />
      </SModal>
    );
  },
);

ReactedMembersModal.displayName = 'ReactedMembersModal';

export default ReactedMembersModal;
