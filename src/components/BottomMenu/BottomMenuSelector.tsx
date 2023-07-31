import React, {memo, useCallback, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  ImageSourcePropType,
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {SelectorItem, SelectorOption, UNIQUE_STRING} from './SelectorItem';

import {
  Button,
  Content,
  ContentWrapper,
  Icon,
  TextWrapper,
  Wrapper,
} from './components';
import {BottomMenuModal} from './BottomMenuModal';
import {BottomMenuContainer} from './BottomMenuContainer';
import {BottomMenuHeader} from './BottomMenuHeader';
import styled from 'styled-components/native';
import {Colors} from '@/themes';
import {Regular} from '../CommonStyled';
import ToastService from '@/services/ToastService';

const SText = styled(Content)<{hasValue: boolean}>`
  padding-top: ${Platform.OS === 'android' ? 4 : 4}px;
  font-size: 14px;
  color: ${Colors.gray2};
`;
const SIcon = styled.Image`
  position: absolute;
  right: 10px;
  top: 50%;
  tint-color: ${Colors.gray2};
`;

interface Props {
  label: string;
  options: SelectorOption[];
  selectedValue?: string | number;
  placeholder?: string;
  inputName: string;
  renderIcon?: (icon: ImageSourcePropType) => React.ReactElement | null;
  onSelectOption: (inputName: string, value: string | number) => void;
  containerStyle?: ViewStyle;
  filtered?: boolean | undefined;
  textStyle?: TextStyle;
  isHiddenAnimated?: boolean;
  onClearOption?: (inputName: string) => void;
  loading?: boolean;
  errorNull?: string;
}

export const BottomMenuSelector = memo(
  ({
    inputName,
    label,
    options,
    selectedValue,
    placeholder = '',
    onSelectOption,
    renderIcon,
    textStyle,
    isHiddenAnimated,
    containerStyle,
    onClearOption,
    loading,
    errorNull,
  }: Props) => {
    const [visible, setVisible] = useState(false);
    let focusedAnim = useRef(new Animated.Value(selectedValue ? 1 : 0)).current;
    const selectedOption: SelectorOption | undefined = useMemo(() => {
      return options
        ? options.filter(option => option.value === selectedValue)[0]
        : undefined;
    }, [options, selectedValue]);

    const selectedOptionLabel = useMemo(
      () => (selectedOption ? selectedOption.label : placeholder),
      [selectedOption, placeholder],
    );

    const noTranslate = useMemo(
      () => (selectedOption ? !!selectedOption.noTranslate : false),
      [selectedOption],
    );

    const text = selectedOption
      ? noTranslate
        ? selectedOptionLabel
        : selectedOptionLabel
      : '';

    const hideMenu = useCallback(() => {
      setVisible(false);
    }, []);

    const onSelectOptionCb = useCallback(
      (value: string | number) => {
        hideMenu();
        onSelectOption(inputName, value);
      },
      [inputName, onSelectOption, hideMenu],
    );

    const onClearOptionCb = useCallback(() => {
      hideMenu();
      onClearOption && onClearOption(inputName);
    }, [hideMenu, inputName, onClearOption]);

    const showMenu = useCallback(() => {
      if (options.length === 0) {
        ToastService.showError(errorNull);
        return;
      }
      setVisible(true);
      Keyboard.dismiss();
    }, [options]);

    return (
      <Wrapper style={containerStyle}>
        {isHiddenAnimated ? (
          <Button onPress={showMenu}>
            <TextWrapper>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <ContentWrapper>
                  <SText
                    style={textStyle}
                    hasValue={!!selectedOption}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {text === '' ? placeholder : text}
                  </SText>
                </ContentWrapper>
              )}
            </TextWrapper>
            <SIcon source={require('@/assets/icons/arrow-down.png')} />
          </Button>
        ) : (
          <Container onPress={showMenu}>
            <Animated.View
              style={{
                position: 'absolute',
                flexDirection: 'row',
                left: 20,
                top: focusedAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [18, -8],
                }),
              }}>
              <Animated.Text
                numberOfLines={1}
                style={[
                  styles.label,
                  {
                    fontSize: focusedAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [14, 12],
                    }),
                    color: Colors.gray2,
                    textShadowColor: Colors.white,
                    backgroundColor: Colors.white,
                  },
                ]}>
                {placeholder}
              </Animated.Text>
            </Animated.View>
            {text !== '' && (
              <TextWrapper>
                <ContentWrapper>
                  <SText
                    style={textStyle}
                    hasValue={!!selectedOption}
                    numberOfLines={1}
                    ellipsizeMode="clip">
                    {text}
                  </SText>
                </ContentWrapper>
              </TextWrapper>
            )}
            <Icon source={require('@/assets/icons/arrow-down.png')} />
          </Container>
        )}

        <BottomMenuModal
          isVisible={visible}
          onClose={hideMenu}
          propagateSwipe={true}>
          <BottomMenuContainer>
            <BottomMenuHeader title={label} onClose={hideMenu}>
              <TouchableOpacity onPress={onClearOptionCb} style={styles.cancel}>
                <Regular>{'Bỏ chọn'}</Regular>
              </TouchableOpacity>
            </BottomMenuHeader>
            <ScrollView style={styles.maxHeightScroll}>
              {options.map(option => {
                const selected = option.value === selectedValue;
                return (
                  <View
                    style={styles.optionContainer}
                    key={option.value || UNIQUE_STRING}>
                    <SelectorItem
                      option={option}
                      renderIcon={renderIcon}
                      selected={selected}
                      onSelect={onSelectOptionCb}
                    />
                  </View>
                );
              })}
            </ScrollView>
          </BottomMenuContainer>
        </BottomMenuModal>
      </Wrapper>
    );
  },
);

const Container = styled.TouchableOpacity`
  min-height: 50px;
  padding: 8px 16px 8px 8px;
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
`;

const styles = StyleSheet.create({
  optionContainer: {
    marginHorizontal: 0,
  },
  cancel: {
    padding: 12,
    paddingRight: 0,
  },
  maxHeightScroll: {
    maxHeight: 500,
  },
  label: {
    backgroundColor: 'transparent',
  },
});
