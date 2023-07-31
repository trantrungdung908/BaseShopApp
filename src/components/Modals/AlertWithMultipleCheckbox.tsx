import React, {memo, useCallback, useState} from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import {StyleSheet} from 'react-native';
import {Colors} from '@/themes';
import SubmitButtonColorWithValue from '@/components/Buttons/SubmitButtonColorWithValue';
import {Regular} from '@/components/CommonStyled';
import {DynamicCheckbox} from '@/components/Checkbox';
import {SelectorOption} from '@/components/BottomMenu';
import {scale} from '@/utils/scale';

interface Props {
  name: string;
  visible: boolean;
  hide: () => void;
  onPress?: (value?: string | number, keyName?: string) => void;
  keyName: string;
  labelButton?: string;
  colorButton?: string;
  options: SelectorOption[];
}

export const AlertWithMultipleCheckbox = memo(
  function AlertWithMultipleCheckbox({
    keyName,
    onPress,
    visible,
    hide,
    name,
    colorButton,
    labelButton,
    options,
  }: Props) {
    const [selectedValue, setSelectedValue] = useState<
      string | number | undefined
    >('');

    const onSubmit = useCallback(() => {
      onPress && onPress(selectedValue, keyName);
      hide();
    }, [onPress, selectedValue, keyName, hide]);

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
          {options.map(item => {
            const selected = item.value === selectedValue;
            return (
              <WrapperBox
                key={item.value}
                onPress={() => setSelectedValue(item.value)}>
                <SDynamicCheckbox value={selected} disabled />
                <Title>{item.label}</Title>
              </WrapperBox>
            );
          })}

          <SViewButton>
            <SubmitButtonColorWithValue
              color={colorButton ? colorButton : Colors.gray1}
              style={styles.buttonRight}
              textStyle={styles.textButton}
              title={labelButton ? labelButton : 'Gửi'}
              onPress={onSubmit}
            />
          </SViewButton>
        </SViewContainer>
      </Modal>
    );
  },
);

export default AlertWithMultipleCheckbox;

const Title = styled(Regular)<{color?: string}>`
  font-size: 14px;
  color: ${props => props.color || Colors.gray1};
  width: ${scale(280)}px;
`;

const SDynamicCheckbox = styled(DynamicCheckbox)`
  margin-right: 12px;
`;

const WrapperBox = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const SViewButton = styled.View`
  flex-direction: row;
  margin: 16px;
`;

const ModalTitle = styled(Regular)`
  color: ${Colors.gray1};
  font-size: 18px;
  line-height: 24px;
  text-align: left;
`;

const SViewContainer = styled.View`
  border-radius: 8px;
  background-color: ${Colors.backgroundColor};
  padding: 16px;
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
