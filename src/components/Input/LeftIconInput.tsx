import React from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

interface Props extends TextInputProps {
  containerStyle: ViewStyle;
  leftIconContainerStyle: ViewStyle;
  leftIcon: React.ReactElement<{}>;
  inputStyle?: TextStyle;
}

export const LeftIconInput = (props: Props) => {
  const {
    containerStyle,
    leftIconContainerStyle,
    leftIcon,
    inputStyle,
    ...restProps
  } = props;
  return (
    <View style={containerStyle}>
      <View
        style={StyleSheet.flatten([
          styles.iconContainer,
          leftIconContainerStyle,
        ])}>
        {leftIcon}
      </View>
      <TextInput
        {...restProps}
        style={StyleSheet.flatten([styles.input, inputStyle])}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  input: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 18,
    flex: 1,
    minHeight: 40,
  },
});
