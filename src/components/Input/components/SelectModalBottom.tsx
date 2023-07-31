import {
  FilterBoxOption,
  FilterModalBottomProps,
} from '@/components/Filter/types';
import React, {memo, useCallback, useMemo, useState} from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BottomMenuContainer,
  BottomMenuHeader,
  BottomMenuModal,
} from '@/components/BottomMenu';

import {Colors} from '@/themes';
import {styled} from '@/global';
import {BaseOpacityButton} from '@/components/Buttons/BaseButton';
import {StyledIcon, StyledText} from '@/components/CommonStyled';
import {FilterModalItem} from '@/components/Filter/FilterModalItem';
import {IC_CLOSE, IC_DROPDOWN} from '@/assets';
import {SearchBar} from '@/components/SearchBar';
import {normalizeStringForSearch} from '@/utils/string';

type Props = FilterModalBottomProps;

const ContainerButton = styled.View`
  flex: 1;
`;

const Row = styled.View`
  flex-direction: row;
`;
const Icon = styled.Image`
  tint-color: ${Colors.gray1};
  width: 24px;
  height: 24px;
`;

const Container = styled(View)<{disabled?: boolean}>`
  min-height: 50px;
  background-color: ${Colors.backgroundColor};
  flex-direction: row;
  overflow: hidden;
`;

