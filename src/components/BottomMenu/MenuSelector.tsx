import React, {memo, useCallback, useEffect, useState} from 'react';
import {
  SelectorItem,
  SelectorOption,
  UNIQUE_STRING,
} from '@/components/BottomMenu/SelectorItem';
import {
  ImageSourcePropType,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {ContentWrapper} from '@/components/BottomMenu/components';
import {BottomMenuHeader} from '@/components/BottomMenu/BottomMenuHeader';
import {ViewWrapper} from '@/components';
import {toBoolean} from '@/utils';

interface Props {
  label: string;
  options: SelectorOption[];
  selectedValue: string | string[];
  inputName: string;
  renderIcon?: (icon: ImageSourcePropType) => React.ReactElement | null;
  onSelectOption: (inputName: string, value: string | number) => void;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  onClearOption?: (inputName: string) => void;
  loading?: boolean;
}

export const MenuSelector = memo(function MenuSelector({
  label,
  options,
  selectedValue,
  inputName,
  renderIcon,
  onSelectOption,
  containerStyle,
  textStyle,
  loading,
}: Props) {
  const onSelectOptionCb = useCallback(
    (value: string | number) => {
      onSelectOption(inputName, value);
    },
    [inputName, onSelectOption],
  );
  return (
    <ContentWrapper style={containerStyle}>
      <BottomMenuHeader title={label} />
      <ViewWrapper>
        {options.map(option => {
          let selected;
          if (typeof selectedValue === 'string') {
            selected = (option?.value || '').toString() === selectedValue;
          } else {
            selected = toBoolean(
              selectedValue?.includes(`${(option?.value || '').toString()}`),
            );
          }

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
      </ViewWrapper>
    </ContentWrapper>
  );
});

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
