import React, {memo} from 'react';
import {ActivityIndicator, StyleSheet, View, ViewStyle} from 'react-native';
import styled from 'styled-components/native';

interface OwnProps {
  containerStyle?: ViewStyle;
}

type Props = OwnProps;

const SActivityIndicator = styled(ActivityIndicator).attrs(props => ({
  color: props.theme.gray1,
}))``;

export const LoadingView = memo((props: Props) => {
  return (
    <View style={StyleSheet.flatten([styles.container, props.containerStyle])}>
      <SActivityIndicator />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingTop: 50,
  },
});
