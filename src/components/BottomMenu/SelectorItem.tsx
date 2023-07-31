import React, {memo, useCallback} from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '@/themes/Colors';
import styled from 'styled-components/native';

const CheckIcon = styled.Image``;

const STranslatedText = styled.Text`
  flex: 1;
  color: ${Colors.gray1};
  font-size: 15px;
`;

export const UNIQUE_STRING = 'wework@unique123';

export interface SelectorOption {
  value: string | number | undefined;
  label: string;
  noTranslate?: boolean;
  icon?: ImageSourcePropType;
}

export interface SelectorItemProps {
  option: SelectorOption;
  onSelect?: (value: any) => void;
  selected: boolean;
  renderIcon?: (icon: ImageSourcePropType) => React.ReactElement | null;
  textStyle?: TextStyle;
}

export const SelectorItem = memo(function SelectorItem({
  onSelect,
  option,
  selected,
  renderIcon,
  textStyle,
}: SelectorItemProps) {
  const onPress = useCallback(() => {
    onSelect?.(option.value);
  }, [option, onSelect]);
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <>
        {option.icon &&
          (typeof renderIcon === 'function' ? (
            renderIcon(option.icon)
          ) : (
            <Image source={option.icon} style={styles.icon} />
          ))}
        <STranslatedText numberOfLines={1} style={textStyle}>
          {option?.label || ''}
        </STranslatedText>
        {selected && (
          <CheckIcon
            resizeMode="contain"
            style={styles.selectedIcon}
            source={require('@/assets/icons/check-round.png')}
          />
        )}
      </>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  menuItem: {
    width: '100%',
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  selectedIcon: {
    width: 16,
    height: 16,
    marginRight: 10,
    tintColor: Colors.black,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
});
