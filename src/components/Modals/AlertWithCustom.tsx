import React, {memo, useCallback, useState} from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import {InteractionManager, StyleSheet} from 'react-native';
import {Colors} from '@/themes';
import {translate} from '@/global';
import SubmitButtonColorWithValue from '@/components/Buttons/SubmitButtonColorWithValue';
import {Bold, Regular} from '@/components/CommonStyled';
import SubmitButtonColor from '@/components/Buttons/SubmitButtonColor';

interface Props {
  name: string;
  visible: boolean;
  hide: () => void;
  onPress: (text: string, keyName?: string) => void;
  onPressCancel?: (text?: string, keyNameCancel?: string) => void;
  keyName?: string;
  keyNameCancel?: string;
  title: string;
}

export const AlertWithCustom = memo(function AlertWithCustom({
  keyName,
  onPress,
  visible,
  hide,
  name,
  onPressCancel,
  title,
  keyNameCancel,
}: Props) {
  const [text, setText] = useState<string>('');

  const onPressLeft = useCallback(() => {
    InteractionManager.runAfterInteractions(() => {
      hide();
    });
    onPress(text, keyName);
  }, [onPress, text, keyName, hide]);

  const onPressRight = useCallback(() => {
    onPressCancel ? onPressCancel(text, keyNameCancel) : hide();
  }, [hide, keyNameCancel, onPressCancel, text]);

  return (
    <Modal
      isVisible={visible}
      hideModalContentWhileAnimating={true}
      useNativeDriver={true}
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}
      backdropTransitionOutTiming={0}
      onBackButtonPress={hide}
      onBackdropPress={hide}
      style={styles.modal}>
      <SViewContainer>
        <ModalTitle>{name}</ModalTitle>
        {title !== '' ? <SubTitle>{title}</SubTitle> : null}
        <SViewButton>
          <SubmitButtonColor
            color={Colors.gray3}
            style={styles.button}
            textStyle={styles.textButtonLeft}
            title={'Huỷ'}
            onPress={onPressLeft}
          />

          <SubmitButtonColor
            color={Colors.orange1}
            style={styles.buttonRight}
            textStyle={styles.textButtonRight}
            title={'Xác nhận'}
            onPress={onPressRight}
          />
        </SViewButton>
      </SViewContainer>
    </Modal>
  );
});

export default AlertWithCustom;

const SViewButton = styled.View`
  flex-direction: row;
  margin: 16px;
`;

const ModalTitle = styled(Bold)`
  color: ${Colors.gray1};
  padding: 20px;
  font-size: 20px;
  line-height: 24px;
  text-align: left;
`;

const SViewContainer = styled.View`
  border-radius: 8px;
  background-color: ${Colors.backgroundColor};
  align-items: center;
`;
const SubTitle = styled(Regular)`
  padding-left: 16px;
  font-size: 16px;
`;
const styles = StyleSheet.create({
  modal: {
    flex: 1,
    zIndex: 1,
  },
  textInput: {
    marginLeft: 16,
    marginRight: 16,
  },
  button: {
    flex: 1,
    marginRight: 8,
    paddingLeft: 8,
    paddingRight: 8,
  },

  buttonRight: {
    flex: 1,
    marginLeft: 8,
  },
  textButtonLeft: {
    fontSize: 16,
    color: Colors.gray1,
  },
  textButtonRight: {
    fontSize: 16,
    color: Colors.white,
  },
});
