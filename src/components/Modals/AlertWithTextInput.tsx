import React, {memo, useCallback, useState} from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import {InteractionManager, StyleSheet} from 'react-native';
import {Colors} from '@/themes';
import {InputBorder} from '@/components/Input/components/InputBorder';
import {translate} from '@/global';
import SubmitButtonColorWithValue from '@/components/Buttons/SubmitButtonColorWithValue';
import {Regular} from '@/components/CommonStyled';

interface Props {
  name: string;
  visible: boolean;
  hide: () => void;
  onPress: (text: string, keyName?: string) => void;
  onPressCancel?: (text?: string, keyNameCancel?: string) => void;
  keyName?: string;
  keyNameCancel?: string;
  placeholder?: string;
  labelButtonLeft?: string;
  colorButtonLeft?: string;
  labelButtonRight?: string;
  colorButtonRight?: string;
  subLabel?: string;
}

export const AlertWithTextInput = memo(function AlertWithTextInput({
  keyName,
  onPress,
  visible,
  hide,
  name,
  placeholder,
  onPressCancel,
  labelButtonLeft,
  colorButtonLeft,
  colorButtonRight,
  labelButtonRight,
  subLabel,
  keyNameCancel,
}: Props) {
  const [text, setText] = useState<string>('');
  const onChangeText = useCallback((keyNameInput: string, value: string) => {
    setText(value);
  }, []);

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
        {subLabel !== '' ? <SubTitle>{subLabel}</SubTitle> : null}
        <InputBorder
          containerStyle={styles.textInput}
          value={text}
          keyName={''}
          placeHolder={placeholder || ''}
          onTextChange={onChangeText}
          multiline={true}
        />

        <SViewButton>
          <SubmitButtonColorWithValue
            color={colorButtonLeft ? colorButtonLeft : Colors.green1}
            style={styles.button}
            textStyle={styles.textButton}
            title={labelButtonLeft ? labelButtonLeft : translate('common.yes')}
            onPress={onPressLeft}
          />

          <SubmitButtonColorWithValue
            color={colorButtonRight ? colorButtonRight : Colors.gray3}
            style={styles.buttonRight}
            textStyle={styles.textButton}
            title={
              labelButtonRight ? labelButtonRight : translate('Timeoff.cancel')
            }
            onPress={onPressRight}
          />
        </SViewButton>
      </SViewContainer>
    </Modal>
  );
});

export default AlertWithTextInput;

const SViewButton = styled.View`
  flex-direction: row;
  margin: 16px;
`;

const ModalTitle = styled(Regular)`
  color: ${Colors.gray1};
  padding: 16px;
  font-size: 18px;
  line-height: 24px;
  text-align: left;
`;

const SViewContainer = styled.View`
  border-radius: 8px;
  background-color: ${Colors.backgroundColor};
`;
const SubTitle = styled.Text`
  padding-left: 16px;
  margin-top: -12px;
  margin-bottom: 12px;
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
  textButton: {
    fontSize: 16,
  },
});
