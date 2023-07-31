import React, {
  memo,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {styled} from '@/global';
import {
  Animated,
  KeyboardType,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {Colors} from '@/themes';
import {StyledText} from '@/components/CommonStyled';
import useBoolean from '@/hooks/useBoolean';
import {scale} from '@/utils/scale';

const Container = styled.View<{disabled?: boolean}>`
  min-height: 50px;
  border-width: 1px;
  border-color: ${Colors.gray3};
  border-radius: 40px;
  background-color: ${props =>
    props.disabled ? Colors.gray6 : Colors.backgroundColor};
  flex-direction: row;
  padding: 0px 8px;
`;

const STextInput = styled.TextInput`
  color: ${Colors.gray1};
`;

interface Props {
  containerStyle?: ViewStyle;
  value: string;
  keyName: string;
  placeHolder: string;
  multiline?: boolean;
  onTextChange: (keyName: string, value: string) => void;
  disabled?: boolean;
  rightComponent?: ReactElement;
  keyboardType?: KeyboardType;
  required?: boolean;
  secureTextEntry?: boolean;
}

export const InputBorder = memo(function InputBorder(props: Props) {
  const {
    placeHolder,
    value,
    keyName,
    onTextChange,
    disabled,
    containerStyle,
    rightComponent,
    multiline,
    keyboardType,
    required,
    secureTextEntry,
  } = props;
  const inputRef = useRef<TextInput>(null);
  const [isFocus, setFocus, setNoFocus] = useBoolean(false);
  let focusedAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

  const toggle = useCallback(
    (isActive: boolean) => {
      Animated.timing(focusedAnim, {
        toValue: isActive ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    },
    [focusedAnim],
  );

  useEffect(() => {
    if (!isFocus) {
      toggle(!!value);
    }
  }, [value, toggle, isFocus]);

  const focus = useCallback(() => {
    inputRef.current && inputRef.current.focus();
  }, [inputRef]);

  const onChange = useCallback(
    (_value: string) => {
      onTextChange(keyName, _value);
    },
    [onTextChange, keyName],
  );
  const onFocus = useCallback(() => {
    if (disabled) {
      return;
    }
    setFocus();
    toggle(true);
  }, [disabled, setFocus, toggle]);

  const onBlur = useCallback(() => {
    setNoFocus();
    toggle(false);
  }, [setNoFocus, toggle]);

  const setRequired = useMemo(() => {
    return required ? ' *' : '';
  }, [required]);

  return (
    <Container disabled={disabled} style={containerStyle}>
      <View style={styles.contentContainer}>
        <TouchableWithoutFeedback onPress={focus}>
          <Animated.View
            style={{
              position: 'absolute',
              left: 10,
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
              {placeHolder}
              <Text style={styles.textRequired}>{setRequired}</Text>
            </Animated.Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        <View style={styles.valueView}>
          {disabled ? (
            <StyledText.Grey1
              numberOfLines={Platform.OS == 'ios' ? 10 : 1}
              style={styles.textInputLabel}>
              {value}
            </StyledText.Grey1>
          ) : (
            <STextInput
              multiline={multiline}
              autoCapitalize={'none'}
              ref={inputRef}
              style={styles.textInput}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              onFocus={onFocus}
              underlineColorAndroid={'transparent'}
              keyboardType={keyboardType}
              secureTextEntry={secureTextEntry}
            />
          )}
        </View>
      </View>
      {rightComponent && rightComponent}
    </Container>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingBottom: Platform.OS === 'android' ? 8 : 32,
  },
  valueView: {
    top: scale(14),
    left: 0,
    paddingLeft: 12,
    paddingRight: 12,
  },
  label: {
    backgroundColor: 'transparent',
  },
  textInputLabel: {
    paddingLeft: 0,
    paddingTop: Platform.OS === 'android' ? 8 : 2,
    fontSize: 15,
    lineHeight: 18,
    textAlignVertical: 'top',
  },
  textInput: {
    paddingLeft: 0,
    paddingTop: Platform.OS === 'android' ? 8 : 4,
    fontSize: 14,
    lineHeight: 18,
    textAlignVertical: 'top',
    fontWeight: '500',
  },
  textRequired: {
    fontSize: 14,
    color: Colors.red2,
  },
});
