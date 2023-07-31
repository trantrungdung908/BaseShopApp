import React, {memo, useCallback, useMemo, useState} from 'react';
import {DynamicHeader} from '@/components/Header/DynamicHeader';
import ScreenWrapper, {ScreenScrollWrapper} from '@/components/ScreenWrapper';
import {styled} from '@/global';
import {Colors} from '@/themes';
import {Medium, Regular} from '@/components/CommonStyled';
import {Bold} from '@/BaseComponents';
import {VoucherItem} from '@/screens/Home/screens/VoucherScreen/components/VoucherItem';
import {VoucherItems} from '@/screens/Home/components/dummydata';
import {Platform, View} from 'react-native';

export const VoucherScreen = memo(function () {
  const [textVoucher, setTextVoucher] = useState<string>('');
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const handleVoucher = useCallback((value: string) => {
    setTextVoucher(value);
  }, []);

  const handleIsValid = useMemo(() => {
    return textVoucher.length < 5;
  }, [textVoucher.length]);

  const handleApply = useCallback(() => {}, []);

  return (
    <ScreenWrapper>
      <DynamicHeader title={'Chọn Voucher'} />
      <WrapInput>
        <InputVoucher
          placeholder={'Nhập mã voucher'}
          onChangeText={handleVoucher}
        />
        <TouchApply
          onPress={handleApply}
          disabled={handleIsValid}
          isValid={handleIsValid}>
          <STextApply>Áp dụng</STextApply>
        </TouchApply>
      </WrapInput>
      <Container>
        <SBold>Ưu đãi phí vận chuyển</SBold>
        <SText>Có thể chọn 1 Voucher</SText>
        <View>
          {VoucherItems.map((item, index) => {
            return <VoucherItem item={item} key={index} />;
          })}
        </View>
      </Container>
      <ContainerAcc>
        {isSelected && (
          <WrapText>
            <SBold>
              1 Voucher đã được chọn.{' '}
              <SBoldColor>Đã áp dụng Ưu đãi phí vận chuyển</SBoldColor>
            </SBold>
          </WrapText>
        )}
        <STouchAccept>
          <SAccept>Đồng ý</SAccept>
        </STouchAccept>
      </ContainerAcc>
    </ScreenWrapper>
  );
});

const WrapInput = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom-color: ${Colors.gray7};
  border-bottom-width: 1px;
`;

const InputVoucher = styled.TextInput`
  border-color: ${Colors.gray7};
  border-width: 1px;
  padding: ${Platform.OS === 'ios' ? 12 : 8}px;
  flex: 1;
  border-radius: 5px;
`;

const TouchApply = styled.TouchableOpacity<{isValid?: boolean}>`
  justify-content: center;
  margin-left: 10px;
  border-radius: 5px;
  padding: 10px;
  background-color: ${props => (props.isValid ? Colors.gray8 : Colors.orange1)};
`;

const STextApply = styled(Bold)`
  font-size: 16px;
  color: ${Colors.backgroundColor};
`;

const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
})`
  flex: 1;
`;

const SText = styled(Regular)`
  font-size: 14px;
  color: ${Colors.gray4};
`;

const WrapText = styled.View`
  margin: 10px 0;
`;
const SBold = styled(Bold)`
  font-size: 14px;
  margin-bottom: 2px;
  color: ${Colors.gray1};
`;

const SBoldColor = styled(SBold)`
  color: ${Colors.orange1};
  font-size: 14px;
`;

const STouchAccept = styled.TouchableOpacity`
  background-color: ${Colors.orange1};
  padding: 15px;
  border-radius: 4px;
`;

const SAccept = styled(Medium)`
  color: ${Colors.backgroundColor};
  text-align: center;
  font-size: 16px;
`;

const ContainerAcc = styled.SafeAreaView`
  background-color: ${Colors.backgroundColor};
  margin: 10px 20px 0px;
`;
