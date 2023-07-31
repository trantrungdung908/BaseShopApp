import React, {memo, useCallback, useMemo} from 'react';
import {styled} from '@/global';
import {
  Dimensions,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Colors} from '@/themes';
import {BaseOpacityButton} from '@/components/Buttons/BaseButton';
import {StyledIcon, StyledText} from '@/components/CommonStyled';
import DateTimePickerModal, {
  ReactNativeModalDateTimePickerProps,
} from 'react-native-modal-datetime-picker';
import moment from '@/services/MomentService';
import useBoolean from '@/hooks/useBoolean';
import {IC_CALENDAR, IC_CLOSE} from '@/assets';
import {getDateFormat, getDateFormatByTimeZone} from '@/services/FormatDate';

interface Props {
  placeholder?: string;
  isTimeZone?: boolean;
  value: string | number; // html
  keyName: string;
  mode: 'date' | 'time' | 'datetime';
  containerStyle?: ViewStyle;
  onChangeValue: (keyName: string, value: string) => void;
  dateTimePickerProps?: ReactNativeModalDateTimePickerProps;
  required?: boolean;
  format?: string;
  isButtonClearValue?: boolean;
}

const formatByMode = {
  date: 'DD-MM-YYYY',
  time: 'HH:mm',
  datetime: 'HH:mm DD/MM/YYYY',
};

const ContainerButton = styled.View`
  min-height: 56px;
  border-width: 1px;
  border-color: ${Colors.gray3};
  border-radius: 40px;
`;

const Row = styled.View`
  flex-direction: row;
`;

export const DateTimeBorder = memo(function InputBorder(props: Props) {
  const {
    value,
    keyName,
    placeholder,
    onChangeValue,
    containerStyle,
    mode,
    dateTimePickerProps,
    required,
    isTimeZone,
    format,
    isButtonClearValue,
  } = props;
  const [isModalVisible, showModal, hideModal] = useBoolean();

  const onPress = useCallback(() => {
    Keyboard.dismiss();
    showModal();
  }, [showModal]);

  const onChange = useCallback(
    (valueC: string) => {
      onChangeValue(keyName, valueC);
    },
    [onChangeValue, keyName],
  );

  const onConfirm = useCallback(
    (date: Date) => {
      hideModal();
      requestAnimationFrame(() => {
        onChange?.(
          moment(date).format(
            isTimeZone ? undefined : format || formatByMode[mode],
          ),
        );
      });
    },
    [hideModal, onChange, isTimeZone, format, mode],
  );

  const onClearSelect = useCallback(() => {
    onChangeValue(keyName, '');
  }, [keyName, onChangeValue]);

  const date = useMemo(() => {
    if (!value) {
      return new Date();
    }
    const momentTime = moment(value, format || formatByMode[mode]);
    return momentTime.isValid() ? momentTime.toDate() : new Date();
  }, [value, mode, format]);

  const valueFormat = useMemo(() => {
    if (isTimeZone) {
      return getDateFormatByTimeZone(value, format || formatByMode[mode]);
    }
    return value;
  }, [format, isTimeZone, mode, value]);

  return (
    <ContainerButton style={containerStyle}>
      <BaseOpacityButton onPress={onPress}>
        <Row>
          <View style={styles.btnViewTitle}>
            {value ? (
              <View>
                <StyledText.Grey1 style={styles.contentText}>
                  {valueFormat}
                </StyledText.Grey1>
              </View>
            ) : (
              <StyledText.Grey3 style={styles.contentText}>
                {placeholder}
              </StyledText.Grey3>
            )}
          </View>
          <View style={styles.viewDrop}>
            {isButtonClearValue && value !== '' && (
              <TouchableOpacity onPress={onClearSelect} style={styles.btnClear}>
                <ViewIcon style={styles.viewIcon}>
                  <StyledIcon.Grey6
                    style={styles.iconClear}
                    source={IC_CLOSE}
                  />
                </ViewIcon>
              </TouchableOpacity>
            )}
            <StyledIcon.Grey3 source={IC_CALENDAR} />
          </View>
        </Row>
      </BaseOpacityButton>
      <DateTimePickerModal
        mode={mode}
        isVisible={isModalVisible}
        onConfirm={onConfirm}
        onCancel={hideModal}
        date={date}
        {...dateTimePickerProps}
      />
    </ContainerButton>
  );
});

const ViewIcon = styled.View`
  background-color: ${Colors.gray2};
`;

const styles = StyleSheet.create({
  optionContainer: {
    marginHorizontal: 0,
  },
  titleText: {
    fontSize: 11,
    lineHeight: 13,
  },
  contentText: {
    fontSize: 15,
    lineHeight: 18,
    paddingTop: 4,
    color: Colors.gray2,
  },
  btnViewTitle: {
    flex: 1,
    paddingTop: 8,
    paddingLeft: 16,
    paddingRight: 12,
    justifyContent: 'center',
  },
  viewIcon: {
    width: 14,
    height: 14,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewDrop: {
    flexDirection: 'row',
    marginVertical: 16,
    marginRight: 16,
  },
  selectedText: {},
  maxHeightScroll: {
    maxHeight: Dimensions.get('window').height * 0.6,
  },
  filterPaddingHp: {},
  filtered: {
    color: Colors.blue1,
  },
  btnClear: {
    marginRight: -16,
    paddingRight: 20,
    marginTop: -16,
    marginBottom: -16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconClear: {
    width: 10,
    height: 10,
  },
});
