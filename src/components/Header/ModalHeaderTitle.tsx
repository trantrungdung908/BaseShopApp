import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {styled} from '@/global';
import {StyledText} from '../CommonStyled';
import {Colors} from '@/themes';

interface ModalHeaderTitleProps {
  title?: string;
  style?: StyleProp<ViewStyle>;
  noTranslateTitle?: string;
  smallText?: boolean;
  placement?: 'center' | 'left' | 'right';
}

const Title = styled(StyledText.Medium)`
  font-size: 20px;
  color: ${Colors.white};
  line-height: 22px;
`;

export class ModalHeaderTitle extends React.PureComponent<
  ModalHeaderTitleProps,
  any
> {
  constructor(props: ModalHeaderTitleProps) {
    super(props);
  }

  render() {
    return (
      <Title
        numberOfLines={1}
        style={StyleSheet.flatten([
          this.props.placement === 'left' && styles.titleLeft,
          this.props.placement === 'right' && styles.titleRight,
          this.props.style,
        ])}>
        {this.props.title}
      </Title>
    );
  }
}

const styles = StyleSheet.create({
  titleLeft: {
    paddingLeft: 16,
  },
  titleRight: {
    paddingLeft: 16,
  },
});
