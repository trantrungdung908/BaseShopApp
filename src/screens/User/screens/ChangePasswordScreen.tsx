import React, {memo, useCallback, useMemo, useState} from 'react';
import {styled} from '@/global';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import SubmitButtonColor from '@/components/Buttons/SubmitButtonColor';
import {scale} from '@/utils/scale';
import ScreenWrapper from '@/components/ScreenWrapper';
import {DynamicHeader} from '@/components/Header/DynamicHeader';
import {InputBorder} from '@/components/Input/components/InputBorder';
import {StyleSheet} from 'react-native';
import {useAsyncFn} from '@/hooks/useAsyncFn';
import {requestChangePassword} from '@/store/user/functions';
import {getInfo, reset, setAccessToken} from '@/store/user';
import useAutoToastError from '@/hooks/useAutoToastError';
import ToastService from '@/services/ToastService';
import {useAuthContext} from '@/screens/Login/authContext';
import {IC_EYE, IC_EYE_CLOSE} from '@/assets';
import {Icon} from '@/components/Views/Icon';

interface ModalChangePasswordInterface {
  new_password: string;
  re_new_password: string;
}

interface ParamsHiddenPassword {
  new_password: boolean;
  re_new_password: boolean;
}

export const ChangePasswordScreen = memo(function () {
  const [paramsCustom, setParamsCustom] =
    useState<ModalChangePasswordInterface>({
      new_password: '',
      re_new_password: '',
    });

  const [paramsHiddenPassword, setParamsHiddenPassword] =
    useState<ParamsHiddenPassword>({
      new_password: true,
      re_new_password: true,
    });

  const onChangeParamsHiddenPassword = useCallback((value: string) => {
    setParamsHiddenPassword(state => ({
      ...state,
      // @ts-ignore
      [value]: !state[value],
    }));
  }, []);

  const {handleLogout} = useAuthContext();

  const user = getInfo();

  const [{loading, error}, call] = useAsyncFn(async () => {
    if (paramsCustom.new_password !== paramsCustom.re_new_password) {
      return ToastService.showError('Mật khẩu không trùng khớp');
    }
    await requestChangePassword(paramsCustom.new_password, user.id.toString());
    ToastService.show('Đổi mật khẩu thành công');
    await handleLogout();
  }, [paramsCustom]);

  const onChangeText = useCallback((keyName: string, value: string) => {
    setParamsCustom(state => ({...state, [keyName]: value}));
  }, []);

  const passwordHidden = useMemo(() => {
    return (
      <STouchEye onPress={() => onChangeParamsHiddenPassword('new_password')}>
        <Icon
          source={!paramsHiddenPassword.new_password ? IC_EYE_CLOSE : IC_EYE}
          size={16}
        />
      </STouchEye>
    );
  }, [onChangeParamsHiddenPassword, paramsHiddenPassword.new_password]);

  useAutoToastError(error);

  return (
    <ScreenWrapper>
      <DynamicHeader title={'Đổi mật khẩu'} />
      <Container>
        <InputBorder
          value={paramsCustom.new_password}
          keyName={'new_password'}
          placeHolder={'Mật khẩu mới'}
          onTextChange={onChangeText}
          containerStyle={styles.containerInput}
          secureTextEntry={paramsHiddenPassword.new_password}
          rightComponent={passwordHidden}
        />
        <InputBorder
          value={paramsCustom.re_new_password}
          keyName={'re_new_password'}
          placeHolder={'Xác nhận mật khẩu'}
          onTextChange={onChangeText}
          containerStyle={styles.containerInput}
          secureTextEntry={paramsHiddenPassword.re_new_password}
          rightComponent={
            <STouchEye
              onPress={() => onChangeParamsHiddenPassword('re_new_password')}>
              <Icon
                source={
                  !paramsHiddenPassword.re_new_password ? IC_EYE_CLOSE : IC_EYE
                }
                size={16}
              />
            </STouchEye>
          }
        />
      </Container>
      <SRoundedButton
        onPress={call}
        disabled={loading}
        loading={loading}
        title={'Cập nhật'}
        textStyle={styles.submitText}
      />
    </ScreenWrapper>
  );
});

const Container = styled.ScrollView.attrs(props => ({
  contentContainerStyle: {
    alignItems: 'center',
  },
}))`
  margin: 24px 16px;
  margin-bottom: ${getBottomSpace() + 32}px;
`;

const SRoundedButton = styled(SubmitButtonColor)`
  margin-top: ${scale(40)}px;
  padding: 0 16px;
  margin-bottom: 32px;
`;

const STouchEye = styled.TouchableOpacity`
  padding: 10px;
  align-self: center;
`;

const styles = StyleSheet.create({
  containerInput: {
    marginTop: 16,
  },

  submitText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
