import {FilterBoxOption} from '@/components/Filter/types';
import React, {memo, useCallback} from 'react';
import {
  Dimensions,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import {Colors} from '@/themes';
import {styled} from '@/global';
import {StyledText} from '@/components/CommonStyled';
import {IC_CHECK} from '@/assets';
import {toBoolean} from '@/utils';

interface CheckboxBottomProps {
  label?: string;
  options: FilterBoxOption[];
  selectedValue?: string | number;
  placeholder?: string;
  inputName: string;
  onSelectOption: (inputName: string, value: string | number) => void;
  containerStyle?: ViewStyle;
  filtered?: boolean | undefined;
  required?: boolean | undefined;
}

export const CheckBoxBorder = memo(function CheckBoxBorder({
  inputName,
  label,
  options,
  selectedValue,
  placeholder = '',
  onSelectOption,
  containerStyle,
  required,
}: CheckboxBottomProps) {
  const onSelectOptionCb = useCallback(
    (value: string) => {
      Keyboard.dismiss();
      if (label) {
        onSelectOption(inputName, value);
      } else {
        onSelectOption(inputName, selectedValue === 'on' ? 'off' : 'on');
      }
    },
    [inputName, onSelectOption],
  );

  return (
    <View style={containerStyle}>
      <ContainerButton>
        {label && (
          <Row>
            <View style={styles.btnViewTitle}>
              <StyledText.Grey3 style={styles.titleText}>
                {label} {required ? ' *' : ''}
              </StyledText.Grey3>
            </View>
          </Row>
        )}
        <SViewWrapper isShowLabel={toBoolean(label)}>
          {options.map((option, index) => {
            const selected = label
              ? option.value === selectedValue
              : toBoolean(selectedValue === 'on' ? 1 : 0);

            return (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => onSelectOptionCb(String(option.value))}
                style={styles.optionContainer}
                key={index}>
                {selected ? <SImageCheck source={IC_CHECK} /> : <Checkbox />}
                <SText numberOfLines={1}>{option.label}</SText>
              </TouchableOpacity>
            );
          })}
        </SViewWrapper>
      </ContainerButton>
    </View>
  );
});

const Checkbox = styled.View`
  width: 24px;
  height: 24px;
  border-width: 1px;
  border-color: ${Colors.grey4};
  background-color: ${Colors.backgroundColor};
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  margin: 0px 10px;
`;

const SViewWrapper = styled.View<{isShowLabel: boolean}>`
  margin-bottom: ${props => (props.isShowLabel ? 8 : 0)}px;
  justify-content: center;
`;

const SImageCheck = styled.Image`
  margin: 0px 8px 0px 12px;
  justify-content: center;
`;
const SText = styled.Text`
  align-self: center;
  color: ${Colors.grey1};
`;

const ContainerButton = styled.View`
  min-height: 56px;
  border-width: 1px;
  border-color: ${Colors.grey5};
  border-radius: 8px;
  justify-content: center;
`;

const Row = styled.View`
  flex-direction: row;
`;

const styles = StyleSheet.create({
  optionContainer: {
    marginHorizontal: 0,
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 11,
    lineHeight: 13,
  },
  contentText: {
    fontSize: 15,
    lineHeight: 18,
    paddingTop: 4,
  },
  btnViewTitle: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
  },
  selectedText: {},
  maxHeightScroll: {
    maxHeight: Dimensions.get('window').height * 0.6,
  },
  filterPaddingHp: {},
  filtered: {
    color: Colors.blue1,
  },
});
