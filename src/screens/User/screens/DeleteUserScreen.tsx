import React, {memo, useCallback, useMemo, useState} from 'react';
import {styled} from '@/global';
import SubmitButtonColor from '@/components/Buttons/SubmitButtonColor';
import ScreenWrapper from '@/components/ScreenWrapper';
import {DynamicHeader} from '@/components/Header/DynamicHeader';
import {StyleSheet, TextInput} from 'react-native';
import {IC_SAD} from '@/assets';
import {Bold, Medium} from '@/components/CommonStyled';
import {Colors} from '@/themes';
import {goBack} from '@/utils/navigation';
import {requestDeleteUser} from '@/store/user/functions';
import {useAsyncFn} from '@/hooks/useAsyncFn';
import {getInfo} from '@/store/user';
import useAutoToastError from '@/hooks/useAutoToastError';
import {DynamicCheckbox} from '@/components/Checkbox';

export const DeleteUserScreen = memo(function () {
  const user = getInfo();
  const [confirm, setConfirm] = useState<boolean>(false);

  const [{loading, error}, call] = useAsyncFn(async () => {
    await requestDeleteUser(user.id, user.id.toString());
  }, []);

  const handleCheck = useCallback(() => {
    setConfirm(!confirm);
  }, [confirm]);

  useAutoToastError(error);

  return (
    <ScreenWrapper>
      <DynamicHeader title={'Xoá tài khoản'} />
      <Container>
        <SImage source={IC_SAD} />
        <ContainerContent>
          <STitle>Bạn có chắc chắn muốn xoá tài khoản không?</STitle>
          <SText>
            Nếu bạn xoá tài khoản: Tài khoản sẽ bị vô hiệu hoá & Toàn bộ dữ liệu
            của bạn sẽ bị xoá khỏi ứng dụng của chúng tôi.
          </SText>
          <WrapCheck>
            <DynamicCheckbox value={confirm} onPress={handleCheck} />
            <SConfirm>Đồng ý, Tôi muốn xoá tài khoản của mình.</SConfirm>
          </WrapCheck>
        </ContainerContent>
        <SRoundedButton
          // @ts-ignore
          style={
            !confirm
              ? [styles.submitButton, {opacity: 0.5}]
              : styles.submitButton
          }
          textStyle={styles.submitText}
          disabled={!confirm}
          title={'Xoá tài khoản'}
          onPress={call}
        />
        <SRoundedButton
          title={'Huỷ'}
          onPress={() => goBack()}
          style={styles.cancelButton}
          textStyle={styles.cancelText}
        />
      </Container>
    </ScreenWrapper>
  );
});

const Container = styled.ScrollView.attrs(props => ({
  contentContainerStyle: {
    flex: 1,
  },
}))`
  padding: 16px;
`;

const SImage = styled.Image`
  width: 150px;
  height: 150px;
  margin: 0 auto 20px;
`;

const STitle = styled(Bold)`
  font-size: 24px;
  color: ${Colors.gray1};
`;

const ContainerContent = styled.View`
  flex: 1;
  margin: 16px 0;
`;

const WrapCheck = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SConfirm = styled(Medium)`
  margin-left: 12px;
  color: ${Colors.gray1};
  font-size: 18px;
`;

const SText = styled(Medium)`
  font-size: 18px;
  color: ${Colors.gray1};
  margin-top: 12px;
`;

const SRoundedButton = styled(SubmitButtonColor)``;

const styles = StyleSheet.create({
  submitText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.backgroundColor,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.gray1,
  },
  submitButton: {
    backgroundColor: Colors.orange1,
  },
  cancelButton: {
    backgroundColor: Colors.backgroundColor,
    borderWidth: 1,
    borderColor: Colors.gray3,
  },
  inputText: {
    borderWidth: 1,
    borderColor: Colors.gray2,
    borderRadius: 10,
    paddingVertical: 16,
    paddingLeft: 12,
    marginTop: 12,
  },
});