export const SelectModalBottom = memo(function SelectModalBottom({
  inputName,
  label,
  options,
  selectedValue,
  placeholder = '',
  onSelectOption,
  renderIcon,
  containerStyle,
  father,
  hideBottom,
  optionsChildren,
  isButtonClearValue,
  isSearch,
  ...props
}: Props) {
  const [visible, setVisible] = useState(false);
  const [isSeeMore, setSeeMore] = useState(false);
  const [textSearch, setTextSearch] = useState('');

  const getOptions = useMemo(() => {
    let allIds: FilterBoxOption[] = [];

    options.map((item: FilterBoxOption) => {
      let key = normalizeStringForSearch(item.label);
      if (key.includes(normalizeStringForSearch(textSearch))) {
        allIds.push(item);
      }
    });
    return allIds;
  }, [textSearch, options]);
  const selectedOption: FilterBoxOption | undefined = useMemo(() => {
    return options
      ? optionsChildren
        ? optionsChildren.filter(
            (option: {value: any}) => option.value === selectedValue,
          )[0]
        : options.filter(
            (option: {value: any}) => option.value === selectedValue,
          )[0]
      : undefined;
  }, [options, optionsChildren, selectedValue]);

  const selectedOptionLabel = useMemo(
    () => (selectedOption ? selectedOption.label : ''),
    [selectedOption],
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

  const onSelectOptionCb = useCallback(
    (value: string | number) => {
      !father && setVisible(false);
      setSeeMore(false);
      setTextSearch('');
      hideBottom && hideBottom();
      onSelectOption(inputName, value);
    },
    [father, hideBottom, inputName, onSelectOption],
  );

  const onClearSelect = useCallback(() => {
    onSelectOption(inputName, '');
  }, [inputName, onSelectOption]);

  const showMenu = useCallback(() => {
    Keyboard.dismiss();
    setVisible(true);
  }, []);

  const hideMenu = useCallback(() => {
    setVisible(false);
    setSeeMore(false);
    setTextSearch('');
    hideBottom && hideBottom();
  }, [hideBottom]);

  const onPressSeeMore = useCallback(() => {
    setSeeMore(!isSeeMore);
  }, [isSeeMore]);

  return (
    <View style={containerStyle}>
      <ContainerTitleHeader>
        <TitleHeader>{label}</TitleHeader>
      </ContainerTitleHeader>
      <Container {...props}>
        <ContainerButton>
          <BaseOpacityButton onPress={showMenu}>
            <Row>
              <View style={styles.btnViewTitle}>
                {text ? (
                  <STranslatedText numberOfLines={1}>{text}</STranslatedText>
                ) : (
                  <StyledText.Grey3
                    numberOfLines={1}
                    style={styles.contentText}>
                    {placeholder}
                  </StyledText.Grey3>
                )}
              </View>

              <View style={styles.viewDrop}>
                {isButtonClearValue && text != '' && (
                  <TouchableOpacity
                    onPress={onClearSelect}
                    style={styles.btnClear}>
                    <ViewIcon style={styles.viewIcon}>
                      <StyledIcon.Grey6
                        style={styles.iconClear}
                        source={IC_CLOSE}
                      />
                    </ViewIcon>
                  </TouchableOpacity>
                )}
                <Icon resizeMode={'contain'} source={IC_DROPDOWN} />
              </View>
            </Row>
          </BaseOpacityButton>
        </ContainerButton>
      </Container>

      <BottomMenuModal
        isVisible={visible}
        onClose={hideMenu}
        propagateSwipe={true}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <BottomMenuContainer>
            <BottomMenuHeader title={label} onClose={hideMenu} />
            {isSearch && (
              <SearchBar
                containerStyle={styles.search}
                onSearchTextChange={setTextSearch}
              />
            )}
            <ScrollView
              keyboardDismissMode={'interactive'}
              keyboardShouldPersistTaps={'always'}
              style={[
                styles.maxHeightScroll,
                isSearch
                  ? {
                      maxHeight:
                        Dimensions.get('window').height *
                        (Platform.OS === 'ios' ? 0.4 : 0.3),
                    }
                  : {},
              ]}>
              {getOptions
                .slice(0, isSeeMore ? options.length : 20)
                .map((option, index) => {
                  const selected = option.value === selectedValue;
                  return (
                    <View
                      style={styles.optionContainer}
                      key={
                        ((option.value && option.value.toString()) || '') +
                        index.toString()
                      }>
                      <View>
                        <FilterModalItem
                          option={option}
                          renderIcon={renderIcon}
                          selected={selected}
                          onSelect={onSelectOptionCb}
                        />
                      </View>
                    </View>
                  );
                })}

              {getOptions.length > 20 &&
                isSearch &&
                textSearch == '' &&
                !isSeeMore && (
                  <SButton onPress={onPressSeeMore}>
                    <StyledText.Grey3>{'See more'}</StyledText.Grey3>
                  </SButton>
                )}
            </ScrollView>
            {options && options.length <= 0 && (
              <STextEmpty onPress={onClearSelect}>{'See more'}</STextEmpty>
            )}
          </BottomMenuContainer>
        </KeyboardAvoidingView>
      </BottomMenuModal>
    </View>
  );
});

const STranslatedText = styled.Text`
  flex: 1;
  color: ${Colors.gray2};
  font-size: 16px;
`;

const ContainerTitleHeader = styled.View`
  margin-bottom: 12px;
`;

const TitleHeader = styled.Text`
  font-size: 14px;
`;

const STextEmpty = styled.Text`
  color: ${Colors.gray5};
  font-size: 14px;
  padding: 8px 16px;
  height: 50px;
`;

const ViewIcon = styled.View`
  background-color: ${Colors.gray5};
`;
const SButton = styled.TouchableOpacity`
  align-items: center;
  height: 40px;
`;

const styles = StyleSheet.create({
  optionContainer: {
    margin: 12,
  },
  viewDrop: {
    flexDirection: 'row',
    marginVertical: 8,
    marginRight: 8,
  },
  titleText: {
    paddingTop: 4,
    fontSize: 11,
    lineHeight: 13,
  },
  contentText: {
    fontSize: 15,
    lineHeight: 18,
    paddingTop: 2,
  },
  btnViewTitle: {
    flex: 1,
    paddingTop: 8,
    paddingLeft: 12,
  },
  selectedText: {},
  maxHeightScroll: {
    maxHeight: Dimensions.get('window').height * 0.4,
  },
  search: {
    marginTop: 16,
  },
  filtered: {
    color: Colors.blue1,
  },
  btnClear: {
    paddingRight: 8,
    paddingLeft: 8,
    marginTop: -16,
    marginBottom: -16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconClear: {
    width: 10,
    height: 10,
  },
  viewIcon: {
    width: 14,
    height: 14,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
