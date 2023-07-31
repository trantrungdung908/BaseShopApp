import React, {useCallback, useEffect} from 'react';
import {createContext} from '@dwarvesf/react-utils';
import {
  ParamLoginInterface,
  ParamRegisterInterface,
} from '@/screens/Login/types';
import {Keyboard} from 'react-native';
import {
  requestGetMe,
  requestSignIn,
  requestSignUp,
} from '@/store/user/functions';
import ToastService from '@/services/ToastService';
import {useAsyncFn} from '@/hooks/useAsyncFn';
import {getUserAccessToken, setAccessToken} from '@/store/user';
import {goBack} from '@/utils/navigation';
import {client} from '@/libs';
import {useAsyncEffect} from '@/hooks/useAsyncEffect';
import useAutoToastError from '@/hooks/useAutoToastError';

interface ContextValues {
  isSignIn?: boolean;
  isSignOut?: boolean;
  token: string;
  onSignIn?: (params: ParamLoginInterface, isSaveLogin?: boolean) => void;
  onRegister?: (params: ParamRegisterInterface) => void;
  loading?: boolean;
  error?: Error;
  handleLogout: () => void;
}

const [Provider, useAuthContext] = createContext<ContextValues>();

export const AuthContextProvider: React.FC<any> = ({children}) => {
  const token = getUserAccessToken();

  useEffect(() => {
    client.setPrivateUserHeaders({Authorization: `Bearer ${token}`});
  }, [token]);

  const {call, value, error, loading} = useAsyncEffect(async () => {
    if (token) {
      await client.postValidate(token);
    }
  }, [token]);

  const [{loading: loadingSignIn, error: errorSignIn}, onSignIn] = useAsyncFn(
    async (paramsCustom: ParamLoginInterface) => {
      Keyboard.dismiss();
      await requestSignIn(paramsCustom);
      ToastService.show('Đăng nhập thành công!');
    },
    [],
  );

  const handleLogout = useCallback(() => {
    setAccessToken('');
  }, []);

  useEffect(() => {
    if (error) {
      handleLogout();
    }
  }, [error, handleLogout]);

  const [{loading: loadingRegister, error: errorRegister}, onRegister] =
    useAsyncFn(async (paramsCustom: ParamRegisterInterface) => {
      Keyboard.dismiss();
      const mes = await requestSignUp(paramsCustom);
      ToastService.show(mes);
      goBack();
    }, []);

  useAutoToastError(error);

  return (
    <Provider
      value={{
        onSignIn: onSignIn,
        onRegister,
        loading: loadingRegister || loadingSignIn,
        error: error || errorRegister || errorSignIn,
        token,
        handleLogout: handleLogout,
      }}>
      {children}
    </Provider>
  );
};

export {useAuthContext};
